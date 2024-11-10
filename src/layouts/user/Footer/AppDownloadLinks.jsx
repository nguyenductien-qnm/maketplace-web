import { Box, styled, Typography } from '@mui/material'
import { grey } from '@mui/material/colors'
import downloadGooglePlayImg from '~/assets/user/img/downloadGooglePlay.png'
import downloadAppStoreImg from '~/assets/user/img/downloadAppStore.png'

function AppDownloadLinks() {
  const TypographyCustom = styled(Typography)({
    fontSize: '14px',
    color: grey[300],
    '&:hover': {
      cursor: 'pointer'
    }
  })
  return (
    <Box sx={{ maxWidth: '200px' }}>
      <TypographyCustom sx={{ fontSize: '16px', fontWeight: '600' }}>
        Download
      </TypographyCustom>
      <Box
        sx={{
          marginTop: '10px',
          display: 'flex',
          flexDirection: 'column',
          gap: '5px'
        }}
      >
        <TypographyCustom>
          You can download our mobile application from app stores
        </TypographyCustom>
        <Box sx={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
          <img style={{ height: '40px' }} src={downloadGooglePlayImg} />
          <TypographyCustom sx={{ fontSize: '10px' }}>
            Download App Get -10% Discount
          </TypographyCustom>
        </Box>
        <Box sx={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
          <img style={{ height: '40px' }} src={downloadAppStoreImg} />
          <TypographyCustom sx={{ fontSize: '10px' }}>
            Download App Get -10% Discount
          </TypographyCustom>
        </Box>
      </Box>
    </Box>
  )
}
export default AppDownloadLinks
