import { Box, Button } from '@mui/material'
import { blue } from '@mui/material/colors'
import { useDispatch } from 'react-redux'
import { handleIncreaseQuantityAttribute } from '~/redux/formProduct.slice'

function ButtonAddAttribute() {
  const dispatch = useDispatch()
  return (
    <Box sx={{ display: 'flex', justifyContent: 'end', marginTop: '10px' }}>
      <Button
        onClick={() => {
          dispatch(handleIncreaseQuantityAttribute())
        }}
        sx={{
          fontSize: '14px',
          color: 'white',
          backgroundColor: blue[600]
        }}
      >
        Add more attribue
      </Button>
    </Box>
  )
}
export default ButtonAddAttribute
