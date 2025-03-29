import Grid from '@mui/material/Grid2'
import { useParams } from 'react-router-dom'
import VendorProduct from '~/components/vendor/Product/Display/VendorProduct'
import VendorSideBar from '~/components/vendor/VendorSidebar'
import UserLayout from '~/layouts/user/UserLayout'
import VendorOrder from '~/components/vendor/Order/VendorOrder'
import VendorProfile from '~/components/vendor/Profile/VendorProfile'
import VendorVoucher from '~/components/vendor/Voucher/VendorVoucher'
import ProductForm from '~/components/vendor/Product/Form/ProductForm'
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
          {page === 'create-product' && <ProductForm />}
          {page === 'update-product' && _id && <ProductForm />}
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
