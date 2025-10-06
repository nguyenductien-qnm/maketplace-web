import { Alert, Box, Button, Fade, Modal, Typography } from '@mui/material'
import { useEffect } from 'react'
import { Controller } from 'react-hook-form'
import CategoryTreeView from '~/components/common/CategoryTreeView'
import TypographyTitle from '~/components/common/TypographyTitle'
import { modalConfig, modalStyle } from '~/config/modal'
import useVendorCustomCategories from '~/hooks/vendor/customCategories.hook'

function CustomCategoriesModal({
  shopCategoriesCode,
  open,
  onClose,
  categoryTree,
  onSubmit
}) {
  const { control, setValue, isSubmitting, handleFormSubmit } =
    useVendorCustomCategories({
      onSubmit
    })

  useEffect(() => {
    if (shopCategoriesCode) {
      setValue('shop_categories', shopCategoriesCode)
    }
  }, [shopCategoriesCode])

  return (
    <Modal open={open} onClose={onClose} {...modalConfig}>
      <Fade in={open}>
        <form onSubmit={handleFormSubmit}>
          <Box sx={modalStyle(700)}>
            <TypographyTitle>Custom Shop Categories</TypographyTitle>

            <Alert severity="warning" sx={{ mb: 3, mt: 1 }}>
              When selecting categories, please make sure to include all related
              parent and child categories to ensure proper product
              classification.
            </Alert>

            <Controller
              name="shop_categories"
              control={control}
              defaultValue={[]}
              render={({ field }) => (
                <CategoryTreeView
                  multi={true}
                  value={field.value || []}
                  onChange={(newSelected) => {
                    field.onChange(newSelected)
                  }}
                  categories={categoryTree}
                />
              )}
            />

            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                mt: 3,
                gap: 1
              }}
            >
              <Button color="secondary" variant="outlined" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" loading={isSubmitting} variant="contained">
                Submit
              </Button>
            </Box>
          </Box>
        </form>
      </Fade>
    </Modal>
  )
}
export default CustomCategoriesModal
