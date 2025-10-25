import { StatusCodes } from 'http-status-codes'
import { useEffect, useRef, useState } from 'react'
// import { apiGetProvinces } from '~/helpers/getAddress'
import { navigate } from '~/helpers/navigation'
import {
  queryShopByAdminAPI,
  banShopByAdminAPI,
  unbanShopByAdminAPI,
  approveShopByAdminAPI,
  rejectShopByAdminAPI,
  getShopDetailAPI,
  exportShopDataByAdminAPI
} from '~/api/shop.api'

const LOADING_CLASS = [
  '.btn-reason-modal',
  '.btn-admin-shop-action',
  '.btn-export-shop'
]

const SHOP_TABLE_MAP = [
  { key: 'shop_avatar', label: 'Avatar' },
  { key: 'shop_name', label: 'Name' },
  { key: 'shop_email', label: 'Email' },
  { key: 'shop_phone', label: 'Phone' },
  { key: 'shop_product_count', label: 'Product' },
  { key: 'shop_follower_count', label: 'Follower' },
  { key: 'shop_rating', label: 'Rating' },
  { key: 'detail', label: 'Detail' },
  { key: 'action', label: 'Action' }
]

const DEFAULT_FILTERS = {
  search: '',
  province: '',
  createdFrom: '',
  createdTo: '',
  sortBy: 'createdAt_desc',
  productCountRange: [0, 500],
  followerCountRange: [0, 1000],
  ratingRange: [0, 5]
}

export const useAdminShop = ({ status }) => {
  // ============================== STATE ==============================
  const [shops, setShops] = useState([])
  const [count, setCount] = useState(0)
  const [provinces, setProvinces] = useState([])
  const [loading, setLoading] = useState(true)
  const [isDenied, setDenied] = useState(false)

  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  const [filters, setFilters] = useState(DEFAULT_FILTERS)
  const skipEffect = useRef(false)

  const [openReasonModal, setOpenReasonModal] = useState(false)
  const [openDetailModal, setOpenDetailModal] = useState(false)
  const [action, setAction] = useState(null)
  const [selectedShop, setSelectedShop] = useState(null)
  const [shopDetail, setShopDetail] = useState(null)

  // ============================== EFFECT ==============================
  useEffect(() => {
    if (isDenied) navigate('/access-denied')
  }, [isDenied])

  useEffect(() => {
    if (skipEffect.current) {
      skipEffect.current = false
      return
    }

    queryShopByAdmin({ page, rowsPerPage, status, ...filters })
  }, [status, page, rowsPerPage])

  useEffect(() => {
    // getProvinces()
  }, [])

  // ============================== API ==============================
  // const getProvinces = async () => {
  //   const { status, resData } = await apiGetProvinces()
  //   if (status === StatusCodes.OK) setProvinces(resData?.metadata || [])
  // }

  const queryShopByAdmin = async (data) => {
    setLoading(true)
    try {
      const { status, resData } = await queryShopByAdminAPI({ payload: data })
      if (status === StatusCodes.OK) {
        const { shops, count } = resData?.metadata
        setShops(shops || [])
        setCount(count || 0)
      }
    } catch (err) {
      if (err?.status !== StatusCodes.UNPROCESSABLE_ENTITY) setDenied(true)
    } finally {
      setLoading(false)
    }
  }

  // ============================== HANDLER ==============================

  const handleFilter = () => {
    if (page === 0) {
      queryShopByAdmin({ page, rowsPerPage, status, ...filters })
    } else {
      setPage(0)
    }
  }

  const handleClearFilter = () => {
    skipEffect.current = true
    setFilters({ ...DEFAULT_FILTERS })
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const handleOpenModal = ({ action, shop }) => {
    setAction(action)
    if (action === 'detail') {
      setOpenDetailModal(true)
      handleGetShopDetail(shop)
    } else {
      setSelectedShop(shop)
      setOpenReasonModal(true)
    }
  }

  const handleCloseModal = () => {
    setOpenDetailModal(false)
    setOpenReasonModal(false)
    setAction(null)
    setSelectedShop(null)
    setShopDetail(null)
  }

  const handleBanShop = async (data) => {
    const { status, resData } = await banShopByAdminAPI({
      payload: data,
      loadingClass: LOADING_CLASS
    })
    if (status === StatusCodes.OK) {
      const update = resData?.metadata
      setShops((prev) =>
        prev.map((shop) => (shop._id == update._id ? update : shop))
      )
      handleCloseModal()
    }
  }

  const handleUnbanShop = async (data) => {
    const { status, resData } = await unbanShopByAdminAPI({
      payload: data,
      loadingClass: LOADING_CLASS
    })
    if (status === StatusCodes.OK) {
      const update = resData?.metadata
      setShops((prev) =>
        prev.map((shop) => (shop._id == update._id ? update : shop))
      )
      handleCloseModal()
    }
  }

  const handleApproveShop = async (data) => {
    const { status, resData } = await approveShopByAdminAPI({
      payload: data,
      loadingClass: LOADING_CLASS
    })
    if (status === StatusCodes.OK) {
      const update = resData?.metadata
      setShops((prev) =>
        prev.map((shop) => (shop._id == update._id ? update : shop))
      )
      handleCloseModal()
    }
  }

  const handleRejectShop = async (data) => {
    const { status, resData } = await rejectShopByAdminAPI({
      payload: data,
      loadingClass: LOADING_CLASS
    })
    if (status === StatusCodes.OK) {
      const update = resData?.metadata
      setShops((prev) =>
        prev.map((shop) => (shop._id == update._id ? update : shop))
      )
      handleCloseModal()
    }
  }

  const handleGetShopDetail = async (data) => {
    const payload = {
      _id: data?._id,
      role: 'admin'
    }
    const { status, resData } = await getShopDetailAPI({ payload })
    if (status === StatusCodes.OK) setShopDetail(resData?.metadata)
  }

  const handleExportData = async () => {
    const { status: apiStatus, resData } = await exportShopDataByAdminAPI({
      payload: { status, ...filters },
      loadingClass: LOADING_CLASS
    })

    if (apiStatus === StatusCodes.OK) {
      const blob = resData
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'shops.csv'
      a.click()
      window.URL.revokeObjectURL(url)
    }
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
    count,
    loading,
    isDenied,
    shopDetail,
    provinces,

    filters,
    setFilters,
    page,
    rowsPerPage,

    openDetailModal,
    openReasonModal,
    modalProps: modalProps[action],

    handleFilter,
    handleClearFilter,
    handleChangePage,
    handleChangeRowsPerPage,

    handleOpenModal,
    handleCloseModal,

    handleApproveShop,
    handleExportData,
    SHOP_TABLE_MAP
  }
}
