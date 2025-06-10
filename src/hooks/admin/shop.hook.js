import { useEffect, useState } from 'react'
import {
  acceptShopAPI,
  banShopAPI,
  queryShopByAdminAPI,
  rejectShopAPI,
  unbanShopAPI
} from '~/api/shop.api'
import { navigate } from '~/helpers/navigation'

export const useAdminShop = () => {
  const [isDenied, setDenied] = useState(false)
  const [loading, setLoading] = useState(true)
  const [count, setCount] = useState(0)
  const [shops, setShops] = useState([])

  const [openReasonModal, setOpenReasonModal] = useState(false)
  const [openInfoModal, setOpenInfoModal] = useState(false)
  const [action, setAction] = useState(null)
  const [selectedShop, setSelectedShop] = useState(null)

  const queryShopByAdmin = async (data) => {
    setLoading(true)
    try {
      const res = await queryShopByAdminAPI(data)
      if (res.status === 200) {
        setShops(res.data?.metadata?.shops)
        setCount(res.data?.metadata?.count)
      } else {
        setDenied(true)
      }
    } catch (err) {
      setDenied(true)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (isDenied) navigate('/unauthorized')
  }, [isDenied])

  const handleOpenModal = ({ action, shop }) => {
    console.log(action)
    console.log(shop)
    setAction(action)
    setSelectedShop(shop)
    if (action === 'detail') {
      setOpenInfoModal(true)
    } else {
      setOpenReasonModal(true)
    }
  }

  const handleCloseModal = () => {
    setOpenInfoModal(false)
    setOpenReasonModal(false)
    setAction(null)
    setSelectedShop(null)
  }

  const handleBanShop = async (data) => {
    await banShopAPI(data)
    setShops((prev) => prev.filter((shop) => shop._id != data._id))
    handleCloseModal()
  }

  const handleUnbanShop = async (data) => {
    await unbanShopAPI(data)
    setShops((prev) => prev.filter((shop) => shop._id != data._id))
    handleCloseModal()
  }

  const handleAcceptShop = async (data) => {
    await acceptShopAPI(data)
    setShops((prev) => prev.filter((shop) => shop._id != data._id))
  }

  const handleRejectShop = async (data) => {
    await rejectShopAPI(data)
    setShops((prev) => prev.filter((shop) => shop._id != data._id))
    handleCloseModal()
  }

  const modalProps = {
    ban: {
      type: 'reason',
      header: 'Ban Shop',
      open: openReasonModal,
      onSubmit: (value) => {
        handleBanShop({
          _id: selectedShop?._id,
          reason: value,
          action
        })
      },
      submitText: 'Ban',
      submitColor: 'error'
    },
    unban: {
      type: 'reason',
      header: 'Unban Shop',
      open: openReasonModal,
      onSubmit: (value) => {
        handleUnbanShop({
          _id: selectedShop?._id,
          reason: value,
          action
        })
      },
      submitText: 'Unban',
      submitColor: 'success'
    },
    reject: {
      type: 'reason',
      header: 'Reject Shop',
      open: openReasonModal,
      onSubmit: (value) => {
        handleRejectShop({
          _id: selectedShop?._id,
          reason: value,
          action
        })
      },
      submitText: 'Reject',
      submitColor: 'error'
    }
  }

  return {
    shops,
    isDenied,
    loading,
    count,
    queryShopByAdmin,
    openReasonModal,
    openInfoModal,
    handleOpenModal,
    handleCloseModal,
    handleAcceptShop,
    selectedShop,
    modalProps: modalProps[action]
  }
}
