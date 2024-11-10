import Grid from '@mui/material/Grid2'
import { useParams } from 'react-router-dom'
import VendorProduct from '~/components/user/Vendor/Product/VendorProduct'
import VendorSideBar from '~/components/user/Vendor/VendorSidebar'
import UserLayout from '~/layouts/user/UserLayout'
import VendorCreateProduct from '~/components/user/Vendor/Product/CreateProduct/VendorCreateProduct'
function Vendor() {
  const { page } = useParams()
  return (
    <UserLayout>
      <Grid container spacing={4}>
        <Grid item size={3}>
          <VendorSideBar page={page} />
        </Grid>
        <Grid item size={9}>
          {page === 'products' && <VendorProduct />}
          {page === 'create-product' && <VendorCreateProduct />}
        </Grid>
      </Grid>
      s
    </UserLayout>
  )
}
export default Vendor
