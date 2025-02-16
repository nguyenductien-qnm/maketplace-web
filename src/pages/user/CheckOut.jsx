import UserLayout from '~/layouts/user/UserLayout'
import ShippingAddress from '~/components/user/CheckOut/ShippingAddress'
import OrderItem from '~/components/user/CheckOut/OrderItem'
import { Box, Table, TableCell, TableHead, TableRow } from '@mui/material'
import PaymentOverview from '~/components/user/CheckOut/PaymentOverview'
import PaymentMethods from '~/components/user/CheckOut/PaymentMethods'
import { useEffect, useRef, useState } from 'react'
import { getAddressListAPI } from '~/api/user.api'
import { grey } from '@mui/material/colors'
import PayPalSvg from '~/assets/user/svgIcon/paypal.svg'
import VnPaySvg from '~/assets/user/svgIcon/vnpay.svg'
import CodSvg from '~/assets/user/svgIcon/cod.svg'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'
import sortAddressByDefault from '~/helpers/sortAddressByDefault'
import { checkoutAPI } from '~/api/cart.api'
import NotificationModal from '~/components/NotificationModal'

function CheckOut() {
  const firstRender = useRef(true)
  const navigate = useNavigate()
  const paymentMethods = [
    { id: 1, name: 'Paypal', img: PayPalSvg },
    { id: 2, name: 'VnPay', img: VnPaySvg },
    { id: 3, name: 'Cash on Delivery', img: CodSvg }
  ]
  const [searchParams] = useSearchParams()
  const token = searchParams.get('token')
  const [decodedToken, setDecodedToken] = useState(null)
  useEffect(() => {
    if (token) {
      try {
        setDecodedToken(jwtDecode(token))
      } catch (error) {
        console.error('Invalid token', error)
      }
    }
  }, [token])

  const [products, setProducts] = useState()
  const [paymentMethodSelected, setPaymentMethodSelected] = useState(3)
  const [addresses, setAddresses] = useState()
  const [addressSelected, setAddressSelected] = useState()
  useEffect(() => {
    const getAddresss = async () => {
      const res = await getAddressListAPI()
      setAddresses(sortAddressByDefault(res.data.metadata))
    }
    getAddresss()
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

  const handleAddAddress = (data) => {
    if (data.default === true) {
      let addressList = [...addresses]
      let updateAddresList = []

      updateAddresList = addressList.map((item) => {
        return { ...item, default: false }
      })

      updateAddresList.push(data)
      setAddresses(sortAddressByDefault(updateAddresList))
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

  useEffect(() => {
    const handleChangeShippingAddress = async () => {
      const data = {
        products: products,
        address: addressSelected,
        payment_method: paymentMethodSelected
      }
      const res = await checkoutAPI(data)
      if (res.status === 200) {
        navigate(res.data?.metadata?.checkoutUrl)
      } else {
        handleOpenModal('Notification', res.message)
      }
    }
    if (firstRender.current && addressSelected) {
      firstRender.current = false
    } else if (addressSelected) {
      handleChangeShippingAddress()
    }
  }, [addressSelected, paymentMethodSelected])

  const handlePlaceOrder = async () => {
    console.log('addressSelected::::', addressSelected)
    console.log('paymentMethodSelected::::', paymentMethodSelected)
    console.log('products::::', products)
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
        {products?.map((p) => (
          <OrderItem key={p.product_id} product={p} />
        ))}
        <PaymentMethods
          paymentMethods={paymentMethods}
          paymentMethodSelected={paymentMethodSelected}
          setPaymentMethodSelected={setPaymentMethodSelected}
        />
        <PaymentOverview
          handlePlaceOrder={handlePlaceOrder}
          price={decodedToken?.price}
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
