import {
  useAdminCategoryDetailQuery,
  useAdminCategoryFormSnapshotQuery,
  useAdminCategoryListQuery,
  useAdminCreateChildCategoryMutation,
  useAdminCreateRootCategoryMutation,
  useAdminUpdateRootCategoryMutation,
  useAdminUpdateChildCategoryMutation,
  useAdminUpdateCategoryPositionMutation,
  useAdminDeleteCategoryMutation
} from '../server/category.list.server'
import useAdminCategoryStore from '../state/category.list.state'
import {
  CATEGORY_DELETE_CONFIRM_DIALOG,
  CATEGORY_FORM_TITLE
} from '../constants/category.constant'
import { useAdminCategoryCacheActions } from '../server/category.list.adapter'

const useAdminCategoryList = () => {
  const {
    commandAction,
    selectedCategoryId,
    isOpenForm,
    isOpenDetailModal,
    isOpenConfirmDialog,
    openForm,
    closeForm,
    openDetailModal,
    closeDetailModal,
    openConfirmDialog,
    closeConfirmDialog
  } = useAdminCategoryStore()

  const { resetAll } = useAdminCategoryCacheActions()

  const listQuery = useAdminCategoryListQuery()

  const detailQuery = useAdminCategoryDetailQuery({
    _id: selectedCategoryId,
    enabled: isOpenDetailModal
  })

  const snapshotQuery = useAdminCategoryFormSnapshotQuery({
    _id: selectedCategoryId,
    enabled: isOpenForm
  })

  const createRootMutation = useAdminCreateRootCategoryMutation()

  const createChildMutation = useAdminCreateChildCategoryMutation()

  const updateRootMutation = useAdminUpdateRootCategoryMutation()

  const updateChildMutation = useAdminUpdateChildCategoryMutation()

  const updatePositionMutation = useAdminUpdateCategoryPositionMutation()

  const deleteMutation = useAdminDeleteCategoryMutation()

  const handleOpenDetailModal = ({ categoryId }) => openDetailModal(categoryId)

  const handleOpenConfirmDialog = ({ categoryId }) =>
    openConfirmDialog(categoryId)

  const handleOpenForm = ({ categoryId = null, action }) =>
    openForm(categoryId, action)

  const handleRefresh = () => resetAll()

  const handleCloseForm = () => {
    if (createRootMutation.isPending || createChildMutation.isPending) return
    closeForm()
  }

  const handleCloseConfirmDialog = () => {
    console.log('call')
    if (deleteMutation.isPending) return
    console.log('close')
    closeConfirmDialog()
  }

  const handleCreateRootCategory = async (data) => {
    const { previewUrl, url, ...cleanImage } = data.category_image
    const payload = { ...data, category_image: cleanImage }
    createRootMutation.mutate(
      { payload },
      { onSuccess: () => handleCloseForm() }
    )
  }

  const handleCreateChildCategory = async (data) => {
    if (!selectedCategoryId) return

    createChildMutation.mutate(
      { payload: { ...data, category_parent_id: selectedCategoryId } },
      { onSuccess: () => handleCloseForm() }
    )
  }

  const handleUpdateRootCategory = (data) => {
    if (!selectedCategoryId) return

    const { category_image, ...rest } = data

    const { previewUrl, url, ...cleanImage } = category_image || {}

    const payload = cleanImage?.tmpKey
      ? { ...rest, category_image: cleanImage }
      : rest

    updateRootMutation.mutate(
      { _id: selectedCategoryId, payload },
      { onSuccess: () => handleCloseForm() }
    )
  }

  const handleUpdateChildCategory = (data) => {
    if (!selectedCategoryId) return

    updateChildMutation.mutate(
      { _id: selectedCategoryId, payload: data },
      { onSuccess: () => handleCloseForm() }
    )
  }

  const handleDeleteCategory = () => {
    if (!selectedCategoryId) return

    deleteMutation.mutate(
      { _id: selectedCategoryId },
      {
        onSuccess: () => {
          console.log('ok')
          handleCloseConfirmDialog()
        }
      }
    )
  }

  const handleDrop = (newTree, options) => {
    const { dragSourceId, dropTargetId, dragSource, dropTarget } = options
    if (!dragSourceId || !dropTargetId || !dragSource || !dropTarget) return
    if (dragSourceId === dropTargetId) return

    const dragNodeDepth = getSubtreeDepth(dragSourceId, newTree)
    if (dragNodeDepth >= 2 && dropTarget.parent !== 0) return

    const newParent = newTree.find((c) => c.id === dropTargetId)
    if (!newParent) return
    if (newParent.status === false) return

    const newIndex = newTree
      .filter((c) => c.parent === newParent.id)
      .findIndex((c) => c.id === dragSourceId)

    if (dropTargetId === dragSource.parent) {
      const oldIndex = listQuery.data
        .filter((c) => c.parent === newParent.id)
        .findIndex((c) => c.id === dragSourceId)
      if (oldIndex === newIndex) return
    }

    if (newIndex < 0) return

    const payload = { new_parent_id: dropTargetId, new_index: newIndex }

    updatePositionMutation.mutate(
      { _id: dragSourceId, payload, newTree },
      { onSuccess: () => handleCloseConfirmDialog() }
    )
  }

  const CATEGORY_MODERATION_HANDLERS = {
    createRoot: handleCreateRootCategory,
    createChild: handleCreateChildCategory,
    updateRoot: handleUpdateRootCategory,
    updateChild: handleUpdateChildCategory
  }

  const getSubtreeDepth = (nodeId, treeData) => {
    const children = treeData.filter((node) => node.parent === nodeId)
    if (children.length === 0) return 1
    const depths = children.map((child) => getSubtreeDepth(child.id, treeData))
    return 1 + Math.max(...depths)
  }

  return {
    ui: {
      header: {
        isRefreshing: listQuery.isFetching
      },

      board: {
        isLoading: listQuery.isLoading,
        isFetching: listQuery.isFetching,
        isUpdating: updatePositionMutation.isPending
      },

      form: {
        isOpen: isOpenForm,
        isLoading: snapshotQuery.isFetching,
        title: CATEGORY_FORM_TITLE[commandAction],
        isUpdate: commandAction == 'update' ? true : false,
        action: commandAction,
        isSubmitting:
          createRootMutation.isPending ||
          createChildMutation.isPending ||
          updateRootMutation.isPending ||
          updateChildMutation.isPending
      },

      detailModal: {
        isOpen: isOpenDetailModal,
        isLoading: detailQuery.isFetching
      },

      confirmDialog: {
        isOpen: isOpenConfirmDialog,
        isSubmitting: deleteMutation.isPending,
        ...CATEGORY_DELETE_CONFIRM_DIALOG
      }
    },

    data: {
      board: { categories: listQuery.data },

      form: { category: snapshotQuery.data },

      detailModal: { category: detailQuery.data }
    },

    handler: {
      header: {
        handleOpenForm,
        handleRefresh
      },

      board: {
        handleOpenConfirmDialog,
        handleOpenDetailModal,
        handleOpenForm,
        handleDrop
      },

      form: {
        handleSubmitForm: CATEGORY_MODERATION_HANDLERS[commandAction],
        handleClose: handleCloseForm
      },

      detailModal: {
        handleClose: closeDetailModal
      },

      confirmDialog: {
        handleClose: handleCloseConfirmDialog,
        handleConfirm: handleDeleteCategory
      }
    }
  }
}
export default useAdminCategoryList
