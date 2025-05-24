import { Button } from '@mui/material'
import { blue } from '@mui/material/colors'

function AddToCartButton({ disableAction, addProductToCart }) {
  return (
    <Button
      className="btn-user-add-to-cart"
      onClick={() => addProductToCart()}
      sx={{
        width: '100%',
        backgroundColor: blue[500],
        color: 'white',
        textTransform: 'none',
        fontWeight: '600',
        height: '40px',
        pointerEvents: disableAction ? 'none' : 'auto',
        opacity: disableAction ? 0.5 : 1
      }}
    >
      Add to cart
    </Button>
  )
}
export default AddToCartButton
