import { Box, InputLabel, TextField } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { handleChangeSPUPrice } from '~/redux/formCreateProduct.slice'

function PriceInput() {
  const spuPrice = useSelector((state) => state.formCreateProduct.spuPrice)
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
        Product Price
      </InputLabel>
      <TextField
        onChange={(e) => dispatch(handleChangeSPUPrice(e.target.value))}
        fullWidth
        size="small"
        value={spuPrice}
      ></TextField>
    </Box>
  )
}
export default PriceInput
