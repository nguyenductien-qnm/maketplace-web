import { useEffect, useState } from 'react'
import EmptyProduct from './EmptyProduct'
import TabProduct from './TabProduct/TabProduct'
import { getProductSPUAPI } from '~/api/productSPU.api'
import { Box } from '@mui/material'
import CircularIndeterminate from '~/components/CircularIndeterminate'
function VendorProduct({ shopId }) {
  const [listProduct, setListProduct] = useState([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const getAndSetProduct = async () => {
      const res = await getProductSPUAPI({ shop_id: shopId })
      setListProduct(res.data.metadata)
      setLoading(false)
    }
    getAndSetProduct()
  }, [])

  return (
    <Box
      sx={{
        display: loading ? 'flex' : 'block',
        justifyContent: 'center',
        marginTop: '50px'
      }}
    >
      {loading ? (
        <CircularIndeterminate />
      ) : listProduct.length === 0 ? (
        <EmptyProduct />
      ) : (
        <TabProduct listProduct={listProduct} />
      )}
    </Box>
  )
}
export default VendorProduct
