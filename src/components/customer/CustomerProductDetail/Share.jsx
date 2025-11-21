import { Box, Typography } from '@mui/material'
import { grey } from '@mui/material/colors'
import FacebookSVG from '~/assets/user/svgIcon/icons8-facebook.svg'
import PinterestSVG from '~/assets/user/svgIcon/icons8-pinterest.svg'
import TwitterSVG from '~/assets/user/svgIcon/icons8-twitter.svg'
import WhatsappSVG from '~/assets/user/svgIcon/icons8-whatsapp.svg'

function Share() {
  return (
    <Box>
      <Typography>Share this product:</Typography>
      <Box
        sx={{
          display: 'flex',
          gap: '10px',
          alignItems: 'center',
          justifyItems: 'start',
          marginTop: '10px'
        }}
      >
        <img
          style={{
            border: '1px solid',
            borderColor: grey[400],
            borderRadius: '9999px'
          }}
          src={FacebookSVG}
        />
        <img
          style={{
            border: '1px solid',
            borderColor: grey[400],
            borderRadius: '9999px'
          }}
          src={TwitterSVG}
        />
        <img
          style={{
            border: '1px solid',
            borderColor: grey[400],
            borderRadius: '9999px'
          }}
          src={PinterestSVG}
        />
        <img
          style={{
            border: '1px solid',
            borderColor: grey[400],
            borderRadius: '9999px'
          }}
          src={WhatsappSVG}
        />
      </Box>
    </Box>
  )
}
export default Share
