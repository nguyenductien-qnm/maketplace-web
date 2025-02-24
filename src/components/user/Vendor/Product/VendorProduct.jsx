import { useState } from 'react'
import TabProduct from './TabProduct/TabProduct'
import { queryProductByOwnerAPI } from '~/api/productSPU.api'

function VendorProduct() {
  const [listProduct, setListProduct] = useState([])

  const getProducts = async (data) => {
    const res = await queryProductByOwnerAPI(data)
    setListProduct(res?.data?.metadata || [])
  }

  return <TabProduct getProducts={getProducts} listProduct={listProduct} />
}
export default VendorProduct
