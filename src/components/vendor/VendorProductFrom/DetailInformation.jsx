import Autocomplete from '@mui/material/Autocomplete'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import Chip from '@mui/material/Chip'
import TextField from '@mui/material/TextField'
import Grid2 from '@mui/material/Grid2'
import Box from '@mui/material/Box'
import TypographyLabel from '~/components/common/TypographyLabel'
import TypographyTitle from '~/components/common/TypographyTitle'
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined'
import { red } from '@mui/material/colors'
import { toast } from 'react-toastify'
import { Controller } from 'react-hook-form'
import { useProductAttributes } from '~/hooks/vendor/product/productAttribute'
import { InputAdornment, Typography } from '@mui/material'
import DividerVertical from '~/components/common/DividerVertical'

const LIMITS = {
  MAX_TAGS: 30
}

const MESSAGES = {
  TITLE: 'Detail Information',
  TAGS: 'Product Tags',
  TAGS_PLACEHOLDER: 'Enter tags',
  ATTRIBUTES: 'Product Attribute',
  KEY_PLACEHOLDER: 'Key',
  VALUE_PLACEHOLDER: 'Value',
  KEY_REQUIRED: 'Key is required',
  VALUE_REQUIRED: 'Value is required',
  ADD_BTN: '+ Add Attribute',
  MAX_TAGS_WARNING: `You can add up to ${LIMITS.MAX_TAGS} items only`
}

const AttributeField = ({
  register,
  watch,
  errors,
  index,
  fieldType,
  placeholder,
  errorMessage
}) => (
  <TextField
    {...register(`product_attributes.${index}.${fieldType}`, {
      required: errorMessage
    })}
    error={!!errors.product_attributes?.[index]?.[fieldType]}
    fullWidth
    placeholder={placeholder}
    helperText={errors.product_attributes?.[index]?.[fieldType]?.message}
    sx={{ flexGrow: 1 }}
    slotProps={{
      input: {
        endAdornment: (
          <InputAdornment position="end">
            <DividerVertical />
            <Typography sx={{ ml: '10px' }}>
              {watch(`product_attributes.${index}.${fieldType}`)?.length || 0}/
              {fieldType == 'key' ? 20 : 50}
            </Typography>
          </InputAdornment>
        )
      }
    }}
  />
)

function DetailInformation({ form }) {
  const { register, watch, control, errors } = form
  const { fieldsAttribute, handleAddAttribute, handleRemoveAttribute } =
    useProductAttributes({ control })

  return (
    <Card sx={{ p: 3 }}>
      <TypographyTitle>{MESSAGES.TITLE}</TypographyTitle>

      <Grid2 container spacing={2} sx={{ mt: 2 }}>
        <Grid2 size={12}>
          <TypographyLabel>{MESSAGES.TAGS}</TypographyLabel>
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
                  if (newValue?.length > LIMITS.MAX_TAGS) {
                    toast.warn(MESSAGES.MAX_TAGS_WARNING)
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
                      key={`tag-${index}`}
                    />
                  ))
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    fullWidth
                    variant="outlined"
                    placeholder={MESSAGES.TAGS_PLACEHOLDER}
                  />
                )}
              />
            )}
          />
          <Typography
            variant="caption"
            color="textSecondary"
            sx={{ mt: 1, display: 'block' }}
          >
            {watch('product_tags').length} / 10 product tags
          </Typography>
        </Grid2>

        <Grid2 size={12}>
          <TypographyLabel>{MESSAGES.ATTRIBUTES}</TypographyLabel>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {fieldsAttribute.map((field, index) => (
              <Box
                key={field.id}
                sx={{
                  display: 'flex',
                  gap: 2,
                  alignItems: 'flex-start'
                }}
              >
                <AttributeField
                  register={register}
                  errors={errors}
                  index={index}
                  fieldType="key"
                  watch={watch}
                  placeholder={MESSAGES.KEY_PLACEHOLDER}
                  errorMessage={MESSAGES.KEY_REQUIRED}
                />

                <AttributeField
                  register={register}
                  errors={errors}
                  index={index}
                  fieldType="value"
                  watch={watch}
                  placeholder={MESSAGES.VALUE_PLACEHOLDER}
                  errorMessage={MESSAGES.VALUE_REQUIRED}
                />

                <HighlightOffOutlinedIcon
                  onClick={() => handleRemoveAttribute(index)}
                  sx={{
                    color: red[600],
                    cursor: 'pointer',
                    mt: 1,
                    '&:hover': { opacity: 0.7 }
                  }}
                />
              </Box>
            ))}
          </Box>
        </Grid2>

        <Grid2 size={12}>
          <Button onClick={handleAddAttribute} variant="outlined">
            {MESSAGES.ADD_BTN}
          </Button>
        </Grid2>
      </Grid2>
    </Card>
  )
}

export default DetailInformation
