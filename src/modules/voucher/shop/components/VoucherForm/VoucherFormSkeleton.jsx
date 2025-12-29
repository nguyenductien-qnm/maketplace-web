import Box from '@mui/material/Box'
import Skeleton from '@mui/material/Skeleton'

function VoucherFormSkeleton() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
      <Skeleton variant="rounded" height={484} />
      <Skeleton variant="rounded" height={438} />
      <Skeleton variant="rounded" height={332} />
      <Skeleton variant="rounded" height={37} />
    </Box>
  )
}

export default VoucherFormSkeleton
