import { Box } from '@mui/material'
import { useParams } from 'react-router-dom'
import backgroundAuth from '~/assets/user/img/backgroundAuth.jpg'
import FormLogin from '~/components/user/Auth/FormLogin'
import FormRegister from '~/components/user/Auth/FormRegister'
function Auth() {
  const { page } = useParams()
  console.log(page)
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
    </Box>
  )
}
export default Auth
