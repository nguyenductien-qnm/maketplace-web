import Box from '@mui/material/Box'
import Skeleton from '@mui/material/Skeleton'

function VendorSettingSkeleton() {
  return (
    <Box>
      <Skeleton
        variant="rectangular"
        sx={{ width: '100%', height: '536px', mb: 3, borderRadius: 1 }}
      />

      <Skeleton
        variant="rectangular"
        sx={{ width: '100%', height: '297px', mb: 3, borderRadius: 1 }}
      />

      <Skeleton
        variant="rectangular"
        sx={{ width: '100%', height: '285px', borderRadius: 1 }}
      />
    </Box>
  )
}
export default VendorSettingSkeleton
