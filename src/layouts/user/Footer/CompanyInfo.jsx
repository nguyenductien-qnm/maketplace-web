import { Box, styled, Typography } from '@mui/material'
import { grey } from '@mui/material/colors'

function CompanyInfo() {
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
        Get to Know Us
      </TypographyCustom>
      <Box
        sx={{
          marginTop: '10px',
          display: 'flex',
          flexDirection: 'column',
          gap: '5px'
        }}
      >
        <TypographyCustom>Careers for Bevesi</TypographyCustom>
        <TypographyCustom>About Bevesi</TypographyCustom>
        <TypographyCustom>Inverstor Relations</TypographyCustom>
        <TypographyCustom>Bevesi Devices</TypographyCustom>
        <TypographyCustom>Customer reviews</TypographyCustom>
        <TypographyCustom>Social Responsibility</TypographyCustom>
        <TypographyCustom>Store Locations</TypographyCustom>
      </Box>
    </Box>
  )
}
export default CompanyInfo
