import UserLayout from '~/layouts/user/UserLayout'
import ShippingAddress from '~/components/user/CheckOut/ShippingAddress'
import CheckoutItem from '~/components/user/CheckOut/CheckoutItem'
import {
  Box,
  Paper,
  Table,
  TableCell,
  TableHead,
  TableRow
} from '@mui/material'
import PaymentOverview from '~/components/user/CheckOut/PaymentOverview'
import PaymentMethods from '~/components/user/CheckOut/PaymentMethods'
import { useEffect, useRef, useState } from 'react'
import { getAddressListAPI } from '~/api/user.api'
import { grey } from '@mui/material/colors'
import PayPalSvg from '~/assets/user/svgIcon/paypal.svg'
import CodSvg from '~/assets/user/svgIcon/cod.svg'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'
import sortAddressByDefault from '~/helpers/sortAddressByDefault'
import { checkoutAPI } from '~/api/cart.api'
import NotificationModal from '~/components/common/NotificationModal'
import { placeOrderAPI } from '~/api/order.api'
import { getVoucherForCustomerAPI } from '~/api/voucher.api'
import VoucherOverview from '~/components/user/CheckOut/VoucherOverview'

function CheckOut() {
  const firstRender = useRef(true)
  const navigate = useNavigate()
  const paymentMethods = [
    { id: 1, name: 'Paypal', img: PayPalSvg },
    { id: 2, name: 'Cash on Delivery', img: CodSvg }
  ]

  const [searchParams] = useSearchParams()
  const token = searchParams.get('token')
  const [decodedToken, setDecodedToken] = useState(null)
  useEffect(() => {
    if (token) {
      setDecodedToken(jwtDecode(token))
    }
  }, [token])

  const [products, setProducts] = useState()
  const [paymentMethodSelected, setPaymentMethodSelected] = useState(3)
  const [addresses, setAddresses] = useState()
  const [addressSelected, setAddressSelected] = useState()
  const [shopVouchers, setShopVouchers] = useState()
  const [bevesiVouchers, setBevesiVouchers] = useState()
  const [selectedVouchers, setSelectedVouchers] = useState([])

  const findShopIdByVoucherId = (voucherId) => {
    for (const shop of shopVouchers) {
      const found = shop.vouchers.find((v) => v._id === voucherId)
      if (found) {
        return shop.shopId
      }
    }
    return null
  }

  const handleSelectedVouchers = (value) => {
    const existVoucher = selectedVouchers.some((v) => v.voucher_id === value)
    if (!existVoucher) {
      const shopId = findShopIdByVoucherId(value)

      setSelectedVouchers((prev) => {
        const withoutThisShop = prev.filter((v) => v.shop_voucher !== shopId)
        return [...withoutThisShop, { shop_voucher: shopId, voucher_id: value }]
      })
    }
  }

  useEffect(() => {
    const applyVoucher = async () => {
      const data = buildOrderData()
      const res = await checkoutAPI(data, '.btn-user-place-order')
      if (res.status === 200) {
        navigate(res.data?.metadata?.checkoutUrl)
      } else {
        handleOpenModal('Notification', res.message)
      }
    }
    if (selectedVouchers.length > 0) applyVoucher()
  }, [selectedVouchers])

  useEffect(() => {
    const getAddress = async () => {
      const res = await getAddressListAPI()
      setAddresses(sortAddressByDefault(res.data.metadata))
    }
    getAddress()
  }, [])

  useEffect(() => {
    if (
      JSON.stringify(paymentMethodSelected) !==
      JSON.stringify(decodedToken?.payment_method)
    ) {
      setPaymentMethodSelected(decodedToken?.payment_method)
    }
    if (
      JSON.stringify(addressSelected) !== JSON.stringify(decodedToken?.address)
    ) {
      setAddressSelected(decodedToken?.address)
    }

    setProducts(decodedToken?.products)
  }, [decodedToken])

  useEffect(() => {
    const getVoucher = async () => {
      if (products) {
        const res = await getVoucherForCustomerAPI(products)
        setShopVouchers(res?.data?.metadata.shopVouchers || [])
        setBevesiVouchers(res?.data?.metadata.bevesiVouchers || [])
      }
    }
    if (!shopVouchers || !bevesiVouchers) getVoucher()
  }, [products])

  const handleAddAddress = (data) => {
    if (data.default === true) {
      let addressList = [...addresses]
      let updateAddressList = []

      updateAddressList = addressList.map((item) => {
        return { ...item, default: false }
      })

      updateAddressList.push(data)
      setAddresses(sortAddressByDefault(updateAddressList))
      setAddressSelected(data)
      return
    }
    setAddresses((prevList) => sortAddressByDefault([...prevList, data]))
  }

  const handleCloseModal = () => setOpenModal(false)

  const handleOpenModal = (header, content) => {
    setModalContent({ header, content })
    setOpenModal(true)
  }

  const [modalContent, setModalContent] = useState({ header: '', content: '' })
  const [openModal, setOpenModal] = useState(false)

  const buildOrderData = () => {
    return {
      products: products.reduce((acc, p) => acc.concat(p.products), []),
      address: addressSelected,
      payment_method: paymentMethodSelected,
      vouchers: selectedVouchers
    }
  }

  useEffect(() => {
    const handleChangeShippingAddress = async () => {
      const data = buildOrderData()
      const res = await checkoutAPI(data, '.btn-user-place-order')
      if (res.status === 200) {
        navigate(res.data?.metadata?.checkoutUrl)
      } else {
        handleOpenModal('Notification', res.message)
        if (res?.message[0].includes('Shipping is not supported')) {
          setAddressSelected(addresses.find((a) => a.default === true))
        }
        if (res.metadata?.updatedProduct) {
          navigate('/cart')
        }
      }
    }
    if (firstRender.current && addressSelected) {
      firstRender.current = false
    } else if (addressSelected) {
      handleChangeShippingAddress()
    }
  }, [addressSelected, paymentMethodSelected])

  const handlePlaceOrder = async () => {
    const res = await placeOrderAPI(
      {
        token
      },
      '.btn-user-place-order'
    )
    if (res?.status === 200) {
      navigate('/my-account/orders')
    }
  }

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

export default CheckOut
