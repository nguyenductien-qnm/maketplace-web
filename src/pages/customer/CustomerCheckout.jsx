import UserLayout from '~/layouts/user/UserLayout'
import ShippingAddress from '~/components/customer/CustomerCheckout/ShippingAddress'
import CheckoutItem from '~/components/customer/CustomerCheckout/CheckoutItem'
import PaymentOverview from '~/components/customer/CustomerCheckout/PaymentOverview'
import PaymentMethods from '~/components/customer/CustomerCheckout/PaymentMethods'
import VoucherOverview from '~/components/customer/CustomerCheckout/VoucherOverview'
import NotificationDialog from '~/components/common/NotificationDialog'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import { grey } from '@mui/material/colors'
import { useCheckout } from '~/hooks/user/checkout.hook'
import TypographyTitle from '~/components/common/TypographyTitle'

function CustomerCheckOut() {
  const { ui, data, handler } = useCheckout()

  const { modalContent, openModal, paymentMethods } = ui

  const {
    decodedToken,
    products,
    addresses,
    addressSelected,
    ableShopVouchers,
    unableShopVouchers,
    platformVouchers
  } = data

  const {
    handleAddAddress,
    setAddressSelected,
    handleSelectedVouchers,
    handlePlaceOrder,
    handleCloseModal,
    handleChangePaymentMethod,
    handleChangeAddress
  } = handler

  return (
    <UserLayout>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <ShippingAddress
          addresses={addresses}
          addressSelected={addressSelected}
          handleAddAddress={handleAddAddress}
          setAddressSelected={setAddressSelected}
          handleChangeAddress={handleChangeAddress}
        />
        <Table sx={{ marginTop: '15px' }}>
          <TableHead>
            <TableRow>
              <TableCell sx={{ width: '60%', fontSize: '20px' }}>
                <TypographyTitle>Products Ordered</TypographyTitle>
              </TableCell>
              <TableCell
                sx={{
                  width: '13.33%',
                  textAlign: 'start',
                  color: grey[600],
                  fontSize: '16px'
                }}
              >
                Unit Price
              </TableCell>
              <TableCell
                sx={{
                  width: '13.33%',
                  textAlign: 'end',
                  color: grey[600],
                  fontSize: '16px'
                }}
              >
                Amount
              </TableCell>
              <TableCell
                sx={{
                  width: '13.33%',
                  textAlign: 'end',
                  color: grey[600],
                  fontSize: '16px'
                }}
              >
                Item Subtotal
              </TableCell>
            </TableRow>
          </TableHead>
        </Table>

        {products?.map((p) => {
          let shopVouchers = {
            ableVouchers: [],
            unableVouchers: []
          }

          ableShopVouchers?.forEach((v) => {
            if (v.voucher_creator_id.toString() === p.shop_id.toString()) {
              shopVouchers.ableVouchers.push(v)
            }
          })

          unableShopVouchers?.forEach((v) => {
            if (v.voucher_creator_id.toString() === p.shop_id.toString()) {
              shopVouchers.unableVouchers.push(v)
            }
          })

          return (
            <CheckoutItem
              key={p.shop_id}
              shopProductGroup={p}
              vouchers={shopVouchers}
              handleSelectedVouchers={handleSelectedVouchers}
            />
          )
        })}
        <PaymentMethods
          paymentMethods={paymentMethods}
          paymentMethodSelected={decodedToken?.paymentMethod}
          handleChangePaymentMethod={handleChangePaymentMethod}
        />
        <Paper>
          <VoucherOverview
            content={'Bevesi Vouchers'}
            info={{
              header: 'Bevesi Vouchers',
              logo: 'nothing'
            }}
            vouchers={ableShopVouchers}
            handleSelectedVouchers={handleSelectedVouchers}
          />
        </Paper>
        <PaymentOverview
          handlePlaceOrder={handlePlaceOrder}
          summary={decodedToken?.summary}
          paymentMethodSelected={decodedToken?.paymentMethod}
        />
      </Box>
      <NotificationDialog
        header={modalContent.header}
        content={modalContent.content}
        open={openModal}
        onClose={handleCloseModal}
      />
    </UserLayout>
  )
}

export default CustomerCheckOut
