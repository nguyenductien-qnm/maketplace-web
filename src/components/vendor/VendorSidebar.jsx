import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import DashboardCustomizeOutlinedIcon from '@mui/icons-material/DashboardCustomizeOutlined'
import BusinessCenterOutlinedIcon from '@mui/icons-material/BusinessCenterOutlined'
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined'
import LocalGroceryStoreOutlinedIcon from '@mui/icons-material/LocalGroceryStoreOutlined'
import DiscountOutlinedIcon from '@mui/icons-material/DiscountOutlined'
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined'
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd'
import LegendToggleIcon from '@mui/icons-material/LegendToggle'
import { styled } from '@mui/material/styles'
import { blue } from '@mui/material/colors'
import { Link } from 'react-router-dom'

function VendorSideBar() {
  const CustomLink = styled(Link, {
    shouldForwardProp: (prop) => prop !== 'isActive'
  })(({ isActive }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    minWidth: '100%',
    padding: '15px 20px',
    color: isActive ? 'white' : 'black',
    fontWeight: '600',
    fontSize: '14px',
    backgroundColor: isActive ? 'black' : 'none',
    '&:hover': {
      color: isActive ? 'white' : blue[600]
    }
  }))

  const checkUrl = (...paths) => {
    return paths.some((path) => window.location.pathname.includes(path))
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <CustomLink to="/vendor/dashboard" isActive={checkUrl('dashboard')}>
        <DashboardCustomizeOutlinedIcon />
        Dashboard
      </CustomLink>
      <Divider />
      <CustomLink
        to="/vendor/products"
        isActive={checkUrl('products', 'create-product', 'update-product')}
      >
        <BusinessCenterOutlinedIcon />
        Products
      </CustomLink>
      <Divider />
      <CustomLink
        to="/vendor/orders"
        isActive={checkUrl('orders', 'order-detail')}
      >
        <LocalGroceryStoreOutlinedIcon />
        Orders
      </CustomLink>
      <Divider />
      <CustomLink to="/vendor/profile" isActive={checkUrl('profile')}>
        <AssignmentIndIcon />
        Profile
      </CustomLink>
      <Divider />
      <CustomLink to="/vendor/vouchers" isActive={checkUrl('vouchers')}>
        <DiscountOutlinedIcon />
        Vouchers
      </CustomLink>
      <Divider />
      <CustomLink to="/vendor/wallet" isActive={checkUrl('wallet')}>
        <AccountBalanceWalletOutlinedIcon />
        Wallet
      </CustomLink>
      <Divider />
      <CustomLink to="/vendor/metric" isActive={checkUrl('metric')}>
        <LegendToggleIcon />
        Metrics
      </CustomLink>
      <Divider />
      <CustomLink to="/vendor/setting" isActive={checkUrl('setting')}>
        <SettingsOutlinedIcon />
        Setting
      </CustomLink>
    </Box>
  )
}
export default VendorSideBar
