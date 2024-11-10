import { Box, styled, Typography } from '@mui/material'
import { grey } from '@mui/material/colors'

function SellerOpportunities() {
  const TypographyCustom = styled(Typography)({
    fontSize: '14px',
    color: grey[300],
    '&:hover': {
      cursor: 'pointer'
    }
  })
  return (
    <Box>
      <TypographyCustom sx={{ fontSize: '16px', fontWeight: '600' }}>
        Make Money with Us
      </TypographyCustom>
      <Box
        sx={{
          marginTop: '10px',
          display: 'flex',
          flexDirection: 'column',
          gap: '5px'
        }}
      >
        <TypographyCustom>Sell on Bevesi</TypographyCustom>
        <TypographyCustom>Sell Your Services on Bevesi</TypographyCustom>
        <TypographyCustom>Sell on Bevesi Business</TypographyCustom>
        <TypographyCustom>Sell Your Apps on Bevesi</TypographyCustom>
        <TypographyCustom>Become an Affilate</TypographyCustom>
        <TypographyCustom>Advertise Your Products</TypographyCustom>
        <TypographyCustom>Sell-Publish with Us</TypographyCustom>
        <TypographyCustom>Become an Bevesi Vendor</TypographyCustom>
      </Box>
    </Box>
  )
}
export default SellerOpportunities
