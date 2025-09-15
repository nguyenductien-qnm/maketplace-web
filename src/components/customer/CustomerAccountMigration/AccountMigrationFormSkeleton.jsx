import { Box, Grid2, Skeleton } from '@mui/material'
import SkeletonLoaderInput from '~/components/common/SkeletonLoaderInput'

function AccountMigrationFormSkeleton() {
  return (
    <Box
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'start',
        gap: '15px',
        marginTop: '30px'
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
      <SkeletonLoaderInput />
      <SkeletonLoaderInput />
      <SkeletonLoaderInput />

      <Skeleton variant="rounded" height={46} width={150} />
    </Box>
  )
}
export default AccountMigrationFormSkeleton
