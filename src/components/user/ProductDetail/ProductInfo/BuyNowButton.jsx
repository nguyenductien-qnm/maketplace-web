import { Box, Button } from '@mui/material'
import { blue } from '@mui/material/colors'

function BuyNowButton() {
  return (
    <Button
      sx={{
        width: '100%',
        color: 'black',
        textTransform: 'none',
        fontWeight: '600',
        border: '1px solid black',
        height: '40px'
      }}
    >
      Buy Now
    </Button>
  )
}
export default BuyNowButton
