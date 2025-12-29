import { useEffect, useRef, useState } from 'react'
import { jwtDecode } from 'jwt-decode'
import { navigate } from '~/helpers/navigation'
import { getAddressesByUserAPI } from '~/api/user.api'
import {
  checkoutByCustomerAPI,
  updateCheckoutPaymentMethodAPI,
  updateCheckoutVoucherAPI,
  updateCheckoutAddressAPI
} from '~/api/checkout.api'
import { placeOrderAPI } from '~/api/order.api'
import {
  getSystemVouchersByCustomerAPI,
  getVouchersOfMultipleShopByCustomerAPI
} from '~/api/voucher.api'
import sortAddressByDefault from '~/helpers/sortAddressByDefault'
import PayPalSvg from '~/assets/user/svgIcon/paypal.svg'
import CodSvg from '~/assets/user/svgIcon/cod.svg'
import { useSearchParams } from 'react-router-dom'
import { StatusCodes } from 'http-status-codes'
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
  const [selectedVouchers, setSelectedVouchers] = useState([])
  const [modalContent, setModalContent] = useState({ header: '', content: '' })
  const [openModal, setOpenModal] = useState(false)

  const [ableShopVouchers, setAbleShopVouchers] = useState(null)
  const [unableShopVouchers, setUnableShopVouchers] = useState(null)
  const [platformVouchers, setPlatformVouchers] = useState(null)

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
    if (decodedToken) {
      setPaymentMethodSelected(decodedToken.payment_method)
      setAddressSelected(decodedToken.address)
      setProducts(decodedToken.orders)
    }
  }, [decodedToken])

  useEffect(() => {
    fetchAddresses()
  }, [])

  useEffect(() => {
    if (
      products &&
      ableShopVouchers == null &&
      unableShopVouchers == null &&
      platformVouchers == null
    ) {
      fetchSystemVoucher()
      fetchShopsVoucher()
    }
  }, [products])

  const fetchSystemVoucher = async () => {
    const { status, resData } = await getSystemVouchersByCustomerAPI({
      payload: { token }
    })
    if (status === StatusCodes.OK)
      setPlatformVouchers({ ableVouchers: resData.metadata })
  }

  const fetchShopsVoucher = async () => {
    const { status, resData } = await getVouchersOfMultipleShopByCustomerAPI({
      payload: { token }
    })
    if (status === StatusCodes.OK) {
      const { ableVouchers, unableVouchers } = resData.metadata
      setAbleShopVouchers(ableVouchers)
      setUnableShopVouchers(unableVouchers)
    }
  }

  const fetchAddresses = async () => {
    const { status, resData } = await getAddressesByUserAPI()
    if (status === StatusCodes.OK)
      setAddresses(sortAddressByDefault(resData.metadata))
  }

  const handleSelectedVouchers = async (data) => {
    const payload = {
      token,
      voucher: data
    }

    const { status, resData } = await updateCheckoutVoucherAPI({
      payload,
      loadingClass: ['.btn-user-place-order']
    })

    if (status === StatusCodes.OK) {
      navigate(resData.metadata?.checkoutUrl)
    } else {
      console.log('error:::', resData)
    }
  }

  const handleChangePaymentMethod = async ({ method }) => {
    if (method === decodedToken.paymentMethod) return
    const payload = { token, paymentMethod: method }

    const { status, resData } = await updateCheckoutPaymentMethodAPI({
      payload,
      loadingClass: ['.btn-user-place-order']
    })

    if (status === StatusCodes.OK) {
      navigate(resData.metadata?.checkoutUrl)
    } else {
      console.log('error:::', resData)
    }
  }

  const handleChangeAddress = async ({ address }) => {
    if (decodedToken.address._id === address._id) return
    const payload = { token, address }

    const { status, resData } = await updateCheckoutAddressAPI({
      payload,
      loadingClass: ['.btn-user-place-order']
    })

    if (status === StatusCodes.OK) {
      navigate(resData.metadata?.checkoutUrl)
    } else {
      console.log('error:::', resData)
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
    ui: { modalContent, openModal, paymentMethods },
    data: {
      products,
      addressSelected,
      addresses,
      ableShopVouchers,
      unableShopVouchers,
      platformVouchers,
      paymentMethodSelected,
      decodedToken
    },
    handler: {
      handleAddAddress,
      setAddressSelected,
      handleSelectedVouchers,
      setPaymentMethodSelected,
      handlePlaceOrder,
      handleCloseModal,
      handleChangePaymentMethod,
      handleChangeAddress
    }
  }
}
