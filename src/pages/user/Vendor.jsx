import Grid from '@mui/material/Grid2'
import { useParams } from 'react-router-dom'
import VendorProduct from '~/components/user/Vendor/Product/VendorProduct'
import VendorSideBar from '~/components/user/Vendor/VendorSidebar'
import UserLayout from '~/layouts/user/UserLayout'
import VendorCreateProduct from '~/components/user/Vendor/Product/CreateAndUpdateProduct/VendorCreateAndUpdateProduct'
import VendorOrder from '~/components/user/Vendor/Orders/VendorOrder'
import VendorProfile from '~/components/user/Vendor/Profile/VendorProfile'
import VendorVoucher from '~/components/user/Vendor/VendorVoucher/VendorVoucher'
function Vendor() {
  const { page } = useParams()
  const { _id } = useParams()
  return (
    <UserLayout>
      <Grid container spacing={4}>
        <Grid size={2}>
          <VendorSideBar page={page} />
        </Grid>
        <Grid size={10}>
          {page === 'products' && <VendorProduct />}
          {page === 'create-product' && <VendorCreateProduct />}
          {page === 'update-product' && _id && <VendorCreateProduct />}
          {page === 'orders' && <VendorOrder />}
          {page === 'order-detail' && <VendorOrder />}
          {page === 'order-detail' && <VendorOrder />}
          {page === 'profile' && <VendorProfile />}
          {page === 'vouchers' && <VendorVoucher />}
        </Grid>
      </Grid>
    </UserLayout>
  )
}
export default Vendor
