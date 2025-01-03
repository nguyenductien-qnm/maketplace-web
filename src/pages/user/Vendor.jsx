import Grid from '@mui/material/Grid2'
import { useParams } from 'react-router-dom'
import VendorProduct from '~/components/user/Vendor/Product/VendorProduct'
import VendorSideBar from '~/components/user/Vendor/VendorSidebar'
import UserLayout from '~/layouts/user/UserLayout'
import VendorCreateProduct from '~/components/user/Vendor/Product/CreateAndUpdateProduct/VendorCreateAndUpdateProduct'
import { useSelector } from 'react-redux'
function Vendor() {
  const { page } = useParams()
  const { _id } = useParams()
  const user = useSelector((state) => state.user.currentUser)
  return (
    <UserLayout>
      <Grid container spacing={4}>
        <Grid size={2}>
          <VendorSideBar page={page} />
        </Grid>
        <Grid size={10}>
          {page === 'products' && <VendorProduct shopId={user.shop_id} />}
          {page === 'create-product' && (
            <VendorCreateProduct shopId={user.shop_id} />
          )}
          {page === 'update-product' && _id && (
            <VendorCreateProduct shopId={user.shop_id} />
          )}
        </Grid>
      </Grid>
    </UserLayout>
  )
}
export default Vendor
