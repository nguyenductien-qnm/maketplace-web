import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import FormChangePassword from '~/components/customer/CustomerAccountDetail/FormChangePassword'
import FormInfoDetail from '~/components/customer/CustomerAccountDetail/FormInfoDetail'

function CustomerAccountDetail() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '50px' }}>
      <FormInfoDetail />
      <Divider />
      <FormChangePassword />
    </Box>
  )
}
export default CustomerAccountDetail
