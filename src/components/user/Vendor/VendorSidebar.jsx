import { Box, Divider, styled } from '@mui/material'
import { blue } from '@mui/material/colors'
import { Link, useParams } from 'react-router-dom'
import DashboardCustomizeOutlinedIcon from '@mui/icons-material/DashboardCustomizeOutlined'
import BusinessCenterOutlinedIcon from '@mui/icons-material/BusinessCenterOutlined'
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined'
import PaymentOutlinedIcon from '@mui/icons-material/PaymentOutlined'
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined'
import LocalGroceryStoreOutlinedIcon from '@mui/icons-material/LocalGroceryStoreOutlined'
function VendorSideBar({ page }) {
  const CustomLink = styled(Link)(({ isActive }) => ({
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

  const checkUrl = (url) => url === page

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <CustomLink to="/vendor/dashboard" isActive={checkUrl('dashboard')}>
        <DashboardCustomizeOutlinedIcon />
        Dashboard
      </CustomLink>
      <Divider />
      <CustomLink to="/vendor/products" isActive={checkUrl('products')}>
        <BusinessCenterOutlinedIcon />
        Products
      </CustomLink>
      <Divider />
      <CustomLink to="/vendor/orders" isActive={checkUrl('orders')}>
        <LocalGroceryStoreOutlinedIcon />
        Orders
      </CustomLink>
      <Divider />
      <CustomLink to="/vendor/store" isActive={checkUrl('store')}>
        <SettingsOutlinedIcon />
        Store
      </CustomLink>
      <Divider />
      <CustomLink to="/vendor/payment" isActive={checkUrl('payment')}>
        <PaymentOutlinedIcon />
        Payment
      </CustomLink>
      <Divider />
      <CustomLink>
        <AttachMoneyOutlinedIcon
          to="/vendor/withdraw"
          isActive={checkUrl('withdraw')}
        />
        Withdraw
      </CustomLink>
    </Box>
  )
}
export default VendorSideBar
