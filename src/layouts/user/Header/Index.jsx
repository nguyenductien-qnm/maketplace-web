import { Box, Container, Divider } from '@mui/material'
import Promotion from './PromotionBar'
import TopBar from './TopBar'
import Logo from './Logo'
import SearchBar from './SearchBar'
import CartIcon from './CartIcon'
import UserProfile from './UserProfile'
import MenuItem from './MenuItems'
function Menu() {
  return (
    <Box>
      <Promotion></Promotion>
      <Container>
        <TopBar></TopBar>
        <Divider />
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: '30px',
            height: '70px'
          }}
        >
          <Logo />
          <SearchBar />
          <UserProfile />
          <CartIcon />
        </Box>
        <Divider />
        <MenuItem />
        <Divider />
      </Container>
    </Box>
  )
}

export default Menu
