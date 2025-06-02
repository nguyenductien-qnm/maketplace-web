import Box from '@mui/material/Box'
import Grid2 from '@mui/material/Grid2'
import Skeleton from '@mui/material/Skeleton'
import SkeletonLoaderInput from '~/components/common/SkeletonLoaderInput'

function ProductFormSkeleton() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
      <Grid2 container spacing={2} rowSpacing={2}>
        <Grid2 container spacing={2} rowSpacing={2} size={9}>
          <Grid2 size={12}>
            <SkeletonLoaderInput />
          </Grid2>

          <Grid2 size={12}>
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
          </Grid2>

          <Grid2 size={12}>
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
          </Grid2>

          <Grid2 size={12}>
            <SkeletonLoaderInput />
          </Grid2>

          <Grid2 size={12}>
            <Skeleton variant="rounded" height={40} />
            <Skeleton variant="rounded" height={40} sx={{ mt: '10px' }} />
            <Skeleton variant="rounded" height={40} sx={{ mt: '10px' }} />
          </Grid2>

          <Grid2 size={12}>
            <SkeletonLoaderInput />
          </Grid2>

          <Grid2 size={12}>
            <Skeleton variant="rounded" height={200} />
          </Grid2>
        </Grid2>

        <Grid2
          container
          spacing={2}
          rowSpacing={2}
          size={3}
          sx={{ height: 'fit-content' }}
        >
          <Grid2 size={12}>
            <Skeleton variant="text" width="20%" />
            <Skeleton variant="rounded" height={200} width="100%" />
          </Grid2>

          <Grid2 size={12}>
            <Skeleton variant="text" width="20%" />
            <Skeleton variant="rounded" height={200} width="100%" />
          </Grid2>
        </Grid2>
      </Grid2>
    </Box>
  )
}

export default ProductFormSkeleton
