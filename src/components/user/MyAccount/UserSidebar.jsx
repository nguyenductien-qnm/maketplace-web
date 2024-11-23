import { Box, Divider, styled } from '@mui/material'
import { blue } from '@mui/material/colors'
import { Link } from 'react-router-dom'

function UserSideBar({ page }) {
  const CustomLink = styled(Link, {
    shouldForwardProp: (prop) => prop !== 'isActive' //isActive chỉ cần để tính toán style, không cần xuất hiện trong DOM.
  })(({ isActive }) => ({
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
      <CustomLink to="/my-account/dashboard" isActive={checkUrl('dashboard')}>
        Dashboard
      </CustomLink>
      <Divider />
      <CustomLink to="/my-account/orders" isActive={checkUrl('orders')}>
        Orders
      </CustomLink>
      <Divider />
      <CustomLink to="/my-account/addresses" isActive={checkUrl('addresses')}>
        Addresses
      </CustomLink>
      <Divider />
      <CustomLink
        to="/my-account/account-details"
        isActive={checkUrl('account-details')}
      >
        Account details
      </CustomLink>
      <Divider />
      <CustomLink to="/my-account/wish-list" isActive={checkUrl('wish-list')}>
        Wishlist
      </CustomLink>
      <Divider />
      <CustomLink>Log out</CustomLink>
    </Box>
  )
}
export default UserSideBar
