import { Box, Divider, styled } from '@mui/material'
import { blue } from '@mui/material/colors'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { logoutAPI } from '~/redux/user.slice'
import { TOAST_MODE } from '~/utils/constants'

function CostumerSideBar() {
  const dispatch = useDispatch()
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
      <CustomLink to="/my-account/dashboard" isActive={checkUrl('dashboard')}>
        Dashboard
      </CustomLink>
      <Divider />
      <CustomLink
        to="/my-account/orders"
        isActive={checkUrl('orders', 'order-detail')}
      >
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
      <CustomLink
        to="/my-account/notifications"
        isActive={checkUrl('notifications')}
      >
        Notifications
      </CustomLink>
      <Divider />
      <CustomLink to="/my-account/wallet" isActive={checkUrl('wallet')}>
        Wallet
      </CustomLink>
      <Divider />
      <CustomLink onClick={() => dispatch(logoutAPI({ ...TOAST_MODE.ALL }))}>
        Log out
      </CustomLink>
    </Box>
  )
}
export default CostumerSideBar
