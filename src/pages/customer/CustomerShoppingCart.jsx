import UserLayout from '~/layouts/user/UserLayout'
import Grid from '@mui/material/Grid2'
import CartTable from '~/components/customer/CustomerShoppingCart/CartTable/CartTable'
import CartSummary from '~/components/customer/CustomerShoppingCart/CartSummary'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import NotificationModal from '~/components/common/NotificationModal'
import CircularIndeterminate from '~/components/common/CircularIndeterminate'
import { useShoppingCart } from '~/hooks/user/cart.hook'

function CustomerShoppingCart() {
  const {
    loading,
    products,
    selectedProducts,
    modalContent,
    openModal,
    handleClearCartAPI,
    handleSelectedProduct,
    handleCheckOut,
    removeProduct,
    setQuantitySelected,
    handleCloseModal
  } = useShoppingCart()

  return (
    <UserLayout>
      {loading && (
        <Box
          sx={{
            height: '80vh',
            display: 'flex',
            justifyContent: 'center',
            marginTop: '100px'
          }}
        >
          <CircularIndeterminate />
        </Box>
      )}

      {!loading && (
        <Grid container spacing={2}>
          <Grid size={selectedProducts.length > 0 ? 9 : 12}>
            <CartTable
              products={products}
              removeProduct={removeProduct}
              setQuantitySelected={setQuantitySelected}
              handleSelectedProduct={handleSelectedProduct}
            />
            <Box sx={{ textAlign: 'end' }}>
              <Button
                className="btn-user-clear-cart"
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
      )}

      <NotificationModal
        header={modalContent.header}
        content={modalContent.content}
        open={openModal}
        onClose={handleCloseModal}
      />
    </UserLayout>
  )
}
export default CustomerShoppingCart
