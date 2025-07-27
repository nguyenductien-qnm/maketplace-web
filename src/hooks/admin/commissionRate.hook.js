import { useEffect, useState } from 'react'
import { StatusCodes } from 'http-status-codes'

import { getCategoriesRootByAdminAPI } from '~/api/category.api'
import {
  createCommissionRateByAdminAPI,
  getCommissionRateByAdminAPI,
  updateCommissionRateByAdminAPI
} from '~/api/commissionRate.api'

import { navigate } from '~/helpers/navigation'

// ================= CONSTANTS =================
const LOADING_CLASS = [
  '.btn-submit-commission-form',
  '.btn-cancel-submit-commission-form'
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

  // ================ EFFECTS ================
  useEffect(() => {
    if (isDenied) navigate('/unauthorized')
  }, [isDenied])

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [commissionRes, categoryRes] = await Promise.all([
          getCommissionRateByAdminAPI(),
          getCategoriesRootByAdminAPI()
        ])

        if (commissionRes.status === StatusCodes.OK)
          setCommissionRates(commissionRes?.resData?.metadata || [])

        if (categoryRes.status === StatusCodes.OK)
          setCategoriesRoot(categoryRes?.resData?.metadata || [])
      } catch {
        setDenied(true)
      } finally {
        setLoading(false)
      }
    }

    fetchInitialData()
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
    handleOpenModal,
    handleCloseModal,
    handleSubmit
  }
}
