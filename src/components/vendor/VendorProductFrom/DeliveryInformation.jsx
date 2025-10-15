import Box from '@mui/material/Box'
import Tooltip from '@mui/material/Tooltip'
import Card from '@mui/material/Card'
import TextField from '@mui/material/TextField'
import Grid2 from '@mui/material/Grid2'
import TypographyLabel from '~/components/common/TypographyLabel'
import TypographyTitle from '~/components/common/TypographyTitle'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import capitalizeFirstLetter from '~/utils/capitalizeFirstLetter'
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
      },
      min: {
        value: 1,
        message: `${capitalizeFirstLetter(fieldType)} must be greater than 0`
      },
      max: {
        value: 1000000,
        message: `${capitalizeFirstLetter(
          fieldType
        )} must be less than or equal to 1,000,000`
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
      <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', mb: 3 }}>
        <TypographyTitle>{LABEL.TITLE}</TypographyTitle>
        <Tooltip
          arrow
          placement="top"
          title="Enter product dimensions and weight to calculate shipping fees accurately. Required for delivery cost estimation."
        >
          <InfoOutlinedIcon fontSize="small" sx={{ color: 'grey' }} />
        </Tooltip>
      </Box>

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
