import { Box, Skeleton } from '@mui/material'

function SkeletonLoaderInput() {
  return (
    <Box>
      <Skeleton variant="text" width="20%" />
      <Skeleton variant="rounded" height={40} />
    </Box>
  )
}

export default SkeletonLoaderInput
