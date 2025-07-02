import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import TextField from '@mui/material/TextField'
import { red } from '@mui/material/colors'

import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined'

import TypographyLabel from '~/components/common/TypographyLabel'
import VisuallyHiddenInput from '~/components/common/VisuallyHiddenInput'

import {
  CATEGORY_CODE_RULE,
  CATEGORY_CODE_RULE_MESSAGE,
  CATEGORY_NAME_RULE,
  CATEGORY_NAME_RULE_MESSAGE,
  FIELD_REQUIRED_MESSAGE
} from '~/utils/validators'

import { useAdminCategoryFormHook } from '~/hooks/admin/categoryForm.hook'
import SpinnerIcon from '~/components/common/SpinnerIcon'
import CircularIndeterminate from '~/components/common/CircularIndeterminate'
import ReadOnlyTextField from '~/components/common/ReadOnlyTextField'
import { Divider, Typography } from '@mui/material'

function CategoryForm({ mode, open, onClose, onSubmit, category }) {
  const {
    register,
    handleSubmit,
    errors,
    customHandleUploadImage,
    imageUrl,
    isUploadImage,
    setValue,
    handleFormSubmit,
    isSubmitting,
    watch
  } = useAdminCategoryFormHook({ mode, category, onSubmit })

  const creator = category?.category_creator_id
  const hasChild = category?.hasChild
  const status = watch('category_status')

  return (
    <Dialog
      open={open}
      onClose={() => {
        if (isUploadImage || isSubmitting) return
        onClose()
      }}
      maxWidth="sm"
      fullWidth
    >
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <DialogTitle>
          {mode?.includes('create')
            ? `Create new category ${mode?.includes('root') ? 'root' : 'child'}`
            : `Update category ${mode?.includes('root') ? 'root' : 'child'}`}
        </DialogTitle>
        <DialogContent>
          {mode?.includes('update') && !category ? (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                mt: 5
              }}
            >
              <CircularIndeterminate />
            </Box>
          ) : (
            <Box>
              {mode?.includes('root') && (
                <Box>
                  <Box sx={{ flex: 1 }}>
                    <TypographyLabel>Category image</TypographyLabel>

                    {imageUrl ? (
                      <Box
                        sx={{
                          position: 'relative',
                          height: '100px',
                          width: '100px'
                        }}
                      >
                        <HighlightOffOutlinedIcon
                          onClick={() =>
                            setValue('category_image', '', {
                              shouldValidate: true
                            })
                          }
                          sx={{
                            fontSize: '16px',
                            position: 'absolute',
                            right: '-10px',
                            top: '-10px',
                            backgroundColor: 'white',
                            borderRadius: '9999px',
                            color: red[600],
                            '&:hover': { cursor: 'pointer' }
                          }}
                        />
                        <img
                          src={imageUrl}
                          alt="preview"
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            borderRadius: 8
                          }}
                        />
                      </Box>
                    ) : (
                      <Button
                        className="btn-upload-category-image"
                        component="label"
                        variant="contained"
                        startIcon={
                          isUploadImage ? <SpinnerIcon /> : <CloudUploadIcon />
                        }
                      >
                        {isUploadImage ? 'Uploading...' : 'Upload Thumb'}

                        <VisuallyHiddenInput
                          type="file"
                          accept="image/*"
                          onChange={customHandleUploadImage}
                        />
                      </Button>
                    )}

                    <input
                      type="hidden"
                      {...register('category_image', {
                        required: FIELD_REQUIRED_MESSAGE
                      })}
                    />

                    {errors.category_image && (
                      <Box sx={{ color: 'red', mt: 1, fontSize: '0.75rem' }}>
                        {errors.category_image.message}
                      </Box>
                    )}
                  </Box>

                  <Box sx={{ flex: 1, mt: 1 }}>
                    <TypographyLabel>Category icon</TypographyLabel>
                    <TextField
                      {...register('category_icon', {
                        required: FIELD_REQUIRED_MESSAGE
                      })}
                      size="small"
                      error={!!errors?.category_icon}
                      helperText={errors?.category_icon?.message}
                      fullWidth
                    />
                  </Box>
                </Box>
              )}

              <Box sx={{ flex: 1, mt: 1 }}>
                <TypographyLabel>Category name</TypographyLabel>
                <TextField
                  {...register('category_name', {
                    required: FIELD_REQUIRED_MESSAGE,
                    pattern: {
                      value: CATEGORY_NAME_RULE,
                      message: CATEGORY_NAME_RULE_MESSAGE
                    }
                  })}
                  error={!!errors?.category_name}
                  helperText={errors?.category_name?.message}
                  size="small"
                  fullWidth
                />
              </Box>

              <Box sx={{ flex: 1, mt: 1 }}>
                <TypographyLabel>Category code</TypographyLabel>
                <TextField
                  {...register('category_code', {
                    required: FIELD_REQUIRED_MESSAGE,
                    pattern: {
                      value: CATEGORY_CODE_RULE,
                      message: CATEGORY_CODE_RULE_MESSAGE
                    },
                    onChange: (e) => {
                      const upper = e.target.value.toUpperCase()
                      setValue('category_code', upper, { shouldValidate: true })
                    }
                  })}
                  error={!!errors?.category_code}
                  helperText={errors?.category_code?.message}
                  size="small"
                  fullWidth
                />
              </Box>

              <Box sx={{ flex: 1, mt: 1 }}>
                <TypographyLabel>Category status</TypographyLabel>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <input
                    type="checkbox"
                    {...register('category_status')}
                    defaultChecked
                  />
                  <span>Active</span>
                </Box>
                {hasChild && !status && (
                  <Typography variant="caption" color="warning.main">
                    * All child categories will be disabled as well.
                  </Typography>
                )}
              </Box>

              {mode?.includes('update') && (
                <Box>
                  <Divider sx={{ mt: 1, mb: 1 }} />
                  <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                    <Box sx={{ flex: 1 }}>
                      <TypographyLabel>Creator email</TypographyLabel>
                      <ReadOnlyTextField value={creator?.user_email} />
                    </Box>
                    <Box sx={{ flex: 1 }}>
                      <TypographyLabel>Creator name</TypographyLabel>
                      <ReadOnlyTextField value={creator?.user_name} />
                    </Box>
                  </Box>
                  <Box sx={{ flex: 1, mt: 1 }}>
                    <TypographyLabel>Created at</TypographyLabel>
                    <ReadOnlyTextField value={category?.createdAt} />
                  </Box>
                </Box>
              )}
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button
            className="btn-cancel-submit-category-form"
            onClick={onClose}
            variant="outlined"
            color="secondary"
          >
            Cancel
          </Button>
          <Button
            className="btn-submit-category-form"
            variant="contained"
            type="submit"
            startIcon={isSubmitting && <SpinnerIcon />}
          >
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}
export default CategoryForm
