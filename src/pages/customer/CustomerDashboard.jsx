import Box from '@mui/material/Box'
import AccountOverview from '~/components/customer/CustomerDashboard/AccountOverView'
import VendorSignupCard from '~/components/customer/CustomerDashboard/VendorSignupCard'
import VendorDashboardButton from '~/components/customer/CustomerDashboard/VendorDashboardButton'
import { useSelector } from 'react-redux'

function CustomerDashboard() {
  const userRole = useSelector((state) => state.user.currentUser.user_role)
  return (
    <Box>
      <AccountOverview />
      {userRole?.includes('SHOP') ? (
        <VendorDashboardButton />
      ) : (
        <VendorSignupCard />
      )}
    </Box>
  )
}
export default CustomerDashboard
