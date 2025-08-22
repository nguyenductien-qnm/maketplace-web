import Container from '@mui/material/Container'
import CategoryForm from '~/components/admin/category/CategoryForm'
import CategoryHeader from '~/components/admin/category/CategoryHeader'
import CategoryTreeBoard from '~/components/admin/category/CategoryTreeBoard'
import ReasonModal from '~/components/admin/ReasonModal'
import { useAdminCategory } from '~/hooks/admin/category.hook'

function AdminCategory() {
  const {
    loading,
    openModal,
    openReasonModal,
    action,
    categoriesTree,
    categoryDetail,
    handleOpenModal,
    handleCloseModal,
    handleSubmitCategory,
    handleDrop,
    handleExport,
    handleUploadImage,
    handleDeleteCategory
  } = useAdminCategory()

  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 4,
        height: 'calc(90vh - 24px)'
      }}
    >
      <CategoryHeader
        handleOpenModal={handleOpenModal}
        handleExport={handleExport}
      />

      <CategoryTreeBoard
        loading={loading}
        categoriesTree={categoriesTree}
        handleOpenModal={handleOpenModal}
        handleDrop={handleDrop}
      />

      <CategoryForm
        open={openModal}
        onClose={handleCloseModal}
        handleUploadImage={handleUploadImage}
        mode={action}
        category={categoryDetail}
        onSubmit={handleSubmitCategory}
      />
      <ReasonModal
        header="Delete category (This action can't be undone.)"
        open={openReasonModal}
        onClose={handleCloseModal}
        onSubmit={handleDeleteCategory}
        submitText="Confirm"
        submitColor="error"
      />
    </Container>
  )
}
export default AdminCategory
