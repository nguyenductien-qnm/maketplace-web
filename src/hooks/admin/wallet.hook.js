import { StatusCodes } from 'http-status-codes'
import { useEffect, useMemo, useRef, useState } from 'react'
import { getShopListForFilterAPI } from '~/api/shop.api'
import { getRecentWalletTransactionsByAdminAPI } from '~/api/transaction.api'
import { getUserListForFilterAPI } from '~/api/user.api'
import { queryWalletByAdminAPI } from '~/api/wallet.api'
import { navigate } from '~/helpers/navigation'

export const useAdminWallet = ({ type }) => {
  // ============================== STATE ==============================
  const defaultFilters = useMemo(
    () => ({
      walletOfShop: '',
      walletOfUser: '',
      createdFrom: '',
      createdTo: '',
      minBalance: ''
    }),
    []
  )

  const [isDenied, setDenied] = useState(false)
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [openDetailModal, setOpenDetailModal] = useState(false)
  const [recentTransactions, setRecentTransactions] = useState(null)

  const [shops, setShops] = useState([])
  const [users, setUsers] = useState([])

  const [filters, setFilters] = useState(defaultFilters)
  const skipEffect = useRef(false)

  const [count, setCount] = useState(null)
  const [wallets, setWallets] = useState([])

  // ============================== EFFECT ==============================

  useEffect(() => {
    if (isDenied) navigate('/unauthorized')
  }, [isDenied])

  useEffect(() => {
    if (skipEffect.current) {
      skipEffect.current = false
      return
    }

    queryWallets({ page, rowsPerPage, type, ...filters })
    if (type == 'VENDOR') {
      getShopList()
    } else if (type == 'CUSTOMER') {
      getUserList()
    }
  }, [page, rowsPerPage])

  // ============================== API ==============================

  const queryWallets = async (data) => {
    setLoading(true)
    try {
      const { status, resData } = await queryWalletByAdminAPI({
        payload: data
      })

      if (status === StatusCodes.OK) {
        const { count, wallets } = resData?.metadata
        setCount(count || 0)
        setWallets(wallets || [])
      }
    } catch (err) {
      if (err?.status !== StatusCodes.UNPROCESSABLE_ENTITY) setDenied(true)
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
      queryWallets({ page, rowsPerPage, type, ...filters })
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

  const handleOpenModal = ({ wallet }) => {
    handleGetRecentWalletTransactions(wallet)
    setOpenDetailModal(true)
  }

  const handleCloseModal = () => {
    setOpenDetailModal(false)
    setRecentTransactions(null)
  }

  const handleGetRecentWalletTransactions = async (data) => {
    const payload = {
      _id: type === 'VENDOR' ? data?.shop_id?._id : data?.user_id?._id,
      type
    }
    const { status, resData } = await getRecentWalletTransactionsByAdminAPI({
      payload
    })
    if (status === StatusCodes.OK)
      setRecentTransactions(resData?.metadata || [])
  }

  // ============================== RETURN ==============================

  return {
    openDetailModal,
    recentTransactions,
    wallets,
    count,
    loading,
    isDenied,

    filters,
    setFilters,
    page,
    rowsPerPage,
    shops,
    users,

    handleFilter,
    handleClearFilter,
    handleChangePage,
    handleChangeRowsPerPage,
    handleCloseModal,

    handleOpenModal
  }
}
