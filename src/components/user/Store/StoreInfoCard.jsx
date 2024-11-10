import { Box, Typography } from '@mui/material'

function StoreInfoCard() {
  return (
    <Box
      sx={{
        backgroundColor: '#1f2937',
        borderRadius: '10px 0 0 10px',
        width: '100%',
        height: '100%',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '10px'
      }}
    >
      <img
        style={{
          height: '100px',
          objectFit: 'cover',
          borderRadius: '9999px',
          marginBottom: '20px'
        }}
        src="https://klbtheme.com/bevesi/wp-content/uploads/2024/05/cropped-style-3.png"
      />
      <Typography sx={{ fontSize: '25px', color: 'white', fontWeight: '600' }}>
        Djewno
      </Typography>
      <Typography
        sx={{ color: 'white', marginBottom: '20px', textAlign: 'center' }}
      >
        602nd Pasadena Bulevard, 204th Saints Bulevard Los Santos, California,
        United States (US), American Samoa
      </Typography>
      <Typography sx={{ fontSize: '20px', fontWeight: '600', color: 'white' }}>
        0987654321
      </Typography>
    </Box>
  )
}
export default StoreInfoCard
