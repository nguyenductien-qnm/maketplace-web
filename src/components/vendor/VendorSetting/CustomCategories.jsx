import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TypographyTitle from '~/components/common/TypographyTitle'
import { grey } from '@mui/material/colors'
import CustomCategoriesModal from './CustomCategoriesModal'
import { Alert } from '@mui/material'
import CategoryTreeView from '~/components/common/CategoryTreeView'

function CustomCategories({
  shopCategories,
  open,
  setOpen,
  categoriesTree,
  handleFormSubmit
}) {
  return (
    <Box
      sx={{
        border: '2px dashed',
        borderColor: grey[400],
        borderRadius: 1,
        p: 4,
        mt: 3
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <TypographyTitle>Custom Categories</TypographyTitle>
        <Button variant="outlined" onClick={() => setOpen(true)}>
          Update
        </Button>
      </Box>

      <CustomCategoriesModal
        open={open}
        onClose={() => setOpen(false)}
        categoryTree={categoriesTree}
        onSubmit={handleFormSubmit}
      />

      {shopCategories.length > 0 && (
        <CategoryTreeView categories={shopCategories} />
      )}

      {shopCategories.length == 0 && (
        <Alert variant="filled" severity="error" sx={{ mt: 3 }}>
          You don’t have any custom categories yet. Please create a category
          before adding products.
        </Alert>
      )}
    </Box>
  )
}
export default CustomCategories
