import TextField from '@mui/material/TextField'
import capitalizeFirstLetter from '~/utils/capitalizeFirstLetter'
import {
  FIELD_REQUIRED_MESSAGE,
  NUMBER_RULE,
  NUMBER_RULE_MESSAGE
} from '~/utils/validators'

function DemissionField({ form, fieldType, min, max }) {
  const { register, errors } = form
  return (
    <TextField
      fullWidth
      type="number"
      {...register(`product_dimensions.${fieldType}`, {
        required: FIELD_REQUIRED_MESSAGE,
        pattern: {
          value: NUMBER_RULE,
          message: NUMBER_RULE_MESSAGE
        },
        min: {
          value: min,
          message: `${capitalizeFirstLetter(fieldType)} must be greater than ${min}`
        },
        max: {
          value: max,
          message: `${capitalizeFirstLetter(
            fieldType
          )} must be less than or equal to ${max}`
        }
      })}
      error={!!errors?.product_dimensions?.[fieldType]}
      helperText={errors?.product_dimensions?.[fieldType]?.message}
    />
  )
}

export default DemissionField
