import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'
import Skeleton from '@mui/material/Skeleton'
import SkeletonLoaderInput from '~/components/common/SkeletonLoaderInput'

function CustomerProfileSkeleton() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
      <Box
        sx={{
          display: 'flex',
          gap: '20px',
          alignItems: 'center',
          marginBottom: '20px'
        }}
      >
        <Avatar sx={{ height: '80px', width: '80px' }} />
        <Skeleton sx={{ width: '120px' }} variant="rounded" height={40} />
      </Box>
      <SkeletonLoaderInput />
      <SkeletonLoaderInput />
      <SkeletonLoaderInput />
      <SkeletonLoaderInput />
      <SkeletonLoaderInput />
      <SkeletonLoaderInput height={100} />
      <SkeletonLoaderInput />
      <SkeletonLoaderInput />
      <Skeleton sx={{ width: '100px' }} variant="rounded" height={40} />
    </Box>
  )
}
export default CustomerProfileSkeleton
