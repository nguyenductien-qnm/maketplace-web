import { Box, Button, Typography } from '@mui/material'
import { grey } from '@mui/material/colors'
import { Link } from 'react-router-dom'

function VendorSignupCard() {
  return (
    <Box
      sx={{
        minWidth: '100%',
        border: '1px solid',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 20px',
        borderRadius: '5px',
        borderColor: grey[300],
        marginTop: '50px'
      }}
    >
      <Box>
        <Typography sx={{ fontWeight: '600' }}>Become a Vendor</Typography>
        <Typography sx={{ fontSize: '14px' }}>
          Vendors can sell products and manage a store with a vendor dashboard.
        </Typography>
      </Box>
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
        Become a vendor
      </Link>
    </Box>
  )
}
export default VendorSignupCard
