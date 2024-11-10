import { Box, Divider } from '@mui/material'
import FormInfo from './FormInfo'
import FormChangePassword from './FormChangePassword'

function AccountDetail() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '50px' }}>
      <FormInfo />
      <Divider />
      <FormChangePassword />
    </Box>
  )
}
export default AccountDetail
