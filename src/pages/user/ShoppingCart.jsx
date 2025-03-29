import UserLayout from '~/layouts/user/UserLayout'
import Grid from '@mui/material/Grid2'
import ShippingBanner from '~/components/user/ShippingCart/ShippingBanner'
import CartTable from '~/components/user/ShippingCart/CartTable/CartTable'
import CartSummary from '~/components/user/ShippingCart/CartSummary'
import { Box, Button } from '@mui/material'
import { useEffect, useState } from 'react'
import {
  checkoutAPI,
  clearCartAPI,
  getCartProductsAPI,
  removeProductAPI,
  updateQuantityProductCartAPI
} from '~/api/cart.api'
import NotificationModal from '~/components/common/NotificationModal'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
function ShoppingCart() {
  const navigate = useNavigate()
  const [products, setProducts] = useState()
  const [openModal, setOpenModal] = useState(false)
  const [modalContent, setModalContent] = useState({ header: '', content: '' })
  const [selectedProducts, setSelectedProducts] = useState([])

  useEffect(() => {
    const getData = async () => {
      const productsData = await getCartProductsAPI()
      setProducts(productsData.data.metadata)
    }
    getData()
  }, [])

  const handleSelectedProduct = (product) => {
    setSelectedProducts((prevSelectedProducts) => {
      const prevSelectedProductIds = prevSelectedProducts?.map(
        (p) => p.product_id
      )
      const isSelected = prevSelectedProductIds.includes(product.product_id)
      if (isSelected) {
        return prevSelectedProducts.filter(
          (p) => p.product_id !== product.product_id
        )
      } else {
        return [...prevSelectedProducts, product]
      }
    })
  }

  const handleClearCartAPI = async () => {
    if (selectedProducts.length === 0) {
      toast.warn('Please select product(s)!')
    } else {
      const res = await clearCartAPI(selectedProducts)
      if (res.status === 200) {
        const selectedProductIds = selectedProducts.map((p) => p.product_id)
        setProducts((prevProducts) =>
          prevProducts.filter(
            (product) => !selectedProductIds.includes(product.product_id)
          )
        )
        setSelectedProducts([])
      }
    }
  }

  const removeProduct = async (product) => {
    const res = await removeProductAPI({ _id: product.product_id })
    if (res.status === 200)
      setProducts((prevProducts) =>
        prevProducts.filter((p) => p.product_id !== product.product_id)
      )
  }

  const handleOpenModal = (header, content) => {
    setModalContent({ header, content })
    setOpenModal(true)
  }

  const handleCloseModal = () => setOpenModal(false)

  const setQuantitySelected = async (product, newQuantity) => {
    const oldQuantity = product.quantity
    setProducts((prevProducts) =>
      prevProducts.map((p) => {
        if (p.product_id === product.product_id) {
          return { ...p, quantity: newQuantity }
        }
        return p
      })
    )

    const res = await updateQuantityProductCartAPI(product, newQuantity)

    if (res.status !== 200) {
      handleOpenModal('Notification', res.message)
      setProducts((prevProducts) =>
        prevProducts.map((p) => {
          if (p.product_id === product.product_id) {
            return { ...p, quantity: oldQuantity }
          }
          return p
        })
      )
    }
  }

  const handleCheckOut = async () => {
    const data = { products: selectedProducts }
    const res = await checkoutAPI(data)
    if (res.status == 200) {
      navigate(res.data?.metadata?.checkoutUrl)
    } else {
      handleOpenModal('Notification', res.message)
      const productNeedUpdate = res?.metadata?.updatedProduct
      setProducts((prevProducts) =>
        prevProducts.map((p) => {
          const updatedProduct = productNeedUpdate.find(
            (upd) => upd.product_id === p.product_id
          )
          return updatedProduct ? updatedProduct : p
        })
      )
    }
  }

  useEffect(() => {
    if (selectedProducts.length > 0) {
      const updatedProducts = selectedProducts.map((selectedItem) => {
        const latestProduct = products.find(
          (p) => p.product_id === selectedItem.product_id
        )
        return latestProduct &&
          JSON.stringify(latestProduct) !== JSON.stringify(selectedItem)
          ? latestProduct
          : selectedItem
      })

      if (
        JSON.stringify(updatedProducts) !== JSON.stringify(selectedProducts)
      ) {
        setSelectedProducts(updatedProducts)
      }
    }
  }, [products])

  return (
    <UserLayout>
      <Grid container spacing={2}>
        <Grid size={selectedProducts.length > 0 ? 9 : 12}>
          <ShippingBanner />
          <CartTable
            products={products}
            removeProduct={removeProduct}
            setQuantitySelected={setQuantitySelected}
            handleSelectedProduct={handleSelectedProduct}
          />
          <Box sx={{ textAlign: 'end' }}>
            <Button
              onClick={() => handleClearCartAPI()}
              sx={{
                marginTop: '20px',
                textTransform: 'none',
                fontSize: '14px',
                fontWeight: '600',
                padding: '10px 40px',
                backgroundColor: 'black',
                color: 'white'
              }}
            >
              Clear
            </Button>
          </Box>
        </Grid>
        <Grid size={selectedProducts.length > 0 ? 3 : 0}>
          <CartSummary
            handleCheckOut={handleCheckOut}
            selectedProducts={selectedProducts}
          />
        </Grid>
      </Grid>
      <NotificationModal
        header={modalContent.header}
        content={modalContent.content}
        open={openModal}
        onClose={handleCloseModal}
      />
    </UserLayout>
  )
}
export default ShoppingCart
