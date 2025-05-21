import Box from '@mui/material/Box'
import backgroundAuth from '~/assets/user/img/backgroundAuth.jpg'
import FormForgotPassword from '~/components/user/Auth/FormForgotPassword'
import FormLogin from '~/components/user/Auth/FormLogin'
import FormRegister from '~/components/user/Auth/FormRegister'
import FormResetPassword from '~/components/user/Auth/FormResetPassword'
import { useParams } from 'react-router-dom'

function Auth() {
  const { page, token } = useParams()

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
      {page === 'login' && <FormLogin />}
      {page === 'register' && <FormRegister />}
      {page === 'forgot-password' && <FormForgotPassword />}
      {token && <FormResetPassword token={token} />}
    </Box>
  )
}
export default Auth
