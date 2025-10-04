import { Box, Button, Fade, Modal, Typography } from '@mui/material'
import { Controller } from 'react-hook-form'
import CategoryTreeView from '~/components/common/CategoryTreeView'
import { modalConfig, modalStyle } from '~/config/modal'
import useVendorCustomCategories from '~/hooks/vendor/customCategories.hook'

function CustomCategoriesModal({ open, onClose, categoryTree, onSubmit }) {
  const { control, isSubmitting, handleFormSubmit } = useVendorCustomCategories(
    {
      onSubmit
    }
  )

  return (
    <Modal open={open} onClose={onClose} {...modalConfig}>
      <Fade in={open}>
        <form onSubmit={handleFormSubmit}>
          <Box sx={modalStyle(600)}>
            <Typography variant="h6" mb={2}>
              Custom your shop categories
            </Typography>

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
