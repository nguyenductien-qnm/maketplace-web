import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { Box, FormControl, FormLabel, styled, Typography } from '@mui/material'
import { grey } from '@mui/material/colors'

function FormChangePassword() {
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
    <Box>
      <Typography sx={{ fontSize: '25px', marginBottom: '20px' }}>
        Password change
      </Typography>
      <FormControl
        sx={{ display: 'flex', flexDirection: 'column', gap: '15px' }}
      >
        <BoxCustom>
          <FormLabelCustom>
            Current password (leave blank to leave unchanged)
          </FormLabelCustom>
          <TextField size="small" fullWidth></TextField>
        </BoxCustom>
        <BoxCustom>
          <FormLabelCustom>
            New password (leave blank to leave unchanged)
          </FormLabelCustom>
          <TextField size="small" fullWidth></TextField>
        </BoxCustom>
        <BoxCustom>
          <FormLabelCustom>Confirm new password</FormLabelCustom>
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
          Save changes
        </Button>
      </FormControl>
    </Box>
  )
}
export default FormChangePassword
