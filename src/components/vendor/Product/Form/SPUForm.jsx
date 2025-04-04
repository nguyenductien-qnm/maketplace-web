import {
  Box,
  Grid2,
  TextField,
  Select,
  MenuItem,
  Paper,
  Button,
  FormControl,
  FormHelperText,
  styled
} from '@mui/material'
import { grey, red } from '@mui/material/colors'
import { Controller, useFieldArray, useFormContext } from 'react-hook-form'
import { useSelector } from 'react-redux'
import TypographyLabel from '~/components/common/TypographyLabel'
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'

import {
  FIELD_REQUIRED_MESSAGE,
  NAME_RULE,
  NAME_RULE_MESSAGE,
  NUMBER_RULE,
  NUMBER_RULE_MESSAGE
} from '~/utils/validators'
import { NumericFormat } from 'react-number-format'
import resizeImage from '~/helpers/resizeImage'
import interceptorLoadingElements from '~/utils/interceptorLoading'
import { uploadImageToCloudinary } from '~/helpers/apiSendImage'

function SPUForm() {
  const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1
  })

  const {
    register,
    control,
    setValue,
    watch,
    formState: { errors },
    clearErrors
  } = useFormContext()

  const categories = useSelector((state) => state.categories.categories)
  const selectedVisibility = watch('product_visibility')
  const productThumb = watch('product_thumb')
  const productGallery = watch('product_gallery')

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'product_specs'
  })

  const visibilityOptions = [
    { id: 'private', name: 'Private' },
    { id: 'public', name: 'Public' }
  ]

  const handleUploadThumb = async (e) => {
    interceptorLoadingElements(true, [
      '.btn-shop-upload-product-thumb',
      '.btn-shop-create-product'
    ])
    const url = await uploadImageToCloudinary(e.target.files[0])
    setValue('product_thumb', resizeImage(url, 180, 180))
    clearErrors('product_thumb')
    interceptorLoadingElements(false, [
      '.btn-shop-upload-product-thumb',
      '.btn-shop-create-product'
    ])
  }

  const handleUploadGallery = async (e) => {
    interceptorLoadingElements(true, [
      '.btn-shop-upload-product-gallery',
      '.btn-shop-create-product'
    ])
    const url = await uploadImageToCloudinary(e.target.files[0])
    interceptorLoadingElements(false, [
      '.btn-shop-upload-product-gallery',
      '.btn-shop-create-product'
    ])
    const currentGallery = productGallery
    setValue('product_gallery', [...currentGallery, resizeImage(url, 60, 60)])
  }

  const handleDeleteGallery = (index) => {
    const currentGallery = productGallery
    const updatedGallery = currentGallery.filter((_, i) => i !== index)
    setValue('product_gallery', updatedGallery)
  }

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
                  value: NAME_RULE,
                  message: NAME_RULE_MESSAGE
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
            <FormControl
              fullWidth
              size="small"
              error={!!errors.product_categories}
            >
              <Select
                {...register('product_categories', {
                  required: FIELD_REQUIRED_MESSAGE
                })}
                multiple
                value={watch('product_categories') || []}
                onChange={(e) => setValue('product_categories', e.target.value)}
                renderValue={(selected) => selected.join(', ')}
              >
                {categories.map((category) => (
                  <MenuItem
                    key={category.category_code}
                    value={category.category_code}
                  >
                    {category.category_name}
                  </MenuItem>
                ))}
              </Select>
              {errors.product_categories && (
                <FormHelperText>
                  {errors.product_categories.message}
                </FormHelperText>
              )}
            </FormControl>
          </Grid2>

          <Grid2 size={12}>
            <TypographyLabel>Product attributes</TypographyLabel>
            <Grid2 container spacing={2} rowSpacing={3}>
              {fields.map((field, index) => (
                <Grid2 size={12} key={field.id}>
                  <Paper elevation={2} sx={{ padding: '10px' }}>
                    <Grid2 container spacing={3}>
                      <Grid2 size={fields.length > 3 ? 5 : 6}>
                        <TextField
                          {...register(`product_specs.${index}.key`, {
                            required: 'Key is required'
                          })}
                          error={!!errors.product_specs?.[index]?.key}
                          fullWidth
                          size="small"
                          placeholder="Key"
                          helperText={
                            errors.product_specs?.[index]?.key?.message
                          }
                        />
                      </Grid2>

                      <Grid2 size={fields.length > 3 ? 5 : 6}>
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
                        xs={1}
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
                  </Paper>
                </Grid2>
              ))}
            </Grid2>
            <Grid2
              xs={12}
              sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}
            >
              <Button
                onClick={() => append({ key: '', value: '' })}
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

          <Grid2 size={12}>
            <TypographyLabel> Product Description</TypographyLabel>
            <TextField
              {...register('product_description', {
                required: FIELD_REQUIRED_MESSAGE
              })}
              error={!!errors['product_description']}
              fullWidth
              multiline
              rows={10}
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
                    src={productThumb}
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
                      <img src={resizeImage(image, 60, 60)} />
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
