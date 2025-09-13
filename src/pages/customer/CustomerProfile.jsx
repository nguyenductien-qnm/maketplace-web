import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import FormChangePassword from '~/components/customer/CustomerProfile/FormChangePassword'
import FormInfoDetail from '~/components/customer/CustomerProfile/FormInfoDetail'

function CustomerProfile() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '50px' }}>
      <Box sx={{ mb: '-40px' }}>
        <Typography sx={{ fontSize: '20px', mb: '10px' }}>Profile</Typography>
        <Divider />
      </Box>
      <FormInfoDetail />
      <Divider />
      <FormChangePassword />
    </Box>
  )
}
export default CustomerProfile
