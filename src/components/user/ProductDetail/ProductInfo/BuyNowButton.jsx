import { Button } from '@mui/material'

function BuyNowButton({ disableAction }) {
  return (
    <Button
      sx={{
        width: '100%',
        color: 'black',
        textTransform: 'none',
        fontWeight: '600',
        border: '1px solid black',
        height: '40px',
        pointerEvents: disableAction ? 'none' : 'auto',
        opacity: disableAction ? 0.5 : 1
      }}
    >
      Buy Now
    </Button>
  )
}
export default BuyNowButton
