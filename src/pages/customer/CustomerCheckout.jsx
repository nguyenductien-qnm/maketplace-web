import UserLayout from '~/layouts/user/UserLayout'
import ShippingAddress from '~/components/customer/CustomerCheckout/ShippingAddress'
import CheckoutItem from '~/components/customer/CustomerCheckout/CheckoutItem'
import PaymentOverview from '~/components/customer/CustomerCheckout/PaymentOverview'
import PaymentMethods from '~/components/customer/CustomerCheckout/PaymentMethods'
import VoucherOverview from '~/components/customer/CustomerCheckout/VoucherOverview'
import NotificationModal from '~/components/common/NotificationModal'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import { grey } from '@mui/material/colors'
import { useCheckout } from '~/hooks/checkout.hook'

function CustomerCheckOut() {
  const {
    addresses,
    addressSelected,
    handleAddAddress,
    setAddressSelected,
    products,
    shopVouchers,
    bevesiVouchers,
    handleSelectedVouchers,
    paymentMethods,
    paymentMethodSelected,
    setPaymentMethodSelected,
    handlePlaceOrder,
    modalContent,
    openModal,
    handleCloseModal,
    decodedToken
  } = useCheckout()

  return (
    <UserLayout>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <ShippingAddress
          addresses={addresses}
          addressSelected={addressSelected}
          handleAddAddress={handleAddAddress}
          setAddressSelected={setAddressSelected}
        />
        <Table sx={{ marginTop: '15px' }}>
          <TableHead>
            <TableRow>
              <TableCell sx={{ width: '60%', fontSize: '20px' }}>
                Products Ordered
              </TableCell>
              <TableCell
                sx={{ width: '13.33%', textAlign: 'start', color: grey[600] }}
              >
                Unit Price
              </TableCell>
              <TableCell
                sx={{ width: '13.33%', textAlign: 'end', color: grey[600] }}
              >
                Amount
              </TableCell>
              <TableCell
                sx={{ width: '13.33%', textAlign: 'end', color: grey[600] }}
              >
                Item Subtotal
              </TableCell>
            </TableRow>
          </TableHead>
        </Table>

        {products?.map((p) => {
          const shopVoucher = shopVouchers?.find(
            (v) => v.shopId === p.product_shop
          )
          return (
            <CheckoutItem
              key={p.product_shop}
              products={p}
              vouchers={shopVoucher?.vouchers}
              handleSelectedVouchers={handleSelectedVouchers}
            />
          )
        })}
        <PaymentMethods
          paymentMethods={paymentMethods}
          paymentMethodSelected={paymentMethodSelected}
          setPaymentMethodSelected={setPaymentMethodSelected}
        />
        <Paper>
          <VoucherOverview
            content={'Bevesi Voucher'}
            vouchers={bevesiVouchers}
            handleSelectedVouchers={handleSelectedVouchers}
          />
        </Paper>
        <PaymentOverview
          handlePlaceOrder={handlePlaceOrder}
          price={decodedToken?.price}
          paymentMethodSelected={paymentMethodSelected}
        />
      </Box>
      <NotificationModal
        header={modalContent.header}
        content={modalContent.content}
        open={openModal}
        onClose={handleCloseModal}
      />
    </UserLayout>
  )
}

export default CustomerCheckOut
