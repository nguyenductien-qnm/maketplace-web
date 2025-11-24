import UserLayout from '~/layouts/user/UserLayout'
import Grid2 from '@mui/material/Grid2'
import CartTable from '~/components/customer/CustomerCart/CartTable/CartTable'
import CartSummary from '~/components/customer/CustomerCart/CartSummary'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import NotificationDialog from '~/components/common/NotificationDialog'
import CircularIndeterminate from '~/components/common/CircularIndeterminate'
import { useCustomerCart } from '~/hooks/user/cart.hook'
import TypographyTitle from '~/components/common/TypographyTitle'

function CustomerCart() {
  const { ui, data, handler } = useCustomerCart()
  const { loading, selectedProducts } = ui
  const { handleCheckOut } = handler
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
          <Grid2 size={selectedProducts.length > 0 ? 9 : 12}>
            <CartTable ui={ui} data={data} handler={handler} />

            {/* {selectedProducts.length > 0 && (
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
            )} */}
          </Grid2>
          <Grid2 size={selectedProducts.length > 0 ? 3 : 0}>
            <CartSummary
              selectedProducts={selectedProducts}
              handleCheckOut={handleCheckOut}
            />
          </Grid2>
        </Grid2>
      )}

      {/* <NotificationDialog
        header={modalContent.header}
        content={modalContent.content}
        open={openModal}
        onClose={handleCloseModal}
      /> */}
    </UserLayout>
  )
}
export default CustomerCart
