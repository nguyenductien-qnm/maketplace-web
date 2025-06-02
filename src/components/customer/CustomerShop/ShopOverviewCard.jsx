import { Box } from '@mui/material'
import Grid from '@mui/material/Grid2'
import ShopInfoCard from './ShopInfoCard'
import ActionButton from './ActionButton'
import ShopMetricsCard from './ShopMetricsCard'
import defautStoreBanner from '~/assets/user/img/defaultStoreBanner.png'
import { grey } from '@mui/material/colors'

function ShopOverviewCard({
  shop,
  handleFollowShop,
  handleUnfollowShop,
  handleToggleFollowNotification,
  followInfo
}) {
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
        <Grid size={3}>
          <ShopInfoCard
            shop={{
              shop_name: shop?.shop_name,
              shop_address: shop?.shop_address,
              shop_phone: shop?.shop_phone,
              shop_avatar: shop?.shop_avatar
            }}
          />
        </Grid>
        <Grid size={9}>
          <ShopMetricsCard
            shop={{
              shop_product_count: shop?.shop_product_count,
              shop_follower_count: shop?.shop_follower_count,
              shop_rating: shop?.shop_rating,
              shop_joined_at: shop?.createdAt
            }}
          />
          <ActionButton
            shop={{
              shop_email: shop?.shop_email,
              shop_phone: shop?.shop_phone
            }}
            handleFollowShop={handleFollowShop}
            handleUnfollowShop={handleUnfollowShop}
            handleToggleFollowNotification={handleToggleFollowNotification}
            followInfo={followInfo}
          />
        </Grid>
      </Grid>
    </Box>
  )
}
export default ShopOverviewCard
