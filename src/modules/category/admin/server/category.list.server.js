import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import CategoryCachePolicy from '../policies/category.cache.policy'
import CategoryQueryKeys from '../policies/category.queryKeys'
import { StatusCodes } from 'http-status-codes'
import {
  queryCategoryByAdminAPI,
  getCategoryDetailByAdminAPI,
  getCategoryFormSnapshotAPI,
  createRootCategoryByAdminAPI,
  createChildCategoryByAdminAPI,
  updateRootCategoryByAdminAPI,
  updateChildCategoryByAdminAPI,
  updateCategoryPositionByAdminAPI,
  deleteCategoryByAdminAPI
} from '~/api/category.api'
import projectCategoryToTreeNode from '../projections/category.projection'
import {
  invalidateAfterCreateCategory,
  invalidateAfterDeleteCategory,
  invalidateAfterUpdateCategory
} from '../policies/category.invalidate.policy'

// ============================== QUERY ==============================

const useAdminCategoryListQuery = () => {
  return useQuery({
    staleTime: CategoryCachePolicy.list,
    queryKey: CategoryQueryKeys.list(),
    queryFn: async () => {
      const { status, resData } = await queryCategoryByAdminAPI()
      if (status !== StatusCodes.OK) throw new Error()
      return resData.metadata.map(projectCategoryToTreeNode)
    }
  })
}

const useAdminCategoryDetailQuery = ({ _id, enabled }) => {
  return useQuery({
    staleTime: CategoryCachePolicy.detail,
    enabled: Boolean(_id) && enabled,
    queryKey: CategoryQueryKeys.detail(_id),
    queryFn: async () => {
      const { status, resData } = await getCategoryDetailByAdminAPI({ _id })
      if (status !== StatusCodes.OK) throw Error()
      return resData.metadata
    }
  })
}

const useAdminCategoryFormSnapshotQuery = ({ _id, enabled }) => {
  return useQuery({
    staleTime: CategoryCachePolicy.formSnapshot,
    enabled: Boolean(_id) && enabled,
    queryKey: CategoryQueryKeys.form(_id),
    queryFn: async () => {
      const { status, resData } = await getCategoryFormSnapshotAPI({ _id })
      if (status !== StatusCodes.OK) throw Error()
      return resData.metadata
    }
  })
}

// ============================== MUTATION ==============================

const useAdminCreateRootCategoryMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ payload }) => {
      const { status, resData } = await createRootCategoryByAdminAPI({
        payload
      })
      if (status !== StatusCodes.CREATED) throw new Error()
      return projectCategoryToTreeNode(resData.metadata)
    },
    onSuccess: (createdCategory) =>
      invalidateAfterCreateCategory(queryClient, createdCategory)
  })
}

const useAdminCreateChildCategoryMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ payload }) => {
      const { status, resData } = await createChildCategoryByAdminAPI({
        payload
      })
      if (status !== StatusCodes.CREATED) throw new Error()
      return projectCategoryToTreeNode(resData.metadata)
    },
    onSuccess: (createdCategory) =>
      invalidateAfterCreateCategory(queryClient, createdCategory)
  })
}

const useAdminUpdateRootCategoryMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ _id, payload }) => {
      const { status, resData } = await updateRootCategoryByAdminAPI({
        _id,
        payload
      })
      if (status !== StatusCodes.OK) throw new Error()
      return projectCategoryToTreeNode(resData.metadata)
    },
    onSuccess: (updatedCategory) =>
      invalidateAfterUpdateCategory(queryClient, updatedCategory)
  })
}

const useAdminUpdateChildCategoryMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ _id, payload }) => {
      const { status, resData } = await updateChildCategoryByAdminAPI({
        _id,
        payload
      })
      if (status !== StatusCodes.OK) throw new Error()
      return projectCategoryToTreeNode(resData.metadata)
    },
    onSuccess: (updatedCategory) =>
      invalidateAfterUpdateCategory(queryClient, updatedCategory)
  })
}

const useAdminUpdateCategoryPositionMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ _id, payload }) => {
      const { status, resData } = await updateCategoryPositionByAdminAPI({
        _id,
        payload
      })
      if (status !== StatusCodes.OK) throw new Error()
      return projectCategoryToTreeNode(resData.metadata)
    },
    onMutate: async ({ newTree }) => {
      await queryClient.cancelQueries({
        queryKey: CategoryQueryKeys.list()
      })
      const previousLists = queryClient.getQueriesData({
        queryKey: CategoryQueryKeys.list()
      })
      queryClient.setQueriesData(
        { queryKey: CategoryQueryKeys.list() },
        newTree
      )
      return { previousLists }
    },
    onError: (_err, _vars, context) => {
      context?.previousLists?.forEach(([key, data]) => {
        queryClient.setQueryData(key, data)
      })
    },
    onSuccess: (updatedCategory) =>
      invalidateAfterUpdateCategory(queryClient, updatedCategory)
  })
}

const useAdminDeleteCategoryMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ _id }) => {
      const { status, resData } = await deleteCategoryByAdminAPI({
        _id
      })
      if (status !== StatusCodes.OK) throw new Error()
      return resData.metadata
    },
    onSuccess: (categoryIds) =>
      invalidateAfterDeleteCategory(queryClient, categoryIds)
  })
}

export {
  //QUERY
  useAdminCategoryListQuery,
  useAdminCategoryDetailQuery,
  useAdminCategoryFormSnapshotQuery,
  //MUTATION
  useAdminCreateRootCategoryMutation,
  useAdminCreateChildCategoryMutation,
  useAdminUpdateRootCategoryMutation,
  useAdminUpdateChildCategoryMutation,
  useAdminUpdateCategoryPositionMutation,
  useAdminDeleteCategoryMutation
}
