import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { Box, FormControl, FormLabel, styled } from '@mui/material'
import { grey } from '@mui/material/colors'

function FormInfo() {
  const BoxCustom = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    gap: '7px'
  })

  const FormLabelCustom = styled(FormLabel)({
    fontSize: '14px',
    color: 'black'
  })
  return (
    <FormControl sx={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
      <BoxCustom>
        <FormLabelCustom>First name *</FormLabelCustom>
        <TextField size="small" fullWidth></TextField>
      </BoxCustom>
      <BoxCustom>
        <FormLabelCustom>Last name *</FormLabelCustom>
        <TextField size="small" fullWidth></TextField>
      </BoxCustom>
      <BoxCustom>
        <FormLabelCustom>Display name *</FormLabelCustom>
        <TextField size="small" fullWidth></TextField>
      </BoxCustom>
      <BoxCustom>
        <FormLabelCustom>Email address *</FormLabelCustom>
        <TextField size="small" fullWidth></TextField>
      </BoxCustom>
      <Button
        sx={{
          textTransform: 'none',
          backgroundColor: grey[200],
          color: 'black',
          fontWeight: '600',
          padding: '10px 20px',
          alignSelf: 'flex-start'
        }}
      >
        Submit
      </Button>
    </FormControl>
  )
}
export default FormInfo
