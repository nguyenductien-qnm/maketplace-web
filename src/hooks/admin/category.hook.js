import { useEffect, useState } from 'react'
import {
  createCategoryChildAPI,
  createCategoryRootAPI,
  deleteCategoryByAdminAPI,
  queryCategoriesByAdminAPI,
  queryCategoryDetailByAdminAPI,
  updateCategoryChildByAdminAPI,
  updateCategoryPositionAPI,
  updateCategoryRootByAdminAPI
} from '~/api/category.api'
import { uploadImageToCloudinary } from '~/helpers/apiSendImage'
import { StatusCodes } from 'http-status-codes'
import { navigate } from '~/helpers/navigation'

// ================= CONSTANTS =================
const LOADING_CLASS = [
  '.btn-cancel-submit-category-form',
  '.btn-submit-category-form'
]
const LOADING_CLASS_DELETE = [
  '.btn-reason-modal-cancel',
  '.btn-reason-modal-submit'
]

// ================= STATE =================
export const useAdminCategory = () => {
  const [isDenied, setDenied] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [categoriesTree, setCategoriesTree] = useState([])
  const [categoryDetail, setCategoryDetail] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [action, setAction] = useState(null)
  const [openModal, setOpenModal] = useState(false)
  const [openReasonModal, setOpenReasonModal] = useState(false)

  // ================= EFFECT =================
  useEffect(() => {
    fetchCategories()
  }, [])

  useEffect(() => {
    if (isDenied) navigate('/unauthorized')
  }, [isDenied])

  // ================= API CALL =================
  const fetchCategories = async () => {
    try {
      const { status, resData } = await queryCategoriesByAdminAPI()
      if (status === StatusCodes.OK)
        setCategoriesTree((resData?.metadata || []).map(convertData))
    } catch {
      setDenied(true)
    } finally {
      setIsLoading(false)
    }
  }

  const handleQueryCategoryDetail = async (category) => {
    const { status, resData } = await queryCategoryDetailByAdminAPI(category)
    if (status === StatusCodes.OK) {
      const hasChild = categoriesTree.some(
        (c) => c.parent === resData.metadata._id
      )
      setCategoryDetail({ ...resData.metadata, hasChild } || {})
    }
  }

  // ================= HELPER =================
  const convertData = (data) => ({
    id: data?._id,
    parent: data?.category_parent_id || 0,
    text: data?.category_name,
    icon: data?.category_icon,
    status: data?.category_status
  })

  const getSubtreeDepth = (nodeId, treeData) => {
    const children = treeData.filter((node) => node.parent === nodeId)
    if (children.length === 0) return 1
    const depths = children.map((child) => getSubtreeDepth(child.id, treeData))
    return 1 + Math.max(...depths)
  }

  // ================= HANDLERS =================
  const handleOpenModal = ({ action, category }) => {
    setAction(action)
    setSelectedCategory(category)

    if (action === 'delete') {
      setOpenReasonModal(true)
    } else {
      setOpenModal(true)
      if (action?.includes('update')) {
        handleQueryCategoryDetail(category)
      }
    }
  }

  const handleCloseModal = () => {
    setOpenModal(false)
    setOpenReasonModal(false)
    setSelectedCategory(null)
    setCategoryDetail(null)
    setAction(null)
  }

  const handleUploadImage = async (e) => {
    const url = await uploadImageToCloudinary(e.target.files[0])
    return url
  }

  const handleDrop = async (newTree, options) => {
    const { dragSourceId, dropTargetId, dragSource, dropTarget } = options
    if (dragSourceId === dropTargetId) return

    const dragNodeDepth = getSubtreeDepth(dragSource.id, categoriesTree)
    if (dragNodeDepth >= 2 && dropTarget.parent !== 0) return

    const newParent = categoriesTree.find((c) => c.id === dropTargetId)
    if (newParent?.status === 'inactive' && dragSource.status === 'active')
      return

    const newIndex = newTree
      .filter((c) => c.parent === newParent.id)
      .findIndex((c) => c.id === dragSourceId)

    const payload = {
      category_id: dragSourceId,
      new_index: newIndex,
      new_parent_id: newParent.id
    }

    setCategoriesTree(newTree)

    const { status } = await updateCategoryPositionAPI({ payload })
    if (status !== StatusCodes.OK) fetchCategories()
  }

  // ================= CRUD =================
  const handleCreateCategoryRoot = async (data) => {
    const { status, resData } = await createCategoryRootAPI({
      payload: data,
      loadingClass: LOADING_CLASS
    })
    if (status === StatusCodes.CREATED) {
      setCategoriesTree((prev) => [
        ...prev,
        convertData(resData.metadata || {})
      ])
      handleCloseModal()
    }
  }

  const handleCreateCategoryChild = async (data) => {
    const payload = {
      ...data,
      category_parent_id: selectedCategory?.id
    }
    const { status, resData } = await createCategoryChildAPI({
      payload,
      loadingClass: LOADING_CLASS
    })
    if (status === StatusCodes.CREATED) {
      setCategoriesTree((prev) => [
        ...prev,
        convertData(resData.metadata || {})
      ])
      handleCloseModal()
    }
  }

  const handleUpdateCategoryRoot = async (data) => {
    const { category_slug, ...rest } = data
    const payload = {
      _id: categoryDetail?._id,
      ...rest
    }
    const { status, resData } = await updateCategoryRootByAdminAPI({
      payload,
      loadingClass: LOADING_CLASS
    })
    if (status === StatusCodes.OK) {
      const updated = resData?.metadata
      const isInactive = updated?.category_status === 'inactive'
      const hasChild = categoriesTree.some((c) => c.parent === updated._id)

      if (isInactive && hasChild) {
        fetchCategories()
      } else {
        setCategoriesTree((prev) =>
          prev.map((c) => (c.id === updated._id ? convertData(updated) : c))
        )
      }

      handleCloseModal()
    }
  }

  const handleUpdateCategoryChild = async (data) => {
    const { category_image, category_icon, category_slug, ...rest } = data
    const payload = {
      _id: categoryDetail?._id,
      ...rest
    }
    const { status, resData } = await updateCategoryChildByAdminAPI({
      payload,
      loadingClass: LOADING_CLASS
    })
    if (status === StatusCodes.OK) {
      const updated = resData?.metadata
      const isInactive = updated?.category_status === 'inactive'
      const hasChild = categoriesTree.some((c) => c.parent === updated._id)

      if (isInactive && hasChild) {
        fetchCategories()
      } else {
        setCategoriesTree((prev) =>
          prev.map((c) => (c.id === updated._id ? convertData(updated) : c))
        )
      }

      handleCloseModal()
    }
  }

  const handleDeleteCategory = async (reason) => {
    const { id } = selectedCategory
    const { status } = await deleteCategoryByAdminAPI({
      _id: id,
      payload: { reason },
      loadingClass: LOADING_CLASS_DELETE
    })
    if (status === StatusCodes.OK) {
      handleCloseModal()
      fetchCategories()
    }
  }

  // ================= SUBMIT HANDLER =================
  const handleSubmitCategory = async (data) => {
    switch (action) {
      case 'create-root':
        return await handleCreateCategoryRoot(data)
      case 'create-child':
        return await handleCreateCategoryChild(data)
      case 'update-root':
        return await handleUpdateCategoryRoot(data)
      case 'update-child':
        return await handleUpdateCategoryChild(data)
      default:
        console.warn('Unhandled action:', action)
    }
  }

  // ================= RETURN =================
  return {
    isLoading,
    openModal,
    openReasonModal,
    action,
    categoryDetail,
    categoriesTree,
    handleOpenModal,
    handleCloseModal,
    handleSubmitCategory,
    handleDrop,
    handleUploadImage,
    handleDeleteCategory
  }
}
