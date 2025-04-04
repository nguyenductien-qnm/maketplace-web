import { Box, Skeleton } from '@mui/material'

function VendorWalletSkeleton() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
      <Skeleton variant="rounded" height={190} />
      <Skeleton variant="rounded" height={300} />
      <Skeleton variant="rounded" height={190} />
    </Box>
  )
}
export default VendorWalletSkeleton
