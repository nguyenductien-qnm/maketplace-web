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
import InputAdornment from '@mui/material/InputAdornment'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import DividerVertical from '~/components/common/DividerVertical'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import { red } from '@mui/material/colors'
import { toast } from 'react-toastify'
import { Controller } from 'react-hook-form'
import { useProductAttributes } from '~/hooks/vendor/product/productAttribute'
import {
  PRODUCT_ATTRIBUTE_KEY_MESSAGE,
  PRODUCT_ATTRIBUTE_KEY_RULE,
  PRODUCT_ATTRIBUTE_VALUE_MESSAGE,
  PRODUCT_ATTRIBUTE_VALUE_RULE,
  PRODUCT_TAG_RULE,
  PRODUCT_TAG_RULE_MESSAGE
} from '~/utils/validators'

const LIMITS = {
  MAX_TAGS: 10
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

const TOOLTIP = {
  TAGS: 'Add up to 10 tags to help buyers find your product easily. Each tag can contain letters only and maximum 20 characters.',
  ATTRIBUTES:
    'Add custom attributes for your product (e.g., Color, Size, Material). Key: maximum 20 characters, Value: maximum 50 characters. Only letters, numbers and commas allowed.'
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
      required: errorMessage,
      pattern: {
        value:
          fieldType == 'key'
            ? PRODUCT_ATTRIBUTE_KEY_RULE
            : PRODUCT_ATTRIBUTE_VALUE_RULE,
        message:
          fieldType == 'key'
            ? PRODUCT_ATTRIBUTE_KEY_MESSAGE
            : PRODUCT_ATTRIBUTE_VALUE_MESSAGE
      }
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
      <TypographyTitle sx={{ mb: 3 }}>{MESSAGES.TITLE}</TypographyTitle>

      <Grid2 container rowSpacing={3} sx={{ mt: 2 }}>
        <Grid2 size={12}>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <TypographyLabel>{MESSAGES.TAGS}</TypographyLabel>
            <Tooltip arrow placement="top" title={TOOLTIP.TAGS}>
              <InfoOutlinedIcon fontSize="small" sx={{ color: 'grey' }} />
            </Tooltip>
          </Box>
          <Controller
            name="product_tags"
            control={control}
            defaultValue={[]}
            rules={{
              validate: {
                validTags: (value) => {
                  if (!value || value.length === 0) return true

                  const invalidTags = value.filter(
                    (tag) => !PRODUCT_TAG_RULE.test(tag)
                  )
                  if (invalidTags.length > 0) {
                    return `Invalid tags: ${invalidTags.join(
                      ', '
                    )}. ${PRODUCT_TAG_RULE_MESSAGE}`
                  }
                  return true
                }
              }
            }}
            render={({ field, fieldState: { error } }) => (
              <>
                <Autocomplete
                  fullWidth
                  multiple
                  freeSolo
                  options={[]}
                  value={field.value}
                  onChange={(event, newValue) => {
                    if (newValue.length < field.value.length) {
                      field.onChange(newValue)
                      return
                    }
                    const lastTag = newValue[newValue.length - 1]
                    if (lastTag && !PRODUCT_TAG_RULE.test(lastTag)) {
                      toast.error(PRODUCT_TAG_RULE_MESSAGE)
                      return
                    }
                    if (newValue.length > LIMITS.MAX_TAGS) {
                      toast.warn(MESSAGES.MAX_TAGS_WARNING)
                      return
                    }
                    field.onChange(newValue)
                  }}
                  renderTags={(value, getTagProps) =>
                    value.map((option, index) => {
                      const isInvalid = !PRODUCT_TAG_RULE.test(option)
                      return (
                        <Chip
                          variant="outlined"
                          label={option}
                          {...getTagProps({ index })}
                          key={`tag-${index}`}
                          color={isInvalid ? 'error' : 'default'}
                        />
                      )
                    })
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      fullWidth
                      variant="outlined"
                      placeholder={
                        field.value?.length >= LIMITS.MAX_TAGS
                          ? `Maximum ${LIMITS.MAX_TAGS} tags reached`
                          : MESSAGES.TAGS_PLACEHOLDER
                      }
                      error={!!error}
                      helperText={
                        error?.message ||
                        `${field.value?.length || 0}/${LIMITS.MAX_TAGS} tags`
                      }
                    />
                  )}
                />
              </>
            )}
          />
        </Grid2>

        <Grid2 size={12}>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <TypographyLabel>{MESSAGES.ATTRIBUTES}</TypographyLabel>
            <Tooltip arrow placement="top" title={TOOLTIP.ATTRIBUTES}>
              <InfoOutlinedIcon fontSize="small" sx={{ color: 'grey' }} />
            </Tooltip>
          </Box>
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
