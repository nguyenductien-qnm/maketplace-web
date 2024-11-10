import styled from '@emotion/styled'
import { Box, Typography } from '@mui/material'
import { blue } from '@mui/material/colors'
import { Link } from 'react-router-dom'

function AccountOverview() {
  const CustomLink = styled(Link)({
    color: blue[600],
    fontSize: '14px',
    fontWeight: '600'
  })
  return (
    <Box>
      <Typography sx={{ fontSize: '14px', display: 'flex' }}>
        Hello
        <Typography sx={{ fontWeight: '600', fontSize: '14px', mx: '4px' }}>
          ndtien317@gmail.com
        </Typography>
        (not
        <Typography sx={{ fontWeight: '600', fontSize: '14px', mx: '4px' }}>
          ndtien317@gmail.com?
        </Typography>
        <CustomLink>Log out</CustomLink>)
      </Typography>

      <Typography sx={{ fontSize: '14px', marginTop: '20px' }}>
        From your account dashboard you can view your{' '}
        <CustomLink>recent orders</CustomLink>, manage your{' '}
        <CustomLink>shipping and billing addresses</CustomLink>, and
        <CustomLink>edit your password and account details</CustomLink>.
      </Typography>
    </Box>
  )
}
export default AccountOverview
