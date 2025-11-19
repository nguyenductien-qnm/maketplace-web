import { StatusCodes } from 'http-status-codes'
import { useEffect, useState } from 'react'
import { getCategoriesByOwnerAPI } from '~/api/category.api'
import { queryProductByShopAPI } from '~/api/product.api'

const DEFAULT_FILTERS = {
  status: 'ALL',
  search: '',
  category: '',
  sort_by: 'newest',
  page: 1,
  limit: 10
}

const MAX_PRODUCT = 100

export const useProductSelection = ({ selected }) => {
  const [filters, setFilters] = useState(DEFAULT_FILTERS)

  const [loading, setLoading] = useState(true)
  const [products, setProducts] = useState([])
  const [count, setCount] = useState(0)
  const [selectedProducts, setSelectedProducts] = useState([])
  const [categories, setCategories] = useState([])

  useEffect(() => {
    fetchProducts({ filters })
    fetchCategories()
  }, [])

  useEffect(() => {
    if (selected) setSelectedProducts(selected)
  }, [selected])

  const allCurrentPageSelected =
    products.length > 0 &&
    products.every((p) => selectedProducts.some((sp) => sp._id === p._id))

  const someCurrentPageSelected = products.some((p) =>
    selectedProducts.some((sp) => sp._id === p._id)
  )

  const fetchCategories = async () => {
    const { status, resData } = await getCategoriesByOwnerAPI()
    if (status === StatusCodes.OK) setCategories(resData.metadata)
  }

  const fetchProducts = async ({ filters }) => {
    try {
      setLoading(true)
      const { status, resData } = await queryProductByShopAPI({
        payload: filters
      })
      if (status === StatusCodes.OK) {
        const { products, count } = resData.metadata
        setProducts(products)
        setCount(count)
      }
    } finally {
      setLoading(false)
    }
  }

  const handleSelectProduct = (product) => {
    const isSelected = selectedProducts.some((p) => p._id === product._id)
    if (isSelected) {
      setSelectedProducts((prev) => prev.filter((p) => p._id !== product._id))
    } else {
      setSelectedProducts((prev) => [...prev, product])
    }
  }

  const handleSelectAllCurrentPage = (e) => {
    if (e.target.checked) {
      const add = products.filter(
        (p) => !selectedProducts.some((sp) => sp._id === p._id)
      )
      setSelectedProducts((prev) => [...prev, ...add])
    } else {
      setSelectedProducts((prev) =>
        prev.filter((p) => !products.some((cp) => cp._id === p._id))
      )
    }
  }

  const handleFilter = () => {
    const updatedFilters = { ...filters, page: 1 }
    setFilters(updatedFilters)
    fetchProducts({ filters: updatedFilters })
  }

  const handleClearFilter = () => {
    setFilters(DEFAULT_FILTERS)
    fetchProducts({ filters: DEFAULT_FILTERS })
  }

  const handleChangePage = (e, newValue) => {
    const pageValue = newValue + 1
    const updatedFilters = { ...filters, page: pageValue }
    setFilters(updatedFilters)
    fetchProducts({ filters: updatedFilters })
  }

  const handleChangeRowsPerPage = (event) => {
    const limitValue = parseInt(event.target.value, 10)
    const updatedFilters = { ...filters, limit: limitValue, page: 1 }
    setFilters(updatedFilters)
    fetchProducts({ filters: updatedFilters })
  }

  return {
    ui: {
      loading,
      count,
      allCurrentPageSelected,
      someCurrentPageSelected,
      MAX_PRODUCT
    },
    data: { products, categories, filters, selectedProducts },
    handler: {
      handleSelectAllCurrentPage,
      handleSelectProduct,
      handleChangePage,
      handleChangeRowsPerPage,
      handleFilter,
      handleClearFilter,
      setFilters
    }
  }
}
