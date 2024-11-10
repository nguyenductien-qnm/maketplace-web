import AccountOverview from './AccountOverview'
import VendorSignupCard from './VendorSignupCard'
import VendorDashboardButton from '../VendorDashboardButton'
import { Box } from '@mui/material'

function DashBoard() {
  return (
    <Box>
      <AccountOverview />
      <VendorSignupCard />
      <VendorDashboardButton />
    </Box>
  )
}
export default DashBoard
