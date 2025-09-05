import { useEffect, useState } from 'react'
import { StatusCodes } from 'http-status-codes'
import { getCategoriesRootByAdminAPI } from '~/api/category.api'
import {
  createCommissionRateByAdminAPI,
  exportCommissionRatesByAdminAPI,
  queryCommissionRateByAdminAPI,
  updateCommissionRateByAdminAPI
} from '~/api/commissionRate.api'

import { navigate } from '~/helpers/navigation'

const LOADING_CLASS = ['.btn-commission-form', '.btn-export-commission']

const COMMISSION_RATE_TABLE_MAP = [
  { key: 'category_code', label: 'Category name' },
  { key: 'refund_rate_auto', label: 'Refund rate auto' },
  { key: 'refund_rate_manual', label: 'Refund rate manual' },
  { key: 'creator_id?.user_name', label: 'Created by' },
  { key: 'createdAt', label: 'Created at' },
  { key: 'updatedAt', label: 'Updated at' },
  { key: 'action', label: 'Action' }
]

export const useAdminCommissionRate = () => {
  // ================= STATE =================
  const [loading, setLoading] = useState(true)
  const [isDenied, setDenied] = useState(false)

  const [openModal, setOpenModal] = useState(false)
  const [action, setAction] = useState(null)
  const [selectedCommissionRate, setSelectedCommissionRate] = useState(null)

  const [commissionRates, setCommissionRates] = useState([])
  const [categoriesRoot, setCategoriesRoot] = useState([])

  const [sortBy, setSortBy] = useState('updatedAt')

  // ================ EFFECTS ================
  useEffect(() => {
    if (isDenied) navigate('/unauthorized')
  }, [isDenied])

  useEffect(() => {
    queryCommissionRateByAdmin()
  }, [sortBy])

  useEffect(() => {
    fetchCategoriesRoot()
  }, [])

  // ================ HANDLERS ================
  const handleOpenModal = ({ action, commissionRate }) => {
    setAction(action)
    if (action === 'update') {
      setSelectedCommissionRate(commissionRate)
    }
    setOpenModal(true)
  }

  const handleCloseModal = () => {
    setOpenModal(false)
    setAction(null)
    setSelectedCommissionRate(null)
  }

  const queryCommissionRateByAdmin = async () => {
    setLoading(true)
    try {
      const { status, resData } = await queryCommissionRateByAdminAPI({
        payload: { sortBy }
      })
      if (status === StatusCodes.OK) {
        const commissionRates = resData?.metadata
        setCommissionRates(commissionRates || [])
      }
    } catch (err) {
      if (err?.status !== StatusCodes.UNPROCESSABLE_ENTITY) setDenied(true)
    } finally {
      setLoading(false)
    }
  }

  const fetchCategoriesRoot = async () => {
    const { status, resData } = await getCategoriesRootByAdminAPI()
    if (status === StatusCodes.OK) {
      const categoriesRoot = resData?.metadata
      setCategoriesRoot(categoriesRoot || [])
    }
  }

  const handleCreateCommissionRate = async ({ data }) => {
    const { status, resData } = await createCommissionRateByAdminAPI({
      payload: data,
      loadingClass: LOADING_CLASS
    })

    if (status === StatusCodes.CREATED) {
      setCommissionRates((prev) => [...prev, resData?.metadata])
      handleCloseModal()
    }
  }

  const handleUpdateCommissionRate = async ({ data }) => {
    const { status, resData } = await updateCommissionRateByAdminAPI({
      payload: data,
      loadingClass: LOADING_CLASS
    })

    if (status === StatusCodes.OK) {
      const updated = resData?.metadata
      setCommissionRates((prev) =>
        prev.map((c) => (c?._id === updated?._id ? updated : c))
      )
      handleCloseModal()
    }
  }

  const handleExportCommissionRates = async () => {
    const { status, resData } = await exportCommissionRatesByAdminAPI({
      payload: { sortBy },
      loadingClass: LOADING_CLASS
    })

    if (status === StatusCodes.OK) {
      const blob = resData
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'commission_rates.csv'
      a.click()
      window.URL.revokeObjectURL(url)
    }
  }

  const handleSubmit = async ({ data }) => {
    action === 'create'
      ? await handleCreateCommissionRate({ data })
      : await handleUpdateCommissionRate({ data })
  }

  // ================ RETURN ================
  return {
    openModal,
    action,
    loading,
    selectedCommissionRate,
    commissionRates,
    categoriesRoot,
    sortBy,
    setSortBy,
    handleOpenModal,
    handleCloseModal,
    handleSubmit,
    handleExportCommissionRates,
    COMMISSION_RATE_TABLE_MAP
  }
}
