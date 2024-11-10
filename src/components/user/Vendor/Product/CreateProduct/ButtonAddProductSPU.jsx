import { Box, Button } from '@mui/material'
import { blue } from '@mui/material/colors'
import { useDispatch } from 'react-redux'
import { handleIncreaseQuantityProductSKU } from '~/redux/formCreateProduct.slice'

function ButtonAddProductSKU() {
  const dispatch = useDispatch()
  return (
    <Box sx={{ display: 'flex', justifyContent: 'end' }}>
      <Button
        onClick={() => {
          dispatch(handleIncreaseQuantityProductSKU())
        }}
        sx={{
          display: 'flex',
          color: 'white',
          backgroundColor: blue[600],
          fontSize: '14px',
          marginTop: '10px'
        }}
      >
        Add product SKU
      </Button>
    </Box>
  )
}

export default ButtonAddProductSKU
