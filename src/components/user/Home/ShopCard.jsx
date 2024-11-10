import { Box, Typography } from '@mui/material'
import StarIcon from '@mui/icons-material/Star'
import { grey, yellow } from '@mui/material/colors'
import LaunchIcon from '@mui/icons-material/Launch'

function ShopCard() {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '20px',
        backgroundColor: grey[100],
        padding: '10px 40px',
        borderRadius: '10px'
      }}
    >
      <img
        style={{
          height: '60px',
          borderRadius: '999px'
        }}
        src="https://klbtheme.com/bevesi/wp-content/uploads/2024/05/cropped-style-5.png"
      />
      <Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Typography sx={{ fontSize: '18px', fontWeight: '600' }}>
            Blonwe
          </Typography>
          <LaunchIcon
            sx={{
              fontSize: '14px',
              backgroundColor: 'white',
              padding: '3px',
              borderRadius: '2px'
            }}
          />
        </Box>

        <Typography sx={{ fontSize: '14px', color: grey[600] }}>
          Browse around. maybe pick up something for yourself or someone else.
        </Typography>
        <Box sx={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', justifyContent: 'center', marginY: 1 }}>
            {[...Array(5)].map((_, index) => (
              <StarIcon
                sx={{ color: yellow[700], fontSize: '15px' }}
                key={index}
              />
            ))}
          </Box>
          <Typography
            sx={{ fontWeight: '700', fontSize: '12px', color: grey[400] }}
          >
            5
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}
export default ShopCard
