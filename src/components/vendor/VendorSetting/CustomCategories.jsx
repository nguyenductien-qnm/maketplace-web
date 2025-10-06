import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TypographyTitle from '~/components/common/TypographyTitle'
import { grey } from '@mui/material/colors'
import CustomCategoriesModal from './CustomCategoriesModal'
import { Alert, Typography } from '@mui/material'
import CategoryTreeView from '~/components/common/CategoryTreeView'
import InfoIcon from '@mui/icons-material/Info'

function CustomCategories({
  shopCategoriesTree,
  shopCategoriesCode,
  open,
  setOpen,
  categoriesTree,
  handleOpenDialog,
  handleFormSubmit
}) {
  return (
    <Box
      sx={{
        border: '2px dashed',
        borderColor: grey[400],
        borderRadius: 1,
        p: 4
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
        shopCategoriesCode={shopCategoriesCode}
        onClose={() => setOpen(false)}
        categoryTree={categoriesTree}
        onSubmit={handleFormSubmit}
      />

      {shopCategoriesTree.length > 0 && (
        <CategoryTreeView categories={shopCategoriesTree} />
      )}

      {shopCategoriesTree.length == 0 && (
        <Alert variant="filled" severity="error" sx={{ mt: 3 }}>
          You don’t have any custom categories yet. Please create a category
          before adding products.
        </Alert>
      )}

      <Box
        onClick={() => handleOpenDialog('CATEGORIES')}
        sx={{
          mt: 2,
          display: 'flex',
          gap: 1,
          alignItems: 'center',
          cursor: 'pointer',
          justifyContent: 'end'
        }}
      >
        <InfoIcon sx={{ fontSize: '16px' }} />
        <Typography
          variant="subtitle2"
          sx={{ ':hover': { textDecoration: 'underLine' } }}
        >
          Read the guide before updating your shop categories
        </Typography>
      </Box>
    </Box>
  )
}
export default CustomCategories
