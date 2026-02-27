import CategoryQueryKeys from './category.queryKeys'
import { getDescendantsUpToDepth } from '~/utils/categoryTree'

const invalidateAfterCreateCategory = (queryClient, createdCategory) => {
  queryClient.setQueriesData(
    { queryKey: CategoryQueryKeys.list() },
    (oldData = []) => [...oldData, createdCategory]
  )

  queryClient.invalidateQueries({
    queryKey: CategoryQueryKeys.list(),
    refetchType: 'none'
  })
}

const invalidateAfterUpdateCategory = (queryClient, updatedCategory) => {
  const oldList = queryClient.getQueryData(CategoryQueryKeys.list())
  if (!oldList) return

  const category = oldList.find((c) => c.id === updatedCategory.id)
  if (!category) return

  if (
    category.status !== updatedCategory.status &&
    updatedCategory.status === false
  ) {
    const descendants = getDescendantsUpToDepth(oldList, updatedCategory.id, 3)

    const ids = new Set(descendants.map((d) => d.id))

    const nextList = oldList.map((item) => {
      if (item.id === updatedCategory.id || ids.has(item.id)) {
        return { ...item, status: false }
      }
      return item
    })

    queryClient.setQueriesData({ queryKey: CategoryQueryKeys.list() }, nextList)
  } else {
    queryClient.setQueriesData(
      { queryKey: CategoryQueryKeys.list() },
      (oldData) =>
        oldData?.map((c) => (c.id === updatedCategory.id ? updatedCategory : c))
    )
  }

  queryClient.invalidateQueries({
    queryKey: CategoryQueryKeys.list(),
    refetchType: 'none'
  })

  queryClient.invalidateQueries({
    queryKey: CategoryQueryKeys.form(updatedCategory.id),
    refetchType: 'none'
  })

  queryClient.invalidateQueries({
    queryKey: CategoryQueryKeys.detail(updatedCategory.id)
  })
}

const invalidateAfterDeleteCategory = (queryClient, categoryIds) => {
  queryClient.setQueriesData(
    { queryKey: CategoryQueryKeys.list() },
    (oldData = []) => oldData.filter((c) => !categoryIds.includes(c.id))
  )

  queryClient.invalidateQueries({
    queryKey: CategoryQueryKeys.list(),
    refetchType: 'none'
  })
}

export {
  invalidateAfterCreateCategory,
  invalidateAfterUpdateCategory,
  invalidateAfterDeleteCategory
}
