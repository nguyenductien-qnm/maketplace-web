import Menu from './Header/Index'
import Footer from './Footer/Index'
import SupportSection from './SupportSection'
import Container from '@mui/material/Container'
import { Divider } from '@mui/material'

function UserLayout({ children }) {
  return (
    <div>
      <Menu></Menu>
      <main>
        <Container sx={{ marginTop: '30px', marginBottom: '50px' }}>
          {children}
          <Divider sx={{ marginTop: '40px' }} />
          <SupportSection />
        </Container>
      </main>

      <Footer />
    </div>
  )
}

export default UserLayout
