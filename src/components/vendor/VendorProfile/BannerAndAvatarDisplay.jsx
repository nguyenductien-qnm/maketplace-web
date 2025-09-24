import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'

function BannerAndAvatarDisplay({ shopBanner, shopAvatar }) {
  const defaultBanner =
    'https://i.pinimg.com/736x/58/c3/33/58c33377dfcbb3022493dec49d098b02.jpg'

  return (
    <Box sx={{ position: 'relative' }}>
      <img
        style={{
          width: '100%',
          height: '200px',
          objectFit: 'cover',
          borderRadius: '5px'
        }}
        src={
          shopBanner
            ? shopBanner instanceof File
              ? URL.createObjectURL(shopBanner)
              : shopBanner
            : defaultBanner
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
        src={
          shopAvatar
            ? shopAvatar instanceof File
              ? URL.createObjectURL(shopAvatar)
              : shopAvatar
            : undefined
        }
      ></Avatar>
    </Box>
  )
}

export default BannerAndAvatarDisplay
