import UserLayout from '~/layouts/user/UserLayout'
import Grid2 from '@mui/material/Grid2'
import CartTable from '~/components/customer/CustomerCart/CartTable/CartTable'
import CartSummary from '~/components/customer/CustomerCart/CartSummary'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import NotificationDialog from '~/components/common/NotificationDialog'
import CircularIndeterminate from '~/components/common/CircularIndeterminate'
import CartProductInActiveTable from '~/components/customer/CustomerCart/CartProductInActiveTable'
import { useCustomerCart } from '~/hooks/user/cart.hook'
import TypographyTitle from '~/components/common/TypographyTitle'
import { blue } from '@mui/material/colors'

function CustomerCart() {
  const { ui, data, handler } = useCustomerCart()
  const { loading, selectedProducts, modalContent, openModal } = ui
  const { handleCheckOut, handleCloseModal } = handler

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
        <Grid2 container spacing={2}>
          <Grid2 size={12}>
            <TypographyTitle>Shopping Cart</TypographyTitle>
          </Grid2>

          <Grid2 size={12}>
            <Grid2 container spacing={2}>
              <Grid2 size={selectedProducts.length > 0 ? 9 : 12}>
                <CartTable ui={ui} data={data} handler={handler} />
              </Grid2>

              {selectedProducts.length > 0 && (
                <Grid2 size={3}>
                  <CartSummary
                    selectedProducts={selectedProducts}
                    handleCheckOut={handleCheckOut}
                  />
                  {selectedProducts.length > 0 && (
                    <Box>
                      <Button
                        className="btn-user-checkout"
                        onClick={() => handleCheckOut()}
                        sx={{
                          marginTop: '20px',
                          minWidth: '100%',
                          backgroundColor: blue[600],
                          fontSize: '14px',
                          textTransform: 'none',
                          fontWeight: '600',
                          color: 'white',
                          mb: 2
                        }}
                      >
                        Proceed to checkout
                      </Button>
                      <Button
                        color="error"
                        variant="contained"
                        fullWidth
                        className="btn-user-clear-cart"
                        onClick={() => handleClearCartAPI()}
                      >
                        Delete
                      </Button>
                    </Box>
                  )}
                </Grid2>
              )}
            </Grid2>
          </Grid2>

          <Grid2 size={12} sx={{ mt: 10 }}>
            <CartProductInActiveTable ui={ui} data={data} handler={handler} />
          </Grid2>
        </Grid2>
      )}

      <NotificationDialog
        header={modalContent.header}
        content={modalContent.content}
        open={openModal}
        onClose={handleCloseModal}
      />
    </UserLayout>
  )
}
export default CustomerCart
