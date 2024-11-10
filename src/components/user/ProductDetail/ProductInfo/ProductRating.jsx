import { Box, Typography } from '@mui/material'
import { grey, yellow } from '@mui/material/colors'
import StarIcon from '@mui/icons-material/Star'
function ProductRating() {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        marginTop: '10px'
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'center', marginY: 1 }}>
        {[...Array(5)].map((_, index) => (
          <StarIcon sx={{ color: yellow[700], fontSize: '15px' }} key={index} />
        ))}
      </Box>
      <Typography sx={{ color: grey[400], fontSize: '12px' }}>5.0</Typography>
    </Box>
  )
}

export default ProductRating
