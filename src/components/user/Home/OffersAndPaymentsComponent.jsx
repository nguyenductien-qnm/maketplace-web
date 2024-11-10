import Grid from '@mui/material/Grid2'
import { Box, Typography } from '@mui/material'
import OpportunityDiscount from '~/assets/opportunityDiscount.svg'
import DiscountCode from '~/assets/discountCode.svg'
import FreeDelivery from '~/assets/freeDelivery.svg'
import PaymentMethod from '~/assets/paymentMethod.svg'
import { grey } from '@mui/material/colors'
function OffersAndPaymentsComponent() {
  return (
    <Grid
      container
      spacing={2}
      sx={{ marginTop: '40px', marginBottom: '40px' }}
    >
      <Grid size={3}>
        <Box sx={{ display: 'flex', gap: '10px' }}>
          <img
            style={{ maxWidth: '50px' }}
            src={OpportunityDiscount}
            alt="Opportunity Discounts"
          />
          <Box>
            <Typography sx={{ fontSize: '15px', fontWeight: '700' }}>
              Opportunity Discounts
            </Typography>
            <Typography sx={{ fontSize: '12px', color: grey[500] }}>
              Tasigförsamhet beteendedesign. Mobile checkout. Ylig kärrtorpa.
            </Typography>
          </Box>
        </Box>
      </Grid>

      <Grid size={3}>
        <Box sx={{ display: 'flex', gap: '10px' }}>
          <img
            style={{ maxWidth: '50px' }}
            src={DiscountCode}
            alt="Opportunity Discounts"
          />
          <Box>
            <Typography sx={{ fontSize: '15px', fontWeight: '700' }}>
              Discount Codes
            </Typography>
            <Typography sx={{ fontSize: '12px', color: grey[500] }}>
              Tasigförsamhet beteendedesign. Mobile checkout. Ylig kärrtorpa.
            </Typography>
          </Box>
        </Box>
      </Grid>

      <Grid size={3}>
        <Box sx={{ display: 'flex', gap: '10px' }}>
          <img
            style={{ maxWidth: '50px' }}
            src={FreeDelivery}
            alt="Opportunity Discounts"
          />
          <Box>
            <Typography sx={{ fontSize: '15px', fontWeight: '700' }}>
              Free Delivery
            </Typography>
            <Typography sx={{ fontSize: '12px', color: grey[500] }}>
              Tasigförsamhet beteendedesign. Mobile checkout. Ylig kärrtorpa.
            </Typography>
          </Box>
        </Box>
      </Grid>

      <Grid size={3}>
        <Box sx={{ display: 'flex', gap: '10px' }}>
          <img
            style={{ maxWidth: '50px' }}
            src={PaymentMethod}
            alt="Opportunity Discounts"
          />
          <Box>
            <Typography sx={{ fontSize: '15px', fontWeight: '700' }}>
              Secure payment methods
            </Typography>
            <Typography sx={{ fontSize: '12px', color: grey[500] }}>
              Tasigförsamhet beteendedesign. Mobile checkout. Ylig kärrtorpa.
            </Typography>
          </Box>
        </Box>
      </Grid>
    </Grid>
  )
}
export default OffersAndPaymentsComponent
