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
import { getVouchersOfMultipleShopByCustomerAPI } from '~/api/voucher.api'
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
    const getAddress = async () => {
      const { status, resData } = await getAddressesByUserAPI()
      if (status === StatusCodes.OK) {
        const { metadata } = resData
        setAddresses(sortAddressByDefault(metadata))
      }
    }
    getAddress()
  }, [])

  useEffect(() => {
    if (decodedToken) {
      setPaymentMethodSelected(decodedToken.payment_method)
      setAddressSelected(decodedToken.address)
      setProducts(decodedToken.orders)
      console.log('decodedToken::', JSON.stringify(decodedToken, null, 2))
    }
  }, [decodedToken])

  useEffect(() => {
    const getVoucher = async () => {
      if (products) {
        const { status, resData } =
          await getVouchersOfMultipleShopByCustomerAPI({ payload: { token } })
        if (status === StatusCodes.OK) {
          const { ableVouchers, unableVouchers } = resData.metadata
          setAbleShopVouchers(ableVouchers)
          setUnableShopVouchers(unableVouchers)
        }
      }
    }
    if (
      ableShopVouchers == null &&
      unableShopVouchers == null &&
      platformVouchers == null
    )
      getVoucher()
  }, [products])

  // useEffect(() => {
  //   const handleChangeShippingAddress = async () => {
  //     const data = buildOrderData()
  //     const res = await checkoutByCustomerAPI(data, '.btn-user-place-order')
  //     if (res.status === 200) {
  //       navigate(res.data?.metadata?.checkoutUrl)
  //     } else {
  //       handleOpenModal('Notification', res.message)
  //       if (res?.message[0]?.includes('Shipping is not supported')) {
  //         setAddressSelected(addresses.find((a) => a.default === true))
  //       }
  //       if (res.metadata?.updatedProduct) {
  //         navigate('/cart')
  //       }
  //     }
  //   }
  //   if (firstRender.current && addressSelected) {
  //     firstRender.current = false
  //   } else if (addressSelected) {
  //     handleChangeShippingAddress()
  //   }
  // }, [addressSelected, paymentMethodSelected])

  // useEffect(() => {
  //   const applyVoucher = async () => {
  //     const data = buildOrderData()
  //     const res = await checkoutByCustomerAPI(data, '.btn-user-place-order')
  //     if (res.status === 200) {
  //       navigate(res.data?.metadata?.checkoutUrl)
  //     } else {
  //       handleOpenModal('Notification', res.message)
  //     }
  //   }
  //   if (selectedVouchers.length > 0) applyVoucher()
  // }, [selectedVouchers])

  // const findShopIdByVoucherId = (voucherId) => {
  //   for (const shop of shopVouchers || []) {
  //     const found = shop.vouchers.find((v) => v._id === voucherId)
  //     if (found) {
  //       return shop.shopId
  //     }
  //   }
  //   return null
  // }

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
