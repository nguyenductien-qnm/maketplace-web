import Box from '@mui/material/Box'
import Grid2 from '@mui/material/Grid2'
import TextField from '@mui/material/TextField'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import Button from '@mui/material/Button'
import FormHelperText from '@mui/material/FormHelperText'
import Autocomplete from '@mui/material/Autocomplete'
import Chip from '@mui/material/Chip'
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import { grey, red } from '@mui/material/colors'
import TypographyLabel from '~/components/common/TypographyLabel'
import CategoryTreeView from '~/components/common/CategoryTreeView'
import VisuallyHiddenInput from '~/components/common/VisuallyHiddenInput'
import { toast } from 'react-toastify'
import {
  FIELD_REQUIRED_MESSAGE,
  PRODUCT_NAME_RULE,
  PRODUCT_NAME_RULE_MESSAGE,
  NUMBER_RULE,
  NUMBER_RULE_MESSAGE
} from '~/utils/validators'
import { NumericFormat } from 'react-number-format'
import { getImageForPreview } from '~/helpers/resizeImage'
import { Controller, useFieldArray, useFormContext } from 'react-hook-form'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { useState } from 'react'
const visibilityOptions = [
  { id: 'private', name: 'Private' },
  { id: 'public', name: 'Public' }
]

function SPUForm({
  handleUploadThumb,
  handleUploadGallery,
  handleDeleteGallery
}) {
  const {
    register,
    control,
    setValue,
    watch,
    formState: { errors },
    getValues
  } = useFormContext()

  const selectedVisibility = watch('product_visibility')
  const productThumb = watch('product_thumb')
  const productGallery = watch('product_gallery')

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'product_specs'
  })

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
      <Grid2 container spacing={2} rowSpacing={2}>
        <Grid2 container spacing={2} rowSpacing={2} size={9}>
          <Grid2 size={12}>
            <TypographyLabel>Product name</TypographyLabel>
            <TextField
              fullWidth
              size="small"
              {...register('product_name', {
                required: FIELD_REQUIRED_MESSAGE,
                pattern: {
                  value: PRODUCT_NAME_RULE,
                  message: PRODUCT_NAME_RULE_MESSAGE
                }
              })}
              error={!!errors['product_name']}
              helperText={errors?.product_name?.message}
            />
          </Grid2>

          <Grid2 size={12}>
            <Grid2 container spacing={2}>
              <Grid2 size={4}>
                <TypographyLabel>Product min price</TypographyLabel>
                <Controller
                  name="product_min_price"
                  control={control}
                  rules={{ required: FIELD_REQUIRED_MESSAGE }}
                  render={({ field: { ref, ...field } }) => (
                    <NumericFormat
                      {...field}
                      error={!!errors.product_min_price}
                      helperText={errors?.product_min_price?.message}
                      size="small"
                      allowNegative={false}
                      prefix="$"
                      decimalScale={2}
                      fixedDecimalScale
                      thousandSeparator
                      customInput={TextField}
                      onValueChange={(values) => {
                        field.onChange(values.value || '')
                      }}
                    />
                  )}
                />
              </Grid2>

              <Grid2 size={4}>
                <TypographyLabel>Product max price</TypographyLabel>
                <Controller
                  name="product_max_price"
                  control={control}
                  rules={{ required: FIELD_REQUIRED_MESSAGE }}
                  render={({ field: { ref, ...field } }) => (
                    <NumericFormat
                      {...field}
                      error={!!errors.product_max_price}
                      helperText={errors?.product_max_price?.message}
                      size="small"
                      allowNegative={false}
                      prefix="$"
                      decimalScale={2}
                      fixedDecimalScale
                      thousandSeparator
                      customInput={TextField}
                      onValueChange={(values) => {
                        field.onChange(values.value || '')
                      }}
                    />
                  )}
                />
              </Grid2>

              <Grid2 size={4}>
                <TypographyLabel>Product stock</TypographyLabel>
                <TextField
                  fullWidth
                  type="number"
                  size="small"
                  {...register('product_stock', {
                    required: FIELD_REQUIRED_MESSAGE,
                    pattern: {
                      value: NUMBER_RULE,
                      message: NUMBER_RULE_MESSAGE
                    }
                  })}
                  error={!!errors['product_stock']}
                  helperText={errors?.product_stock?.message}
                />
              </Grid2>
            </Grid2>
          </Grid2>

          <Grid2 size={12}>
            <Box sx={{ display: 'flex', gap: '15px' }}>
              <Box>
                <TypographyLabel>Length (cm)</TypographyLabel>
                <TextField
                  fullWidth
                  type="number"
                  size="small"
                  {...register('product_dimensions.length', {
                    required: FIELD_REQUIRED_MESSAGE,
                    valueAsNumber: true
                  })}
                  error={!!errors?.product_dimensions?.length}
                  helperText={errors?.product_dimensions?.length?.message}
                />
              </Box>

              <Box>
                <TypographyLabel>Width (cm)</TypographyLabel>
                <TextField
                  size="small"
                  fullWidth
                  type="number"
                  {...register('product_dimensions.width', {
                    required: FIELD_REQUIRED_MESSAGE,
                    valueAsNumber: true
                  })}
                  error={!!errors?.product_dimensions?.width}
                  helperText={errors?.product_dimensions?.width?.message}
                />
              </Box>

              <Box>
                <TypographyLabel>Height (cm)</TypographyLabel>
                <TextField
                  size="small"
                  fullWidth
                  type="number"
                  {...register('product_dimensions.height', {
                    required: FIELD_REQUIRED_MESSAGE,
                    valueAsNumber: true
                  })}
                  error={!!errors?.product_dimensions?.height}
                  helperText={errors?.product_dimensions?.height?.message}
                />
              </Box>

              <Box>
                <TypographyLabel>Weight (kg)</TypographyLabel>
                <TextField
                  size="small"
                  fullWidth
                  type="number"
                  {...register('product_dimensions.weight', {
                    required: FIELD_REQUIRED_MESSAGE,
                    pattern: {
                      value: NUMBER_RULE,
                      message: NUMBER_RULE_MESSAGE
                    }
                  })}
                  error={!!errors?.product_dimensions?.weight}
                  helperText={errors?.product_dimensions?.weight?.message}
                />
              </Box>
            </Box>
          </Grid2>

          <Grid2 size={12}>
            <TypographyLabel>Product categories</TypographyLabel>

            <Controller
              name="product_categories"
              control={control}
              rules={{ required: FIELD_REQUIRED_MESSAGE }}
              render={({ field }) => (
                <>
                  <CategoryTreeView
                    value={field.value || []}
                    onChange={(newSelected) => {
                      if (newSelected.length > 1) {
                        toast.warn('You can only select 1 item')
                        return
                      }
                      field.onChange(newSelected)
                    }}
                  />
                  {errors.product_categories && (
                    <FormHelperText error sx={{ mt: 1 }}>
                      {errors.product_categories.message}
                    </FormHelperText>
                  )}
                </>
              )}
            />
          </Grid2>

          <Grid2 size={12}>
            <TypographyLabel>Product tags</TypographyLabel>
            <Controller
              name="product_tags"
              control={control}
              defaultValue={[]}
              render={({ field }) => (
                <Autocomplete
                  fullWidth
                  multiple
                  freeSolo
                  options={[]}
                  value={field.value}
                  onChange={(event, newValue) => {
                    if (newValue?.length > 30) {
                      toast.warn('You can add up to 30 items only')
                      return
                    }
                    field.onChange(newValue)
                  }}
                  renderTags={(value, getTagProps) =>
                    value.map((option, index) => (
                      <Chip
                        variant="outlined"
                        label={option}
                        {...getTagProps({ index })}
                        key={index}
                      />
                    ))
                  }
                  renderInput={(params) => (
                    <TextField
                      fullWidth
                      {...params}
                      variant="outlined"
                      placeholder="Enter tags"
                    />
                  )}
                />
              )}
            />
          </Grid2>

          <Grid2 size={12}>
            <TypographyLabel>Product attributes</TypographyLabel>
            <Grid2 container spacing={2} rowSpacing={3}>
              {fields.map((field, index) => (
                <Grid2 size={12} key={field.id}>
                  <Grid2 container spacing={2}>
                    <Grid2 size={fields.length > 3 ? 5.7 : 6}>
                      <TextField
                        {...register(`product_specs.${index}.key`, {
                          required: 'Key is required'
                        })}
                        error={!!errors.product_specs?.[index]?.key}
                        fullWidth
                        size="small"
                        placeholder="Key"
                        helperText={errors.product_specs?.[index]?.key?.message}
                      />
                    </Grid2>

                    <Grid2 size={fields.length > 3 ? 5.7 : 6}>
                      <TextField
                        {...register(`product_specs.${index}.value`, {
                          required: 'Value is required'
                        })}
                        error={!!errors.product_specs?.[index]?.value}
                        fullWidth
                        size="small"
                        placeholder="Value"
                        helperText={
                          errors.product_specs?.[index]?.value?.message
                        }
                      />
                    </Grid2>

                    <Grid2
                      size={0.6}
                      sx={{
                        display: 'flex',
                        alignItems: 'center'
                      }}
                    >
                      {fields.length > 3 && (
                        <HighlightOffOutlinedIcon
                          onClick={() => remove(index)}
                          sx={{
                            color: red[600],
                            '&:hover': { cursor: 'pointer' }
                          }}
                        />
                      )}
                    </Grid2>
                  </Grid2>
                </Grid2>
              ))}
            </Grid2>
            <Grid2
              xs={12}
              sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}
            >
              <Button
                onClick={() => {
                  const length = getValues('product_specs')?.length
                  if (length > 9) {
                    toast.warn('You can add up to 10 items only')
                    return
                  }
                  append({ key: '', value: '' })
                }}
                variant="contained"
              >
                + Add Attribute
              </Button>
            </Grid2>
          </Grid2>

          <Grid2 size={12}>
            <TypographyLabel>Product visibility</TypographyLabel>
            <Select
              {...register('product_visibility', {
                required: 'Visibility is required'
              })}
              value={selectedVisibility || ''}
              onChange={(e) => setValue('product_visibility', e.target.value)}
              size="small"
              fullWidth
            >
              {visibilityOptions.map((status) => (
                <MenuItem key={status.id} value={status.id}>
                  {status.name}
                </MenuItem>
              ))}
            </Select>
          </Grid2>

          <Grid2 size={12} sx={{ mb: '50px' }}>
            <TypographyLabel> Product Description</TypographyLabel>
            <Controller
              name="product_description"
              control={control}
              rules={{
                required: FIELD_REQUIRED_MESSAGE
              }}
              render={({ field }) => (
                <>
                  <ReactQuill
                    theme="snow"
                    value={field.value || ''}
                    onChange={field.onChange}
                    style={{ height: '300px' }}
                  />
                  {errors.product_description && (
                    <p style={{ color: 'red' }}>
                      {errors.product_description.message}
                    </p>
                  )}
                </>
              )}
            />
          </Grid2>
        </Grid2>

        <Grid2
          container
          spacing={2}
          rowSpacing={2}
          size={3}
          sx={{ height: 'fit-content' }}
        >
          <Grid2 size={12}>
            <TypographyLabel> Product Thumb</TypographyLabel>
            <Box
              sx={{
                minWidth: '100%',
                height: '200px',
                border: '3px',
                borderStyle: 'dashed',
                borderColor: errors?.['product_thumb'] ? red[400] : grey[400],
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'relative'
              }}
            >
              {productThumb !== '' ? (
                <Box>
                  <img
                    src={getImageForPreview(productThumb, { width: 180 })}
                    sx={{ height: '100%', width: '100%' }}
                  />
                  <HighlightOffOutlinedIcon
                    fontSize="small"
                    onClick={() => setValue('product_thumb', '')}
                    sx={{
                      position: 'absolute',
                      right: '0',
                      top: '0',
                      backgroundColor: 'white',
                      borderRadius: '9999px',
                      color: red[600],
                      '&:hover': { cursor: 'pointer' }
                    }}
                  />
                </Box>
              ) : (
                <Button
                  className="btn-shop-upload-product-thumb"
                  component="label"
                  role={undefined}
                  variant="contained"
                  tabIndex={-1}
                  startIcon={<CloudUploadIcon />}
                >
                  Upload Thumb
                  <VisuallyHiddenInput
                    {...register('product_thumb', {
                      required: 'Thumb is required'
                    })}
                    type="file"
                    onChange={handleUploadThumb}
                    multiple
                  />
                </Button>
              )}
            </Box>
          </Grid2>

          <Grid2 size={12}>
            <TypographyLabel> Product Gallery</TypographyLabel>
            <Box
              sx={{
                minWidth: '100%',
                height: '220px',
                border: '3px',
                borderStyle: 'dashed',
                borderColor: grey[400],
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              {productGallery.length != 0 ? (
                <Grid2
                  container
                  spacing={1}
                  rowSpacing={1}
                  sx={{ height: '100%', width: '100%' }}
                >
                  {productGallery.map((image, index) => (
                    <Grid2 sx={{ position: 'relative' }} key={index}>
                      <HighlightOffOutlinedIcon
                        onClick={() => handleDeleteGallery(index)}
                        sx={{
                          fontSize: '16px',
                          position: 'absolute',
                          right: '0',
                          top: '0',
                          backgroundColor: 'white',
                          borderRadius: '9999px',
                          color: red[600],
                          '&:hover': { cursor: 'pointer' }
                        }}
                      />
                      <img src={getImageForPreview(image, { width: 60 })} />
                    </Grid2>
                  ))}
                </Grid2>
              ) : (
                <Button
                  className="btn-shop-upload-product-gallery"
                  component="label"
                  role={undefined}
                  variant="contained"
                  tabIndex={-1}
                  startIcon={<CloudUploadIcon />}
                >
                  Upload Gallery
                  <VisuallyHiddenInput
                    type="file"
                    webkitdirectory="true"
                    onChange={handleUploadGallery}
                    multiple
                  />
                </Button>
              )}
            </Box>
            {productGallery.length != 0 && (
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: '20px'
                }}
              >
                <Button
                  className="btn-shop-upload-product-gallery"
                  component="label"
                  role={undefined}
                  variant="contained"
                  tabIndex={-1}
                  startIcon={<CloudUploadIcon />}
                >
                  Upload Gallery
                  <VisuallyHiddenInput
                    type="file"
                    webkitdirectory="true"
                    onChange={handleUploadGallery}
                    multiple
                  />
                </Button>
              </Box>
            )}
          </Grid2>
        </Grid2>
      </Grid2>
    </Box>
  )
}

export default SPUForm
