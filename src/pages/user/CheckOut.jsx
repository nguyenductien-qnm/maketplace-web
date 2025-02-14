import UserLayout from '~/layouts/user/UserLayout'
import ShippingAddress from '~/components/user/CheckOut/ShippingAddress'
import OrderItem from '~/components/user/CheckOut/OrderItem'
import { Box, Table, TableCell, TableHead } from '@mui/material'
import PaymentOverview from '~/components/user/CheckOut/PaymentOverview'
import PaymentMethods from '~/components/user/CheckOut/PaymentMethods'
import { useEffect, useState } from 'react'
import { getAddressListAPI } from '~/api/user.api'
import { grey } from '@mui/material/colors'
import PayPalSvg from '~/assets/user/svgIcon/paypal.svg'
import VnPaySvg from '~/assets/user/svgIcon/vnpay.svg'
import CodSvg from '~/assets/user/svgIcon/cod.svg'
function CheckOut() {
  const paymentMethods = [
    { id: 1, name: 'Paypal', img: PayPalSvg },
    { id: 2, name: 'VnPay', img: VnPaySvg },
    { id: 3, name: 'Cash on Delivery', img: CodSvg }
  ]
  const [paymentMethodSelected, setPaymentMethodSelected] = useState(3)
  const [addresses, setAddresses] = useState()
  const [addressSelected, setAddressSelected] = useState()
  useEffect(() => {
    const getAddresss = async () => {
      const res = await getAddressListAPI()
      setAddresses(res.data.metadata)
    }
    getAddresss()
  }, [])

  useEffect(() => {
    setAddressSelected(addresses?.find((i) => i.default === true))
  }, [addresses])

  return (
    <UserLayout>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <ShippingAddress
          addresses={addresses}
          addressSelected={addressSelected}
          setAddressSelected={setAddressSelected}
        />
        <Table sx={{ marginTop: '15px' }}>
          <TableHead>
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
          </TableHead>
        </Table>
        <OrderItem />
        <OrderItem />
        <OrderItem />
        <OrderItem />
        <PaymentMethods
          paymentMethods={paymentMethods}
          paymentMethodSelected={paymentMethodSelected}
          setPaymentMethodSelected={setPaymentMethodSelected}
        />
        <PaymentOverview />
      </Box>
    </UserLayout>
  )
}

export default CheckOut
