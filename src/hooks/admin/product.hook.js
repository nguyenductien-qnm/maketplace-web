import { useEffect, useRef, useState } from 'react'
import {
  getProductDetailByAdminAPI,
  queryProductByAdminAPI
} from '~/api/product.api'
import { getShopListForFilterAPI } from '~/api/shop.api'
import { navigate } from '~/helpers/navigation'
import { authorizedAxios } from '~/utils/authorizedAxios'
import { API_ROOT } from '~/utils/constants'

export const useAdminProduct = ({ status }) => {
  // ============================== STATE ==============================

  const defaultFilters = {
    search: '',
    productOfShop: '',
    category: '',
    createdFrom: '',
    createdTo: '',
    priceRange: [0, 2000]
  }

  const [products, setProducts] = useState([])
  const [count, setCount] = useState(0)
  const [loading, setLoading] = useState(true)
  const [isDenied, setDenied] = useState(false)

  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [categories, setCategories] = useState([])
  const [shops, setShops] = useState([])

  const [filters, setFilters] = useState(defaultFilters)
  const skipEffect = useRef(false)

  const [openReasonModal, setOpenReasonModal] = useState(false)
  const [openDetailModal, setOpenDetailModal] = useState(false)
  const [action, setAction] = useState(null)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [productDetail, setProductDetail] = useState(null)

  // ============================== EFFECT ==============================
  useEffect(() => {
    if (isDenied) navigate('/unauthorized')
  }, [isDenied])

  useEffect(() => {
    const fetchShops = async () => {
      const res = await getShopListForFilterAPI()
      setShops(res?.data?.metadata)
    }
    const fetchCategories = async () => {
      const res = await authorizedAxios.get(`${API_ROOT}/v1/api/category`)
      setCategories(res?.data?.metadata)
    }
    fetchShops()
    fetchCategories()
  }, [])

  useEffect(() => {
    if (skipEffect.current) {
      skipEffect.current = false
      return
    }

    queryProductByAdmin({ page, rowsPerPage, status, ...filters })
  }, [status, page, rowsPerPage])

  // ============================== API ==============================

  const queryProductByAdmin = async (data) => {
    setLoading(true)
    try {
      const res = await queryProductByAdminAPI(data)
      if (res.status === 200) {
        setProducts(res.data?.metadata?.products)
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

  // ============================== HANDLER ==============================
  const handleGetProductDetail = async (data) => {
    const res = await getProductDetailByAdminAPI({ _id: data._id })
    if (res.status === 200) setProductDetail(res?.data?.metadata)
  }

  const handleFilter = () => {
    if (page === 0) {
      queryProductByAdmin({ page, rowsPerPage, status, ...filters })
    } else {
      setPage(0)
    }
  }

  const handleClearFilter = () => {
    skipEffect.current = true
    setFilters(defaultFilters)
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const handleOpenModal = ({ action, product }) => {
    setAction(action)
    setSelectedProduct(product)
    if (action === 'detail') {
      setOpenDetailModal(true)
      handleGetProductDetail(product)
    } else {
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

  const modalProps = {
    ban: {
      type: 'reason',
      header: 'Ban Product',
      open: openReasonModal,
      onSubmit: (value) => {
        console.log(value)
      },
      submitText: 'Ban',
      submitColor: 'error'
    },
    unban: {
      type: 'reason',
      header: 'Unban Product',
      open: openReasonModal,
      onSubmit: (value) => {
        console.log(value)
      },
      submitText: 'Unban',
      submitColor: 'success'
    },
    reject: {
      type: 'reason',
      header: 'Reject Product',
      open: openReasonModal,
      onSubmit: (value) => {
        console.log(value)
      },
      submitText: 'Reject',
      submitColor: 'error'
    }
  }

  return {
    products,
    count,
    loading,
    isDenied,
    productDetail,
    shops,
    categories,

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
    handleCloseModal
  }
}
