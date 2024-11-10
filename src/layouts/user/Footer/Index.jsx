import { Box, Divider } from '@mui/material'
import AppDownloadLinks from './AppDownloadLinks'
import CompanyInfo from './CompanyInfo'
import ContactInfo from './ContactInfo'
import CustomerSupport from './CustomerSupport'
import NewsletterSignup from './NewsletterSignup'
import SellerOpportunities from './SellerOpportunities'
import SocialMedia from './SocialMedia'
import ForBuyer from './ForBuyer'
import Copyright from './Copyright'
import { blue } from '@mui/material/colors'
function Footer() {
  return (
    <Box sx={{ backgroundColor: '#0D6EFD', paddingBottom: '30px' }}>
      <NewsletterSignup />
      <Divider
        sx={{
          marginBottom: '30px',
          marginTop: '10px',
          backgroundColor: blue[300]
        }}
      />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-around',
          marginBottom: '30px'
        }}
      >
        <CustomerSupport />
        <SellerOpportunities />
        <CompanyInfo />
        <ForBuyer />
        <Box>
          <AppDownloadLinks />
          <SocialMedia />
        </Box>
      </Box>
      <Divider sx={{ marginBottom: '20px', backgroundColor: blue[300] }} />
      <ContactInfo />
      <Divider
        sx={{
          marginBottom: '30px',
          marginTop: '20px',
          backgroundColor: blue[300]
        }}
      />
      <Copyright />
    </Box>
  )
}
export default Footer
