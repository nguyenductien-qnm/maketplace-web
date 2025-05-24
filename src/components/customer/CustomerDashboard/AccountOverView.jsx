import styled from '@emotion/styled'
import { Box, Typography } from '@mui/material'
import { blue } from '@mui/material/colors'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { navigate } from '~/helpers/navigation'
import { logoutAPI } from '~/redux/user.slice'
import { TOAST_MODE } from '~/utils/constants'

function AccountOverview() {
  const CustomLink = styled(Link)({
    color: blue[600],
    fontSize: '14px',
    fontWeight: '600'
  })
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user.currentUser)
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
        <CustomLink to="/my-account/account-details">
          edit your password and account details
        </CustomLink>
        .
      </Typography>
    </Box>
  )
}
export default AccountOverview
