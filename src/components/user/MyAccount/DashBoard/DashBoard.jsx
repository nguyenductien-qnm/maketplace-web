import AccountOverview from './AccountOverview'
import VendorSignupCard from './VendorSignupCard'
import VendorDashboardButton from '../VendorDashboardButton'
import { Box } from '@mui/material'
import { useSelector } from 'react-redux'

function DashBoard() {
  const userRole = useSelector((state) => state.user.currentUser.user_role)
  console.log(userRole)
  console.log(userRole)
  return (
    <Box>
      <AccountOverview />
      {userRole.includes('shop') ? (
        <VendorDashboardButton />
      ) : (
        <VendorSignupCard />
      )}
    </Box>
  )
}
export default DashBoard
