import { useEffect, useRef, useState } from 'react'
import { jwtDecode } from 'jwt-decode'
import { navigate } from '~/helpers/navigation'
import { getAddressListAPI } from '~/api/user.api'
import { checkoutAPI } from '~/api/cart.api'
import { placeOrderAPI } from '~/api/order.api'
import { getVoucherForCustomerAPI } from '~/api/voucher.api'
import sortAddressByDefault from '~/helpers/sortAddressByDefault'
import PayPalSvg from '~/assets/user/svgIcon/paypal.svg'
import CodSvg from '~/assets/user/svgIcon/cod.svg'
import { useSearchParams } from 'react-router-dom'
export const useCheckout = () => {
  const paymentMethods = [
    { id: 1, name: 'Paypal', img: PayPalSvg },
    { id: 2, name: 'Cash on Delivery', img: CodSvg }
  ]
  const firstRender = useRef(true)

  const [searchParams] = useSearchParams()
  const token = searchParams.get('token')
  const [decodedToken, setDecodedToken] = useState(null)

  const [products, setProducts] = useState()
  const [paymentMethodSelected, setPaymentMethodSelected] = useState(3)
  const [addresses, setAddresses] = useState()
  const [addressSelected, setAddressSelected] = useState()
  const [shopVouchers, setShopVouchers] = useState()
  const [bevesiVouchers, setBevesiVouchers] = useState()
  const [selectedVouchers, setSelectedVouchers] = useState([])
  const [modalContent, setModalContent] = useState({ header: '', content: '' })
  const [openModal, setOpenModal] = useState(false)

  const handleCloseModal = () => setOpenModal(false)
  const handleOpenModal = (header, content) => {
    setModalContent({ header, content })
    setOpenModal(true)
  }

  useEffect(() => {
    if (token) {
      setDecodedToken(jwtDecode(token))
    }
  }, [token])

  useEffect(() => {
    const getAddress = async () => {
      const res = await getAddressListAPI()
      setAddresses(sortAddressByDefault(res.data.metadata))
    }
    getAddress()
  }, [])

  useEffect(() => {
    if (decodedToken) {
      setPaymentMethodSelected(decodedToken.payment_method)
      setAddressSelected(decodedToken.address)
      setProducts(decodedToken.products)
    }
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

  const buildOrderData = () => ({
    products: products?.reduce((acc, p) => acc.concat(p.products), []),
    address: addressSelected,
    payment_method: paymentMethodSelected,
    vouchers: selectedVouchers
  })

  useEffect(() => {
    const handleChangeShippingAddress = async () => {
      const data = buildOrderData()
      const res = await checkoutAPI(data, '.btn-user-place-order')
      if (res.status === 200) {
        navigate(res.data?.metadata?.checkoutUrl)
      } else {
        handleOpenModal('Notification', res.message)
        if (res?.message[0]?.includes('Shipping is not supported')) {
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

  const findShopIdByVoucherId = (voucherId) => {
    for (const shop of shopVouchers || []) {
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
        const filtered = prev.filter((v) => v.shop_voucher !== shopId)
        return [...filtered, { shop_voucher: shopId, voucher_id: value }]
      })
    }
  }

  const handleAddAddress = (data) => {
    if (data.default === true) {
      const updated = addresses.map((item) => ({ ...item, default: false }))
      updated.push(data)
      setAddresses(sortAddressByDefault(updated))
      setAddressSelected(data)
      return
    }
    setAddresses((prevList) => sortAddressByDefault([...prevList, data]))
  }

  const handlePlaceOrder = async () => {
    const res = await placeOrderAPI({ token }, '.btn-user-place-order')
    if (res?.status === 200) {
      navigate('/my-account/orders')
    }
  }

  return {
    addresses,
    addressSelected,
    paymentMethods,
    handleAddAddress,
    setAddressSelected,
    products,
    shopVouchers,
    bevesiVouchers,
    handleSelectedVouchers,
    paymentMethodSelected,
    setPaymentMethodSelected,
    handlePlaceOrder,
    modalContent,
    openModal,
    handleCloseModal,
    decodedToken
  }
}
