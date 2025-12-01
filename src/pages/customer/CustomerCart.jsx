import Grid2 from '@mui/material/Grid2'
import UserLayout from '~/layouts/user/UserLayout'
import CartTable from '~/components/customer/CustomerCart/CartTable/CartTable'
import CartSummary from '~/components/customer/CustomerCart/CartSummary'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import NotificationDialog from '~/components/common/NotificationDialog'
import CartProductInActiveTable from '~/components/customer/CustomerCart/CartProductInActiveTable'
import TypographyTitle from '~/components/common/TypographyTitle'
import { blue } from '@mui/material/colors'
import { useCustomerCart } from '~/hooks/user/cart.hook'

function CustomerCart() {
  const { ui, data, handler } = useCustomerCart()
  const {
    loading,
    selectedProducts,
    modalContent,
    openModal,
    page,
    count,
    LIMIT
  } = ui
  const { productInactive } = data
  const {
    handleCheckOut,
    handleCloseModal,
    handleLoadMore,
    handleRemoveManyProduct
  } = handler

  return (
    <UserLayout>
      <Grid2 container spacing={2}>
        <Grid2 size={12}>
          <TypographyTitle>Shopping Cart</TypographyTitle>
        </Grid2>

        <Grid2 size={12}>
          <Grid2 container spacing={2}>
            <Grid2 size={selectedProducts.length > 0 ? 9 : 12}>
              <CartTable ui={ui} data={data} handler={handler} />
              {page * LIMIT < count && (
                <Button
                  onClick={handleLoadMore}
                  fullWidth
                  variant="contained"
                  sx={{ height: '50px', mt: 3, fontSize: '16px' }}
                >
                  Load more
                </Button>
              )}
            </Grid2>

            {selectedProducts.length > 0 && (
              <Grid2 size={3}>
                <CartSummary selectedProducts={selectedProducts} />
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
                    onClick={() => handleRemoveManyProduct(selectedProducts)}
                  >
                    Delete
                  </Button>
                </Box>
              </Grid2>
            )}
          </Grid2>
        </Grid2>

        {productInactive?.length > 0 && (
          <Grid2 size={12} sx={{ mt: 10 }}>
            <CartProductInActiveTable ui={ui} data={data} handler={handler} />
          </Grid2>
        )}
      </Grid2>

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
