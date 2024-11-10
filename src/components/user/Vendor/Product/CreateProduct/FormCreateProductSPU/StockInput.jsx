import { Box, InputLabel, TextField } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { handleChangeSPUStock } from '~/redux/formCreateProduct.slice'

function StockInput() {
  const spuStock = useSelector((state) => state.formCreateProduct.spuStock)
  const dispatch = useDispatch()
  return (
    <Box>
      <InputLabel
        sx={{
          fontSize: '14px',
          fontWeight: '600',
          marginBottom: '5px'
        }}
      >
        Product Stock
      </InputLabel>
      <TextField
        onChange={(e) => {
          dispatch(handleChangeSPUStock(e.target.value))
        }}
        fullWidth
        size="small"
        value={spuStock}
      ></TextField>
    </Box>
  )
}
export default StockInput
