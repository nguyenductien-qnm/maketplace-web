import { Box, Divider, Grid2, Skeleton } from '@mui/material'

function ProductDetailSkeleton() {
  return (
    <Grid2 container spacing={3} sx={{ marginTop: '15px' }}>
      <Grid2 size={12}>
        <Skeleton variant="rounded" sx={{ width: '45%' }} />
      </Grid2>

      <Grid2 size={6} sx={{ height: '635px' }}>
        <Box sx={{ position: 'relative' }}>
          <Skeleton
            variant="rounded"
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              height: '555px',
              width: '100%'
            }}
          />

          <Skeleton
            variant="rounded"
            sx={{
              position: 'absolute',
              top: 580,
              left: 170,
              height: '55px',
              width: '222px'
            }}
          />
        </Box>
      </Grid2>

      <Grid2 size={6}>
        <Grid2 container rowSpacing="15px">
          <Grid2 size={12}>
            <Skeleton variant="rounded" sx={{ height: '90px' }} />
          </Grid2>

          <Grid2 size={12}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Skeleton variant="rounded" sx={{ width: '370px' }} />
              <Skeleton variant="rounded" sx={{ width: '50px' }} />
            </Box>
          </Grid2>

          <Grid2 size={12}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'end',
                justifyContent: 'space-between',
                marginTop: '10px'
              }}
            >
              <Skeleton
                variant="rounded"
                sx={{ width: '250px', height: '30px' }}
              />
              <Skeleton
                variant="rounded"
                sx={{ width: '113px', height: '20px' }}
              />
            </Box>
          </Grid2>

          <Grid2 size={12}>
            <Divider sx={{ marginTop: '10px', mb: '10px' }} />
          </Grid2>

          <Grid2 size={12}>
            <Skeleton variant="rounded" sx={{ height: '140px' }} />
          </Grid2>

          <Grid2 size={12}>
            <Grid2 container spacing={1} sx={{ marginTop: '30px' }}>
              <Grid2 size={2}>
                <Skeleton variant="rounded" sx={{ height: '50px' }} />
              </Grid2>
              <Grid2 size={5}>
                <Skeleton variant="rounded" sx={{ height: '50px' }} />
              </Grid2>
              <Grid2 size={5}>
                <Skeleton variant="rounded" sx={{ height: '50px' }} />
              </Grid2>
            </Grid2>
          </Grid2>

          <Grid2 size={12} sx={{ marginTop: '30px' }}>
            <Skeleton variant="rounded" sx={{ width: '260px', mb: '10px' }} />
            <Skeleton variant="rounded" sx={{ width: '227px', mb: '10px' }} />
            <Skeleton variant="rounded" sx={{ width: '173px', mb: '10px' }} />
          </Grid2>
          <Grid2 size={12} sx={{ marginTop: '20px' }}>
            <Skeleton variant="rounded" sx={{ width: '135px', mb: '10px' }} />
            <Skeleton
              variant="rounded"
              sx={{ width: '158px', height: '35px' }}
            />
          </Grid2>
        </Grid2>
      </Grid2>

      <Grid2 size={12} sx={{ mt: 5 }}>
        <Skeleton variant="rounded" sx={{ height: '120px' }} />
      </Grid2>

      <Grid2 size={12} sx={{ mt: 5 }}>
        <Skeleton variant="rounded" sx={{ width: '226px', height: '30px' }} />

        <Skeleton variant="rounded" sx={{ height: '300px', mt: 5 }} />
      </Grid2>

      <Grid2 size={12} sx={{ mt: 5 }}>
        <Skeleton variant="rounded" sx={{ height: '500px' }} />
      </Grid2>
    </Grid2>
  )
}
export default ProductDetailSkeleton
