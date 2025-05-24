import { Box, Skeleton } from '@mui/material'
import Typography from '@mui/material/Typography'

function ProductName({ productName }) {
  return (
    <Box sx={{ marginTop: '10px' }}>
      {productName ? (
        <Typography sx={{ fontSize: '28px', fontWeight: '700' }}>
          {productName}
        </Typography>
      ) : (
        <Skeleton variant="text" sx={{ fontSize: '28px' }} />
      )}
    </Box>
  )
}
export default ProductName
