import Box from '@mui/material/Box'
import Grid2 from '@mui/material/Grid2'
import Skeleton from '@mui/material/Skeleton'

const CardSkeleton = () => (
  <Skeleton
    variant="rectangular"
    sx={{ width: '100%', height: '165px', borderRadius: 2 }}
  />
)

function VendorMetricsSkeleton() {
  return (
    <Box>
      <Skeleton
        variant="rectangular"
        sx={{ width: 200, height: '28px', mb: 2, borderRadius: 2 }}
      />

      <Grid2 container spacing={2}>
        {Array.from({ length: 13 }).map((_, index) => (
          <Grid2 key={index} size={4}>
            <CardSkeleton />
          </Grid2>
        ))}
      </Grid2>
    </Box>
  )
}

export default VendorMetricsSkeleton
