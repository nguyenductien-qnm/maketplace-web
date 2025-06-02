import UserLayout from '~/layouts/user/UserLayout'
import Grid from '@mui/material/Grid2'
import Product from '~/components/common/Product'
import { Box, Divider } from '@mui/material'
import ShopOverviewCard from '~/components/customer/CustomerShop/ShopOverviewCard'
import ShopCategory from '~/components/customer/CustomerShop/ShopCategory'
import SearchBar from '~/components/customer/CustomerShop/SearchBar'
import SortDropdown from '~/components/customer/CustomerShop/SortDropdown'
import { useCustomerShop } from '~/hooks/user/shop.hook'
function CustomerShop() {
  const {
    shop,
    followInfo,
    handleFollowShop,
    handleUnfollowShop,
    handleToggleFollowNotification
  } = useCustomerShop()
  return (
    <UserLayout>
      <ShopOverviewCard
        shop={shop}
        handleFollowShop={handleFollowShop}
        handleUnfollowShop={handleUnfollowShop}
        handleToggleFollowNotification={handleToggleFollowNotification}
        followInfo={followInfo}
      />
      <Grid container>
        <Grid size={3} sx={{ marginTop: '10px' }}>
          <ShopCategory />
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
export default CustomerShop
