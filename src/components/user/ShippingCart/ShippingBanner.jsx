import { Box, styled, Typography } from '@mui/material'
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined'
import { green } from '@mui/material/colors'
function ShippingBanner() {
  const ShippingProgressBar = styled(Box)({
    width: '100%',
    height: '5px',
    borderRadius : '10px',
    backgroundColor: green[800]
  })
  return (
    <Box
      sx={{
        backgroundColor: 'red',
        padding: '0 20px',
        minHeight: '80px',
        backgroundColor: green[50],
        borderRadius: '1px solid',
        borderRadius: '5px',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: '10px'
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: '20px'
        }}
      >
        <LocalShippingOutlinedIcon sx={{ color: green[800] }} />
        <Typography
          sx={{ color: green[800], fontWeight: '600', fontSize: '14px' }}
        >
          Your order qualifies for free shipping!
        </Typography>
      </Box>
      <ShippingProgressBar />
    </Box>
  )
}
export default ShippingBanner
