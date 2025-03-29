import UserLayout from '~/layouts/user/UserLayout'
import Grid from '@mui/material/Grid2'
import StoreOverviewCard from '~/components/user/Store/StoreOverviewCard'
import SearchBar from '~/components/user/Store/SearchBar'
import SortDropdown from '~/components/user/Store/SortDropdown '
import { Box, Divider } from '@mui/material'
import StoreProductCategory from '~/components/user/Store/StoreProductCategory'
import Product from '~/components/common/Product'
function Store() {
  return (
    <UserLayout>
      <StoreOverviewCard />
      <Grid container>
        <Grid size={3} sx={{ marginTop: '10px' }}>
          <StoreProductCategory />
        </Grid>
        <Grid size={9}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '10px',
              marginTop: '10px'
            }}
          >
            <SearchBar />
            <SortDropdown />
          </Box>
          <Divider />
          <Grid container spacing={2} sx={{ marginTop: '30px' }}>
            <Grid size={3}>
              <Product />
            </Grid>
            <Grid size={3}>
              <Product />
            </Grid>
            <Grid size={3}>
              <Product />
            </Grid>
            <Grid size={3}>
              <Product />
            </Grid>
            <Grid size={3}>
              <Product />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </UserLayout>
  )
}
export default Store
