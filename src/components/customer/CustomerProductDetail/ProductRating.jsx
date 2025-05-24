import { Box, Skeleton, Typography } from '@mui/material'
import { grey, yellow } from '@mui/material/colors'
import StarIcon from '@mui/icons-material/Star'
function ProductRating({ productRating }) {
  console.log('productRating', productRating)
  return (
    <Box>
      {productRating !== 'undefined' ? (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'center', marginY: 1 }}>
            {Array.from({ length: Math.round(productRating) }).map(
              (_, index) => (
                <StarIcon
                  sx={{ color: yellow[700], fontSize: '15px' }}
                  key={index}
                />
              )
            )}
          </Box>
          <Typography sx={{ color: grey[400], fontSize: '12px' }}>
            {productRating == 0 ? 'No rating' : productRating}
          </Typography>
        </Box>
      ) : (
        <Skeleton variant="text" sx={{ width: '100px' }} />
      )}
    </Box>
  )
}

export default ProductRating
