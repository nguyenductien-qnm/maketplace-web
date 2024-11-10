import { Box } from '@mui/material'
import Grid from '@mui/material/Grid2'
import StoreInfoCard from './StoreInfoCard'
import ActionButton from './ActionButton'
import StoreMetricsCard from './StoreMetricsCard'
import defautStoreBanner from '~/assets/user/img/defaultStoreBanner.png'
import { grey } from '@mui/material/colors'

function StoreOverviewCard() {
  return (
    <Box
      sx={{
        height: '410px',
        backgroundImage: `url(${defautStoreBanner})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        border: '1px solid',
        borderColor: grey[300],
        borderRadius: '10px'
      }}
    >
      <Grid container sx={{ minHeight: '100%' }}>
        <Grid item size={3}>
          <StoreInfoCard />
        </Grid>
        <Grid item size={9} direction="column">
          <StoreMetricsCard />
          <ActionButton />
        </Grid>
      </Grid>
    </Box>
  )
}
export default StoreOverviewCard
