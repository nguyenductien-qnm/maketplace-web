import { Navigate, Route } from 'react-router-dom'
import CustomerProductDetails from '~/pages/customer/CustomerProductDetails'
import CustomerShop from '~/pages/customer/CustomerShop'
import Home from '~/pages/customer/Home'

const PublicRoutes = () => {
  return (
    <Route>
      <Route path="/" element={<Navigate to="/home" replace />} />
      <Route path="/home" element={<Home />} />
      <Route path="/shop/:shop_slug" element={<CustomerShop />} />
      <Route
        path="/product/:product_slug"
        element={<CustomerProductDetails />}
      />
    </Route>
  )
}
export default PublicRoutes
