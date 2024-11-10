import { Box, styled, Typography } from '@mui/material'
import { grey } from '@mui/material/colors'

function ForBuyer() {
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
        For Buyers
      </TypographyCustom>
      <Box
        sx={{
          marginTop: '10px',
          display: 'flex',
          flexDirection: 'column',
          gap: '5px'
        }}
      >
        <TypographyCustom>FAQ</TypographyCustom>
        <TypographyCustom>My account</TypographyCustom>
        <TypographyCustom>About Us</TypographyCustom>
        <TypographyCustom>Contact</TypographyCustom>
      </Box>
    </Box>
  )
}
export default ForBuyer
