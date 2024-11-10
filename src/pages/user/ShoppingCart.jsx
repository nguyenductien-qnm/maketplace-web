import UserLayout from '~/layouts/user/UserLayout'
import Grid from '@mui/material/Grid2'
import ShippingBanner from '~/components/user/ShippingCart/ShippingBanner'
import CartTable from '~/components/user/ShippingCart/CartTable/CartTable'
import CartSummary from '~/components/user/ShippingCart/CartSummary'
import { Box, Button } from '@mui/material'
function ShoppingCart() {
  return (
    <UserLayout>
      <Grid container spacing={2}>
        <Grid item size={9}>
          <ShippingBanner />
          <CartTable />
          <Box sx={{ textAlign: 'end' }}>
            <Button
              sx={{
                marginTop: '20px',
                textTransform: 'none',
                fontSize: '14px',
                fontWeight: '600',
                padding: '10px 40px',
                backgroundColor: 'black',
                color: 'white'
              }}
            >
              Clear
            </Button>
          </Box>
        </Grid>
        <Grid item size={3}>
          <CartSummary />
        </Grid>
      </Grid>
    </UserLayout>
  )
}
export default ShoppingCart
