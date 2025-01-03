import { Button } from '@mui/material'
import { blue } from '@mui/material/colors'
import { useDispatch } from 'react-redux'
import { createProductAPI } from '~/redux/formProduct.slice'
function ButtonCreateProduct() {
  const dispatch = useDispatch()
  return (
    <Button
      onClick={() => dispatch(createProductAPI())}
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
