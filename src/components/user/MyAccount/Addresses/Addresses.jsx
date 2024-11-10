import { Box, Button, Divider, Typography } from '@mui/material'

import AddressCard from './AddressCard'
import AddressModal from './AddressModal'
function Addresses() {
  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '20px'
        }}
      >
        <Typography sx={{ fontSize: '20px' }}>My Addresses</Typography>
        <AddressModal />
      </Box>
      <Divider />
      <Box>
        <AddressCard />
        <Divider />
        <AddressCard />
        <Divider />
        <AddressCard />
        <Divider />
        <AddressCard />
        <Divider />
        <AddressCard />
        <Divider />
        <AddressCard />
        <Divider />
        <AddressCard />
        <Divider />
        <AddressCard />
      </Box>
    </Box>
  )
}
export default Addresses
