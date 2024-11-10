import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined'
import InstagramIcon from '@mui/icons-material/Instagram'
import YouTubeIcon from '@mui/icons-material/YouTube'
import PinterestIcon from '@mui/icons-material/Pinterest'
import { Box } from '@mui/material'
function SocialMedia() {
  return (
    <Box sx={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
      <FacebookOutlinedIcon
        fontSize="large"
        sx={{ '&:hover': { cursor: 'pointer' } }}
      />
      <InstagramIcon
        fontSize="large"
        sx={{ '&:hover': { cursor: 'pointer' } }}
      />
      <YouTubeIcon fontSize="large" sx={{ '&:hover': { cursor: 'pointer' } }} />
      <PinterestIcon
        fontSize="large"
        sx={{ '&:hover': { cursor: 'pointer' } }}
      />
    </Box>
  )
}
export default SocialMedia
