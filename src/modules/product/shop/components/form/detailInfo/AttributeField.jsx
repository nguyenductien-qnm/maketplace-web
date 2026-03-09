import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import Typography from '@mui/material/Typography'
import DividerVertical from '~/components/common/DividerVertical'
import {
  PRODUCT_ATTRIBUTE_KEY_MESSAGE,
  PRODUCT_ATTRIBUTE_KEY_RULE,
  PRODUCT_ATTRIBUTE_VALUE_MESSAGE,
  PRODUCT_ATTRIBUTE_VALUE_RULE
} from '~/utils/validators'

function AttributeField({ form, index, fieldType, placeholder, errorMessage }) {
  const { register, watch, errors } = form
  return (
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
                {watch(`product_attributes.${index}.${fieldType}`)?.length || 0}
                /{fieldType == 'key' ? 20 : 50}
              </Typography>
            </InputAdornment>
          )
        }
      }}
    />
  )
}
export default AttributeField
