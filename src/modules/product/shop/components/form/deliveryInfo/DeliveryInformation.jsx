import Box from '@mui/material/Box'
import Tooltip from '@mui/material/Tooltip'
import Card from '@mui/material/Card'
import Grid2 from '@mui/material/Grid2'
import TypographyLabel from '~/components/common/TypographyLabel'
import TypographyTitle from '~/components/common/TypographyTitle'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import DemissionField from './DemissionField'
import { PRODUCT_DIMENSION_FIELDS } from '../../../constants/product.constant'

function DeliveryInformation({ form }) {
  return (
    <Card sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', mb: 3 }}>
        <TypographyTitle>Delivery Information</TypographyTitle>
        <Tooltip
          arrow
          placement="top"
          title="Enter product dimensions and weight to calculate shipping fees accurately. Required for delivery cost estimation."
        >
          <InfoOutlinedIcon fontSize="small" sx={{ color: 'grey' }} />
        </Tooltip>
      </Box>

      <Grid2 container spacing={2} rowSpacing={2} mt={2}>
        {PRODUCT_DIMENSION_FIELDS.map(({ key, label, min, max }) => (
          <Grid2 key={key} size={3}>
            <TypographyLabel>{label}</TypographyLabel>
            <DemissionField form={form} fieldType={key} min={min} max={max} />
          </Grid2>
        ))}
      </Grid2>
    </Card>
  )
}
export default DeliveryInformation
