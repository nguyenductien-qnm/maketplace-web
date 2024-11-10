import { Box, Typography } from '@mui/material'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import ModeCommentIcon from '@mui/icons-material/ModeComment'
import PhoneForwardedIcon from '@mui/icons-material/PhoneForwarded'
import { blue } from '@mui/material/colors'
function SupportSection() {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: '30px',
        marginBottom: '30px'
      }}
    >
      <Box>
        <Typography sx={{ fontSize: '18px', fontWeight: '700' }}>
          Need help?
        </Typography>
        <Typography sx={{ fontSize: '14px' }}>
          Reach out to us on any of the support channel
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', gap: '20px' }}>
        <Box
          sx={{
            display: 'flex',
            gap: '20px',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <LocationOnIcon fontSize="large" sx={{ color: blue[600] }} />
          <Box>
            <Typography
              sx={{ fontSize: '16px', fontWeight: '700', color: blue[600] }}
            >
              Store Locator
            </Typography>
            <Typography sx={{ fontSize: '14px' }}>
              Find a store nearby
            </Typography>
          </Box>
        </Box>

        <Box
          sx={{
            display: 'flex',
            gap: '20px',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <ModeCommentIcon fontSize="large" sx={{ color: blue[600] }} />
          <Box>
            <Typography
              sx={{ fontSize: '16px', fontWeight: '700', color: blue[600] }}
            >
              Feedback
            </Typography>
            <Typography sx={{ fontSize: '14px' }}>
              Send us your feedback
            </Typography>
          </Box>
        </Box>

        <Box
          sx={{
            display: 'flex',
            gap: '20px',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <PhoneForwardedIcon fontSize="large" sx={{ color: blue[600] }} />
          <Box>
            <Typography
              sx={{ fontSize: '16px', fontWeight: '700', color: blue[600] }}
            >
              Chat Now
            </Typography>
            <Typography sx={{ fontSize: '14px' }}>
              Send us your feedback
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
export default SupportSection
