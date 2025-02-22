import styled from '@emotion/styled'
import { Box, Typography } from '@mui/material'
import { grey } from '@mui/material/colors'
import { useNavigate } from 'react-router-dom'

const TypographyCustom = styled(Typography)({
  color: grey[600],
  fontSize: '12px',
  fontWeight: '700',
  '&:hover': {
    cursor: 'pointer',
    color: grey[900]
  }
})

function TopBar() {
  const navigate = useNavigate()
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '40px'
      }}
    >
      <Box sx={{ display: 'flex', gap: '20px' }}>
        <TypographyCustom>FAQ</TypographyCustom>
        <TypographyCustom>My Account</TypographyCustom>
        <TypographyCustom>About Us</TypographyCustom>
        <TypographyCustom>Contact</TypographyCustom>
      </Box>

      <Box sx={{ display: 'flex', gap: '20px' }}>
        <TypographyCustom>Order Tracking</TypographyCustom>
        <TypographyCustom>English</TypographyCustom>
        <TypographyCustom>USD</TypographyCustom>
      </Box>
    </Box>
  )
}

export default TopBar
