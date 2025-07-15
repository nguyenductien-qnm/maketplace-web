import { StatusCodes } from 'http-status-codes'
import { act, useEffect, useState } from 'react'
import { getCategoriesRootByAdminAPI } from '~/api/category.api'
import {
  createCommissionRateByAdminAPI,
  getCommissionRateByAdminAPI,
  updateCommissionRateByAdminAPI
} from '~/api/commissionRate.api'
import { navigate } from '~/helpers/navigation'

export const useAdminCommissionRate = () => {
  const [action, setAction] = useState(null)
  const [openModal, setOpenModal] = useState(false)
  const [selectedCommissionRate, setSelectedCommissionRate] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isDenied, setDenied] = useState(false)
  const [commissionRates, setCommissionRates] = useState([])
  const [categoriesRoot, setCategoriesRoot] = useState([])

  useEffect(() => {
    if (isDenied) navigate('/unauthorized')
  }, [isDenied])

  useEffect(() => {
    const fetchCommissionRate = async () => {
      try {
        const { status, resData } = await getCommissionRateByAdminAPI()
        if (status === StatusCodes.OK)
          setCommissionRates(resData?.metadata || [])
      } catch {
        setDenied(true)
      } finally {
        setLoading(false)
      }
    }
    const fetchCategoriesRoot = async () => {
      const { status, resData } = await getCategoriesRootByAdminAPI()
      if (status === StatusCodes.OK) setCategoriesRoot(resData?.metadata || [])
    }
    fetchCommissionRate()
    fetchCategoriesRoot()
  }, [])

  const handleOpenModal = ({ action, commissionRate }) => {
    setOpenModal(true)
    if (action === 'update') setSelectedCommissionRate(commissionRate)
    setAction(action)
  }

  const handleCloseModal = () => {
    setOpenModal(false)
    setAction(null)
    setSelectedCommissionRate(null)
  }

  const handleCreateCommissionRate = async ({ data, loadingClass }) => {
    const { status, resData } = await createCommissionRateByAdminAPI({
      payload: data,
      loadingClass
    })
    if (status === StatusCodes.CREATED) {
      setCommissionRates((prev) => [...prev, resData?.metadata])
      handleCloseModal()
    }
  }

  const handleUpdateCommissionRate = async ({ data, loadingClass }) => {
    const { status, resData } = await updateCommissionRateByAdminAPI({
      payload: data,
      loadingClass
    })
    if (status === StatusCodes.OK) {
      const update = resData?.metadata
      setCommissionRates((prev) =>
        prev?.map((c) => (c?._id === update?._id ? update : c))
      )
      handleCloseModal()
    }
  }

  return {
    openModal,
    action,
    selectedCommissionRate,
    loading,
    commissionRates,
    categoriesRoot,
    selectedCommissionRate,
    handleOpenModal,
    handleCloseModal,
    handleCreateCommissionRate,
    handleUpdateCommissionRate
  }
}
