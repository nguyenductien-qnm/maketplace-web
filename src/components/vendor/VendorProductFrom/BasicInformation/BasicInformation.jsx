import Card from '@mui/material/Card'
import FormHelperText from '@mui/material/FormHelperText'
import TextField from '@mui/material/TextField'
import Grid2 from '@mui/material/Grid2'
import CategoryTreeView from '~/components/common/CategoryTreeView'
import TypographyLabel from '~/components/common/TypographyLabel'
import TypographyTitle from '~/components/common/TypographyTitle'
import ProductImagesUpload from '../ProductImagesUpload/ProductImagesUpload'
import ReactQuill from 'react-quill'
import { Controller } from 'react-hook-form'
import {
  FIELD_REQUIRED_MESSAGE,
  PRODUCT_NAME_RULE,
  PRODUCT_NAME_RULE_MESSAGE
} from '~/utils/validators'
import 'react-quill/dist/quill.snow.css'
import { Box, InputAdornment, Typography } from '@mui/material'
import DividerVertical from '~/components/common/DividerVertical'

const LABELS = {
  TITLE: 'Basic Information',
  PRODUCT_NAME: 'Product Name',
  CATEGORY: 'Product Category',
  DESCRIPTION: 'Product Description'
}

const FieldError = ({ error }) =>
  error ? (
    <FormHelperText error sx={{ mt: 1 }}>
      {error.message}
    </FormHelperText>
  ) : null

function BasicInformation({ form, categoriesTree }) {
  const { register, watch, control, errors } = form

  return (
    <Card sx={{ p: 3 }}>
      <TypographyTitle>{LABELS.TITLE}</TypographyTitle>

      <Grid2 container spacing={2} sx={{ mt: 2 }}>
        <Grid2 size={12}>
          <ProductImagesUpload form={form} />
        </Grid2>

        <Grid2 size={12}>
          <TypographyLabel>{LABELS.PRODUCT_NAME}</TypographyLabel>
          <TextField
            fullWidth
            {...register('product_name', {
              required: FIELD_REQUIRED_MESSAGE,
              pattern: {
                value: PRODUCT_NAME_RULE,
                message: PRODUCT_NAME_RULE_MESSAGE
              }
            })}
            error={!!errors.product_name}
            helperText={errors.product_name?.message}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <DividerVertical />
                    <Typography sx={{ ml: '10px' }}>
                      {watch('product_name')?.length || 0}/120
                    </Typography>
                  </InputAdornment>
                )
              }
            }}
          />
        </Grid2>

        <Grid2 size={12}>
          <TypographyLabel>{LABELS.CATEGORY}</TypographyLabel>
          <Controller
            name="product_category"
            control={control}
            rules={{ required: FIELD_REQUIRED_MESSAGE }}
            render={({ field }) => (
              <>
                <CategoryTreeView
                  multi={false}
                  value={field.value || ''}
                  onChange={field.onChange}
                  categories={categoriesTree}
                />
                <FieldError error={errors.product_category} />
              </>
            )}
          />
        </Grid2>

        <Grid2 size={12}>
          <TypographyLabel>{LABELS.DESCRIPTION}</TypographyLabel>
          <Controller
            name="product_description"
            control={control}
            rules={{
              required: FIELD_REQUIRED_MESSAGE,
              validate: (value) => {
                const plainText = value?.replace(/<[^>]*>/g, '')?.trim() || ''

                if (plainText.length < 100) {
                  return 'Description must be at least 100 characters.'
                }
                if (plainText.length > 3000) {
                  return 'Description must not exceed 3000 characters.'
                }
                return true
              }
            }}
            render={({ field }) => {
              const plainText =
                field.value?.replace(/<[^>]*>/g, '')?.trim() || ''

              return (
                <>
                  <Box
                    sx={{
                      minHeight: 300,
                      maxHeight: 800,
                      overflow: 'auto',
                      '& .ql-editor': {
                        minHeight: '250px !important'
                      },
                      '& .ql-toolbar.ql-snow': {
                        borderColor: errors.product_description
                          ? 'red'
                          : 'lightgrey'
                      },
                      '& .ql-container.ql-snow': {
                        borderColor: errors.product_description
                          ? 'red'
                          : 'lightgrey'
                      }
                    }}
                  >
                    <ReactQuill
                      theme="snow"
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </Box>
                  <Box
                    sx={{ display: 'flex', justifyContent: 'space-between' }}
                  >
                    <FieldError error={errors.product_description} />

                    <Typography
                      variant="caption"
                      color="textSecondary"
                      sx={{ mt: 1, display: 'block' }}
                    >
                      {plainText.length} / 3000 characters
                    </Typography>
                  </Box>
                </>
              )
            }}
          />
        </Grid2>
      </Grid2>
    </Card>
  )
}

export default BasicInformation
