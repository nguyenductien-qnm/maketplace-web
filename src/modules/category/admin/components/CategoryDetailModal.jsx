import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Button from '@mui/material/Button'
import Grid2 from '@mui/material/Grid2'
import Fade from '@mui/material/Fade'
import Modal from '@mui/material/Modal'
import TypographyTitle from '~/components/common/TypographyTitle'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import CircularIndeterminate from '~/components/common/CircularIndeterminate'
import { modalConfig, modalStyle } from '~/config/modal'
import TypographyLabel from '~/components/common/TypographyLabel'
import { Card, Checkbox, FormControlLabel } from '@mui/material'
import ReadOnlyTextField from '~/components/common/ReadOnlyTextField'
import CreatorInfoCard from '~/components/admin/CreatorInfoCard'

function CategoryDetailModal({ ui, data, handler }) {
  const { isOpen, isLoading } = ui

  const { category } = data

  const { handleClose } = handler

  return (
    <Modal open={isOpen} onClose={handleClose} {...modalConfig}>
      <Fade in={isOpen}>
        <Box sx={modalStyle(900, 'auto')}>
          <Box sx={{ flexShrink: 0 }}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <TypographyTitle>Category Detail</TypographyTitle>
              <HighlightOffIcon
                color="error"
                onClick={handleClose}
                sx={{ cursor: 'pointer' }}
              />
            </Box>
            <Divider sx={{ mt: 1, mb: 2 }} />
          </Box>

          {isLoading && <CircularIndeterminate height={731} />}

          {!isLoading && (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <Card sx={{ p: 3 }}>
                <TypographyTitle sx={{ mb: 3 }}>
                  Basic Information
                </TypographyTitle>

                <Grid2 container columnSpacing={2} rowSpacing={2}>
                  {category?.category_image && (
                    <Grid2 size={14}>
                      <TypographyLabel>Category Image</TypographyLabel>
                      <Box
                        sx={{
                          height: 150,
                          width: '100%',
                          border: '1px dashed grey',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center'
                        }}
                      >
                        <Box
                          sx={{
                            height: 130,
                            objectFit: 'contain'
                          }}
                          component="img"
                          src={category.category_image}
                        />
                      </Box>
                    </Grid2>
                  )}

                  {category?.category_icon && (
                    <Grid2 size={12}>
                      <TypographyLabel>Category Icon</TypographyLabel>
                      <ReadOnlyTextField value={category.category_icon} />
                    </Grid2>
                  )}

                  <Grid2 size={6}>
                    <TypographyLabel>Category Name</TypographyLabel>
                    <ReadOnlyTextField value={category?.category_name} />
                  </Grid2>

                  <Grid2 size={6}>
                    <TypographyLabel>Category Code</TypographyLabel>
                    <ReadOnlyTextField value={category?.category_code} />
                  </Grid2>

                  <Grid2 size={12}>
                    <FormControlLabel
                      disabled
                      label="Active"
                      control={
                        <Checkbox checked={!!category?.category_status} />
                      }
                    />
                  </Grid2>
                </Grid2>
              </Card>

              <CreatorInfoCard role="ADMIN" creator={category?.creator} />

              <Card sx={{ p: 3 }}>
                <TypographyTitle sx={{ mb: 3 }}>Metadata</TypographyTitle>

                <Grid2 container columnSpacing={2} rowSpacing={2}>
                  <Grid2 size={4}>
                    <TypographyLabel>Created At</TypographyLabel>
                    <ReadOnlyTextField value={category?.createdAt} />
                  </Grid2>

                  <Grid2 size={4}>
                    <TypographyLabel>Updated At</TypographyLabel>
                    <ReadOnlyTextField value={category?.updatedAt} />
                  </Grid2>

                  <Grid2 size={4}>
                    <TypographyLabel>Product Count</TypographyLabel>
                    <ReadOnlyTextField value={category?.product_count} />
                  </Grid2>
                </Grid2>
              </Card>

              <Box
                sx={{
                  pt: '24px',
                  display: 'flex',
                  justifyContent: 'flex-end',
                  flexShrink: 0,
                  gap: 1
                }}
              >
                <Button
                  color="secondary"
                  variant="outlined"
                  onClick={handleClose}
                >
                  Close
                </Button>
              </Box>
            </Box>
          )}
        </Box>
      </Fade>
    </Modal>
  )
}

export default CategoryDetailModal
