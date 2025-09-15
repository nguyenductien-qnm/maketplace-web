import Box from '@mui/material/Box'
import Skeleton from '@mui/material/Skeleton'
import AccountOverview from '~/components/customer/CustomerDashboard/AccountOverView'
import AccountStatusCard from '~/components/customer/CustomerDashboard/AccountStatusCard'
import VendorDashboardButton from '~/components/customer/CustomerDashboard/VendorDashboardButton'
import { grey } from '@mui/material/colors'
import { Link } from 'react-router-dom'
import { useOwnerShopStatus } from '~/hooks/user/user.hook'

const contentMapShopStatus = {
  pending: {
    title: 'Vendor Registration',
    description: 'Your request has been submitted. Please wait for approval.'
  },
  approved: {
    title: 'Welcome Vendor!',
    description: 'Your shop is live. Start managing your store now.',
    button: <VendorDashboardButton />
  },
  rejected: {
    title: 'Application Rejected',
    description: 'Your vendor application was rejected. Please contact support.'
  },
  banned: {
    title: 'Account Banned',
    description:
      'Your vendor account has been banned. Contact support for more details.'
  },
  paused: {
    title: 'Shop Paused',
    description:
      'Your shop is temporarily paused. Reactivate to continue selling.',
    button: <VendorDashboardButton />
  }
}

const BecomeVendorButton = (
  <Link
    to="/my-account/account-migration"
    style={{
      backgroundColor: grey[200],
      color: 'black',
      fontWeight: '600',
      padding: '5px 10px',
      borderRadius: '5px'
    }}
  >
    Become a vendor now
  </Link>
)

function CustomerDashboard() {
  const { user, loading, shopStatus } = useOwnerShopStatus()
  const isShop = user?.user_role?.includes('SHOP')

  const renderComponent = () => {
    if (loading) return <Skeleton variant="rounded" height={66} />

    if (!loading && shopStatus !== null) {
      return <AccountStatusCard {...contentMapShopStatus[shopStatus]} />
    }

    if (!loading && !isShop && shopStatus == null)
      return (
        <AccountStatusCard
          title="Become a Vendor"
          description="Vendors can sell products and manage a store with a vendor dashboard."
          button={BecomeVendorButton}
        />
      )
  }

  return (
    <Box>
      <AccountOverview user={user} />
      {renderComponent()}
    </Box>
  )
}
export default CustomerDashboard
