import { Box, Typography } from '@mui/material'

function ShopInfoCard({ shop }) {
  const { province, district, ward, street } = shop?.shop_address || {}
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
        src={
          shop?.shop_avatar ||
          'https://klbtheme.com/bevesi/wp-content/uploads/2024/05/cropped-style-3.png'
        }
      />
      <Typography sx={{ fontSize: '25px', color: 'white', fontWeight: '600' }}>
        {shop?.shop_name}
      </Typography>
      <Typography
        sx={{ color: 'white', marginBottom: '20px', textAlign: 'center' }}
      >
        {street}, {ward?.WardName}, {district?.DistrictName},{' '}
        {province?.ProvinceName}
      </Typography>
      <Typography sx={{ fontSize: '20px', fontWeight: '600', color: 'white' }}>
        {shop?.shop_phone}
      </Typography>
    </Box>
  )
}
export default ShopInfoCard
