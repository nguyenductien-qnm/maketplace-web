import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'

function BannerAndAvatarDisplay({ shopBanner, shopAvatar }) {
  return (
    <Box sx={{ position: 'relative' }}>
      <img
        style={{ width: '100%', height: '200px', objectFit: 'cover' }}
        src={
          shopBanner ||
          'https://i.pinimg.com/736x/58/c3/33/58c33377dfcbb3022493dec49d098b02.jpg'
        }
      />
      <Avatar
        sx={{
          height: '80px',
          width: '80px',
          position: 'absolute',
          bottom: 30,
          left: 30
        }}
        src={shopAvatar || undefined}
      ></Avatar>
    </Box>
  )
}

export default BannerAndAvatarDisplay
