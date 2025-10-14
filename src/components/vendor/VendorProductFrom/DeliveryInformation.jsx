import Card from '@mui/material/Card'
import TextField from '@mui/material/TextField'
import Grid2 from '@mui/material/Grid2'
import TypographyLabel from '~/components/common/TypographyLabel'
import TypographyTitle from '~/components/common/TypographyTitle'
import {
  FIELD_REQUIRED_MESSAGE,
  NUMBER_RULE,
  NUMBER_RULE_MESSAGE
} from '~/utils/validators'

const LABEL = {
  TITLE: 'Delivery Information',
  LENGTH: 'Length (cm)',
  WIDTH: 'Width (cm)',
  HEIGHT: 'Height (cm)',
  WEIGHT: 'Weight (kg)'
}

const DIMENSIONS = [
  { key: 'length', label: LABEL.LENGTH },
  { key: 'width', label: LABEL.WIDTH },
  { key: 'height', label: LABEL.HEIGHT },
  { key: 'weight', label: LABEL.WEIGHT }
]

const DemissionField = ({ register, errors, fieldType }) => (
  <TextField
    fullWidth
    type="number"
    {...register(`product_dimensions.${fieldType}`, {
      required: FIELD_REQUIRED_MESSAGE,
      pattern: {
        value: NUMBER_RULE,
        message: NUMBER_RULE_MESSAGE
      }
    })}
    error={!!errors?.product_dimensions?.[fieldType]}
    helperText={errors?.product_dimensions?.[fieldType]?.message}
  />
)

function DeliveryInformation({ form }) {
  const { register, errors } = form
  return (
    <Card sx={{ p: 3 }}>
      <TypographyTitle>{LABEL.TITLE}</TypographyTitle>

      <Grid2 container spacing={2} rowSpacing={2} mt={2}>
        {DIMENSIONS.map(({ key, label }) => (
          <Grid2 key={key} size={3}>
            <TypographyLabel>{label}</TypographyLabel>
            <DemissionField
              register={register}
              errors={errors}
              fieldType={key}
            />
          </Grid2>
        ))}
      </Grid2>
    </Card>
  )
}
export default DeliveryInformation
