import { Box, Skeleton } from '@mui/material'

function SkeletonLoaderInput({ height = 40 }) {
  return (
    <Box>
      <Skeleton variant="text" width="20%" />
      <Skeleton variant="rounded" height={height} />
    </Box>
  )
}

export default SkeletonLoaderInput
