import { StatusCodes } from 'http-status-codes'
import { useEffect, useRef, useState } from 'react'
import { getShopListForFilterAPI } from '~/api/shop.api'
import { getUserListForFilterAPI } from '~/api/user.api'
import { navigate } from '~/helpers/navigation'
import {
  getTransactionDetailByAdminAPI,
  queryTransactionByAdminAPI
} from '~/api/transaction.api'

export const useAdminTransaction = ({ type }) => {
  // ============================== STATE ==============================
  const defaultFilters = {
    transactionOfShop: '',
    transactionOfUser: '',
    createdFrom: '',
    createdTo: '',
    amountRange: [50, 500],
    status: '',
    typeOfTrans: ''
  }

  const [isDenied, setDenied] = useState(false)
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  const [shops, setShops] = useState([])
  const [users, setUsers] = useState([])

  const [filters, setFilters] = useState(defaultFilters)
  const skipEffect = useRef(false)

  const [count, setCount] = useState(null)
  const [transactions, setTransactions] = useState([])
  const [transactionDetail, setTransactionDetail] = useState(null)
  const [openModal, setOpenModal] = useState(false)

  // ============================== EFFECT ==============================

  useEffect(() => {
    if (isDenied) navigate('/unauthorized')
  }, [isDenied])

  useEffect(() => {
    if (skipEffect.current) {
      skipEffect.current = false
      return
    }

    queryTransaction({ page, rowsPerPage, type, ...filters })
    if (type == 'VENDOR') {
      getShopList()
    } else if (type == 'CUSTOMER') {
      getUserList()
    }
  }, [type, page, rowsPerPage])

  // ============================== API ==============================

  const queryTransaction = async (data) => {
    setLoading(true)
    try {
      const { status, resData } = await queryTransactionByAdminAPI({
        payload: data
      })

      if (status === StatusCodes.OK) {
        const { count, transactions } = resData?.metadata
        setCount(count || 0)
        setTransactions(transactions || [])
      }
    } catch {
      setDenied(true)
    } finally {
      setLoading(false)
    }
  }

  const getShopList = async () => {
    const { status, resData } = await getShopListForFilterAPI()
    if (status === StatusCodes.OK) setShops(resData?.metadata || [])
  }

  const getUserList = async () => {
    const { status, resData } = await getUserListForFilterAPI()
    if (status === StatusCodes.OK) setUsers(resData?.metadata || [])
  }

  // ============================== HANDLER ==============================

  const handleFilter = () => {
    if (page === 0) {
      queryTransaction({ page, rowsPerPage, type, ...filters })
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

  const handleOpenModal = async ({ transaction }) => {
    setOpenModal(true)
    handleGetTransactionDetail({ transaction })
  }

  const handleGetTransactionDetail = async ({ transaction }) => {
    const { _id } = transaction
    const { status, resData } = await getTransactionDetailByAdminAPI({
      _id,
      type
    })
    if (status === StatusCodes.OK) setTransactionDetail(resData?.metadata)
  }

  const handleCloseModal = async () => {
    setOpenModal(false)
    setTransactionDetail(null)
  }

  // ============================== RETURN ==============================

  return {
    count,
    filters,
    loading,
    page,
    rowsPerPage,
    setFilters,
    transactionDetail,
    transactions,
    shops,
    users,

    openModal,
    handleCloseModal,
    handleOpenModal,

    handleChangePage,
    handleChangeRowsPerPage,
    handleClearFilter,
    handleFilter
  }
}
