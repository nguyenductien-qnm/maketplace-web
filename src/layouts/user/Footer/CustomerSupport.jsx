import { Box, styled, Typography } from '@mui/material'
import { grey } from '@mui/material/colors'

function CustomerSupport() {
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
        Let Us Help You
      </TypographyCustom>
      <Box
        sx={{
          marginTop: '10px',
          display: 'flex',
          flexDirection: 'column',
          gap: '5px'
        }}
      >
        <TypographyCustom>Your Orders</TypographyCustom>
        <TypographyCustom>Returns & Replacements</TypographyCustom>
        <TypographyCustom>Shipping Rates & Policies</TypographyCustom>
        <TypographyCustom>Refund and Returns Policy</TypographyCustom>
        <TypographyCustom>Privacy Policy</TypographyCustom>
        <TypographyCustom>Terms and Conditions</TypographyCustom>
        <TypographyCustom>Cookie Settings</TypographyCustom>
        <TypographyCustom>Help Center</TypographyCustom>
      </Box>
    </Box>
  )
}
export default CustomerSupport
