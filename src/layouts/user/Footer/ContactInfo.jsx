import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined'
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined'
import HeadphonesOutlinedIcon from '@mui/icons-material/HeadphonesOutlined'
import TelegramIcon from '@mui/icons-material/Telegram'
import WhatsAppIcon from '@mui/icons-material/WhatsApp'
import { Box, Typography } from '@mui/material'
function ContactInfo() {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-around',
        alignContent: 'center',
        padding: '0px 150px'
      }}
    >
      <Box sx={{ display: 'flex', gap: '10px' }}>
        <LocalPhoneOutlinedIcon sx={{ color: 'white' }} />
        <Typography
          sx={{ color: 'white', fontSize: '14px', fontWeight: '600' }}
        >
          +84 905 494 082
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', gap: '10px' }}>
        <EmailOutlinedIcon sx={{ color: 'white' }} />
        <Typography
          sx={{ color: 'white', fontSize: '14px', fontWeight: '600' }}
        >
          Send Mail
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', gap: '10px' }}>
        <HeadphonesOutlinedIcon sx={{ color: 'white' }} />
        <Typography
          sx={{ color: 'white', fontSize: '14px', fontWeight: '600' }}
        >
          Write to us
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', gap: '10px' }}>
        <TelegramIcon sx={{ color: 'white' }} />
        <Typography
          sx={{ color: 'white', fontSize: '14px', fontWeight: '600' }}
        >
          Telegram
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', gap: '10px' }}>
        <WhatsAppIcon sx={{ color: 'white' }} />
        <Typography
          sx={{ color: 'white', fontSize: '14px', fontWeight: '600' }}
        >
          WhatsApp
        </Typography>
      </Box>
    </Box>
  )
}
export default ContactInfo
