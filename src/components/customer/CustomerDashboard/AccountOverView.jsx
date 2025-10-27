import styled from 'styled-components'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { blue } from '@mui/material/colors'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { logoutAPI } from '~/redux/user.slice'
import { TOAST_MODE } from '~/utils/constants'

const CustomLink = styled(Link)({
  color: blue[600],
  fontSize: '14px',
  fontWeight: '600'
})

function AccountOverview({ user }) {
  const dispatch = useDispatch()
  return (
    <Box sx={{ marginBottom: '50px' }}>
      <Typography
        sx={{ fontSize: '14px', display: 'flex', alignItems: 'center' }}
      >
        Hello
        <Typography
          component="span"
          sx={{ fontWeight: '600', fontSize: '14px', mx: '4px' }}
        >
          {user?.user_email}
        </Typography>
        (not
        <Typography
          component="span"
          sx={{ fontWeight: '600', fontSize: '14px', mx: '4px' }}
        >
          {user?.user_email}?
        </Typography>
        <Typography
          onClick={() => dispatch(logoutAPI({ ...TOAST_MODE.ALL }))}
          component="span"
          sx={{
            fontWeight: '600',
            fontSize: '14px',
            mx: '4px',
            color: blue[600],
            '&:hover': {
              cursor: 'pointer'
            }
          }}
        >
          Log out
        </Typography>
        )
      </Typography>

      <Typography sx={{ fontSize: '14px', marginTop: '20px' }}>
        From your account dashboard you can view your{' '}
        <CustomLink to="/my-account/orders">recent orders</CustomLink>, manage
        your{' '}
        <CustomLink to="/my-account/addresses">
          shipping and billing addresses
        </CustomLink>
        , and{' '}
        <CustomLink to="/my-account/profile">
          edit your password and account details
        </CustomLink>
        .
      </Typography>
    </Box>
  )
}
export default AccountOverview
