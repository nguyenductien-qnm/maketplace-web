import { Button } from '@mui/material'
import { blue } from '@mui/material/colors'

function ButtonCreateProduct() {
  return (
    <Button
      fullWidth
      sx={{
        fontWeight: '600',
        color: 'white',
        backgroundColor: blue[600],
        marginTop: '20px'
      }}
    >
      Submit
    </Button>
  )
}
export default ButtonCreateProduct
