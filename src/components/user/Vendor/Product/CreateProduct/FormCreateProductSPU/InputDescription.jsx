import { Box, InputLabel, TextField } from '@mui/material'

function InputDescription() {
  return (
    <Box>
      <InputLabel
        sx={{
          fontSize: '14px',
          fontWeight: '600',
          marginBottom: '5px'
        }}
      >
        Product Desciption
      </InputLabel>
      <TextField fullWidth multiline rows={10}></TextField>
    </Box>
  )
}
export default InputDescription
