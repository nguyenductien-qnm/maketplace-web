import { Box, InputLabel, TextField } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { handleChangeSPUName } from '~/redux/formCreateProduct.slice'
function NameInput() {
  const spuName = useSelector((state) => state.formCreateProduct.spuName)
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
        Product name
      </InputLabel>
      <TextField
        onChange={(e) => {
          dispatch(handleChangeSPUName(e.target.value))
        }}
        value={spuName}
        fullWidth
        size="small"
      ></TextField>
    </Box>
  )
}
export default NameInput
