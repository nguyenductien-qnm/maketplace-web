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
import {
  Checkbox,
  FormControlLabel,
  TextField,
  Typography
} from '@mui/material'
import UploadButton from '~/components/common/UploadButton'
import { Controller } from 'react-hook-form'
import useAdminCategoryForm from '../hooks/useAdminCategoryForm'
import { FIELD_REQUIRED_MESSAGE } from '~/utils/validators'
import { grey, red } from '@mui/material/colors'
import {
  CATEGORY_CODE_RULE,
  CATEGORY_CODE_RULE_MESSAGE
} from '~/utils/validators'

function CategoryForm({ ui, data, handler }) {
  const { isOpen, isLoading, title, isUpdate, action, isSubmitting } = ui

  const { category } = data

  const { handleSubmitForm, handleClose } = handler

  const {
    register,
    errors,
    control,
    handleSubmit,
    handleUploadImage,
    handleRemoveImage
  } = useAdminCategoryForm({
    category,
    action
  })

  return (
    <Modal open={isOpen} onClose={handleClose} {...modalConfig}>
      <Fade in={isOpen}>
        <Box sx={modalStyle(600, action?.includes('Root') ? 713.5 : 423.5)}>
          <Box sx={{ flexShrink: 0 }}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <TypographyTitle>{title}</TypographyTitle>
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
            <form onSubmit={handleSubmit(handleSubmitForm)}>
              <Grid2 container columnSpacing={2} rowSpacing={2}>
                {(action === 'createRoot' || action === 'updateRoot') && (
                  <>
                    <Grid2 size={12}>
                      <TypographyLabel>Category Image</TypographyLabel>
                      <Box
                        sx={{
                          height: 150,
                          width: '100%',
                          border: '2px dashed',
                          borderColor: errors?.category_image
                            ? red[700]
                            : grey[500],
                          borderRadius: '4px',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center'
                        }}
                      >
                        <Controller
                          name="category_image"
                          control={control}
                          rules={{
                            validate: (v) =>
                              v?.tmpKey || v?.url
                                ? true
                                : FIELD_REQUIRED_MESSAGE
                          }}
                          render={({ field }) => {
                            const displaySrc =
                              field.value?.url || field.value?.previewUrl

                            return (
                              <Box>
                                {displaySrc ? (
                                  <Box sx={{ position: 'relative' }}>
                                    <HighlightOffIcon
                                      onClick={handleRemoveImage}
                                      sx={{
                                        fontSize: '20px',
                                        color: red[700],
                                        position: 'absolute',
                                        right: -5,
                                        top: -5,
                                        '&:hover': { cursor: 'pointer' }
                                      }}
                                    />
                                    <Box
                                      component="img"
                                      src={displaySrc}
                                      sx={{
                                        height: 130,
                                        objectFit: 'contain'
                                      }}
                                    />
                                  </Box>
                                ) : (
                                  <Box
                                    sx={{
                                      display: 'flex',
                                      flexDirection: 'column',
                                      alignItems: 'center'
                                    }}
                                  >
                                    <UploadButton
                                      label="Upload Image"
                                      inputProps={{
                                        onChange: async (e) => {
                                          handleUploadImage(e)
                                        }
                                      }}
                                    />
                                    <Typography
                                      variant="caption"
                                      color="error"
                                      sx={{ mt: 1 }}
                                    >
                                      {errors?.category_image?.message}
                                    </Typography>
                                  </Box>
                                )}
                              </Box>
                            )
                          }}
                        />
                      </Box>
                    </Grid2>

                    <Grid2 size={12}>
                      <TypographyLabel>Category Icon</TypographyLabel>
                      <TextField
                        fullWidth
                        {...register('category_icon', {
                          required: FIELD_REQUIRED_MESSAGE
                        })}
                        error={!!errors['category_icon']}
                        helperText={errors?.category_icon?.message}
                      />
                    </Grid2>
                  </>
                )}

                <Grid2 size={12}>
                  <TypographyLabel>Category Name</TypographyLabel>
                  <TextField
                    fullWidth
                    {...register('category_name', {
                      required: FIELD_REQUIRED_MESSAGE
                    })}
                    error={!!errors['category_name']}
                    helperText={errors?.category_name?.message}
                  />
                </Grid2>

                <Grid2 size={12}>
                  <TypographyLabel>Category Code</TypographyLabel>
                  <TextField
                    fullWidth
                    {...register('category_code', {
                      required: FIELD_REQUIRED_MESSAGE,
                      pattern: {
                        value: CATEGORY_CODE_RULE,
                        message: CATEGORY_CODE_RULE_MESSAGE
                      },
                      onChange: (e) => {
                        e.target.value = e.target.value.toUpperCase()
                      },
                      setValueAs: (value) => value.toUpperCase()
                    })}
                    error={!!errors['category_code']}
                    helperText={errors?.category_code?.message}
                  />
                </Grid2>

                <Grid2 size={12}>
                  <Controller
                    name="category_status"
                    control={control}
                    render={({ field }) => (
                      <FormControlLabel
                        label="Active"
                        control={
                          <Checkbox
                            checked={!!field.value}
                            onChange={(e) => field.onChange(e.target.checked)}
                          />
                        }
                      />
                    )}
                  />
                </Grid2>
              </Grid2>
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
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button
                  loading={isSubmitting}
                  loadingPosition="end"
                  variant="contained"
                  color="primary"
                  type="submit"
                >
                  Submit
                </Button>
              </Box>
            </form>
          )}
        </Box>
      </Fade>
    </Modal>
  )
}

export default CategoryForm
