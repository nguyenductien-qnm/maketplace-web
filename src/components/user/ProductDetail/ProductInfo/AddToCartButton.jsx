import { Button } from '@mui/material'
import { blue } from '@mui/material/colors'

function AddToCartButton() {
  return (
    <Button
      sx={{
        width: '100%',
        backgroundColor: blue[500],
        color: 'white',
        textTransform: 'none',
        fontWeight: '600',
        height: '40px'
      }}
    >
      Add to cart
    </Button>
  )
}
export default AddToCartButton
