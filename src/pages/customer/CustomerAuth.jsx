import Box from '@mui/material/Box'
import backgroundAuth from '~/assets/user/img/backgroundAuth.jpg'
import FormForgotPassword from '~/components/customer/CustomerAuth/FormForgotPassword'
import FormLogin from '~/components/customer/CustomerAuth/FormLogin'
import FormRegister from '~/components/customer/CustomerAuth/FormRegister'
import FormResetPassword from '~/components/customer/CustomerAuth/FormResetPassword'
import { useLocation, useParams } from 'react-router-dom'

function CustomerAuth() {
  const { page, token } = useParams()
  const { pathname } = useLocation()
  const isAdmin = pathname?.includes('admin')
  return (
    <Box
      sx={{
        width: '100%',
        height: '100vh',
        backgroundImage: `url(${backgroundAuth})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        display: 'flex',
        justifyContent: 'start',
        alignItems: 'center',
        padding: '150px'
      }}
    >
      {page === 'login' && <FormLogin isAdmin={isAdmin} />}
      {page === 'register' && <FormRegister />}
      {page === 'forgot-password' && <FormForgotPassword />}
      {token && <FormResetPassword token={token} />}
    </Box>
  )
}
export default CustomerAuth
