import { Box, Grid2, Skeleton } from '@mui/material'
import SkeletonLoaderInput from '~/components/common/SkeletonLoaderInput'

function VendorProfileSkeleton() {
  return (
    <Box>
      <Skeleton variant="rounded" height={200} />
      <Box sx={{ display: 'flex', gap: '10px', mt: '10px' }}>
        <Skeleton variant="rounded" height={40} width={155} />
        <Skeleton variant="rounded" height={40} width={155} />
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '15px',
          mt: '20px'
        }}
      >
        <Grid2 container spacing={2}>
          <Grid2 size={4}>
            <SkeletonLoaderInput />
          </Grid2>
          <Grid2 size={4}>
            <SkeletonLoaderInput />
          </Grid2>
          <Grid2 size={4}>
            <SkeletonLoaderInput />
          </Grid2>
        </Grid2>
        <SkeletonLoaderInput />
        <Grid2 container spacing={2}>
          <Grid2 size={3}>
            <SkeletonLoaderInput />
          </Grid2>
          <Grid2 size={3}>
            <SkeletonLoaderInput />
          </Grid2>
          <Grid2 size={3}>
            <SkeletonLoaderInput />
          </Grid2>
          <Grid2 size={3}>
            <SkeletonLoaderInput />
          </Grid2>
        </Grid2>
        <Box>
          <Skeleton variant="text" width="20%" />
          <Skeleton variant="rounded" height={150} />
        </Box>
        <Skeleton variant="rounded" height={40} width={90} />
      </Box>
    </Box>
  )
}
export default VendorProfileSkeleton
