import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Typography
} from '@mui/material'
import { blue, grey } from '@mui/material/colors'
import Grid from '@mui/material/Grid2'

function CartSummary() {
  return (
    <Card sx={{ minWidth: '100%' }}>
      <CardContent>
        <Typography sx={{ fontSize: '14px', fontWeight: '600' }}>
          CART TOTALS
        </Typography>
        <Box
          sx={{
            marginTop: '15px',
            display: 'flex',
            alignContent: 'center',
            justifyContent: 'space-between'
          }}
        >
          <Typography sx={{ fontSize: '12px', color: grey[500] }}>
            Subtotal
          </Typography>
          <Typography>$206.59</Typography>
        </Box>
        <Divider sx={{ marginTop: '15px' }} />

        <Grid
          container
          alignItems="center"
          justifyContent="space-between"
          sx={{ marginTop: '15px', marginBottom: '15px' }}
        >
          <Grid size={9}>
            <Typography sx={{ fontSize: '12px' }}>
              SAMSUNG 75_ Class QN85C Neo QLED 4K Smart TV QN75QN85CAFXZA 2023
              x1
            </Typography>
          </Grid>
          <Grid size={3}>
            $980.99
          </Grid>
        </Grid>
        <Divider />

        <Box
          sx={{
            marginTop: '15px',
            display: 'flex',
            alignContent: 'center',
            justifyContent: 'space-between'
          }}
        >
          <Typography sx={{ fontSize: '12px', color: grey[500] }}>
            Total
          </Typography>
          <Typography>$206.59</Typography>
        </Box>

        <Button
          sx={{
            marginTop: '20px',
            minWidth: '100%',
            backgroundColor: blue[600],
            fontSize: '14px',
            textTransform: 'none',
            fontWeight: '600',
            color: 'white',
            padding: '10px 0'
          }}
        >
          Proceed to checkout
        </Button>
      </CardContent>
    </Card>
  )
}
export default CartSummary
