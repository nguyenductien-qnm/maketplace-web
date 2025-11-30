import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { getProductDetailByCustomerAPI } from '~/api/product.api'
import { navigate } from '~/helpers/navigation'
import { addProductToCartAPI } from '~/redux/cart.slice'

export const useCustomerProduct = () => {
  const dispatch = useDispatch()
  const { product_slug } = useParams()
  const [product, setProduct] = useState(null)
  const [shop, setShop] = useState(null)
  const [loading, setLoading] = useState(true)
  const [openReportModal, setOpenReportModal] = useState(false)
  const [isSubmittingReport, setIsSubmittingReport] = useState(false)
  const [breakCrumbs, setBreakCrumbs] = useState()

  const [indexSelected, setIndexSelected] = useState([])
  const [productSelected, setProductSelected] = useState()
  const [quantitySelected, setQuantitySelected] = useState(1)

  const [selectedTab, setSelectedTab] = useState('description')

  const user = useSelector((state) => state.user.currentUser)

  const handleChangeTab = (tab) => {
    setSelectedTab(tab)
  }

  const fetchProduct = async () => {
    try {
      const { status, resData } = await getProductDetailByCustomerAPI({
        product_slug
      })
      if (status) {
        const { shop, ...rest } = resData.metadata
        console.log(rest)
        if (rest.product_variations.length == 0) {
          console.log('rest.products_sku[0]::', rest.products_sku[0])
          setProductSelected(rest.products_sku[0])
        }
        setProduct(rest)
        setShop(shop)
      }
    } catch {
      navigate('/404-not-found')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProduct()
  }, [product_slug])

  useEffect(() => {
    setBreakCrumbs([
      { name: 'Home', url: '/home' },
      { name: product?.product_name, _id: product?._id }
    ])
  }, [product])

  useEffect(() => {
    const allValuesFilled = indexSelected.every((val) => val !== undefined)
    if (
      allValuesFilled &&
      indexSelected.length === product?.product_variations?.length
    ) {
      const selectedSKU = product?.products_sku?.find((sku) =>
        sku.sku_tier_indices.every((val, idx) => val === indexSelected[idx])
      )
      handleSelectProduct(selectedSKU)
    } else {
      handleSelectProduct(null)
    }
  }, [indexSelected])

  const handleSelectProduct = (product) => {
    setQuantitySelected(1)
    setProductSelected(product)
  }

  const handleSelectItem = (optionIndex, valueIndex) => {
    if (
      product.product_visibility == 'public' &&
      shop.shop_status == 'approved'
    ) {
      setIndexSelected((prev) => {
        let newSelected = [...prev]

        if (newSelected[optionIndex] === valueIndex) {
          delete newSelected[optionIndex]
        } else {
          newSelected[optionIndex] = valueIndex

          for (
            let i = optionIndex + 1;
            i < product?.product_variations?.length;
            i++
          ) {
            if (
              !product?.products_sku?.some(
                (sku) =>
                  sku.sku_tier_indices
                    .slice(0, i)
                    .every((val, idx) => val === newSelected[idx]) &&
                  sku.sku_tier_indices[i] === newSelected[i]
              )
            ) {
              newSelected[i] = undefined
            }
          }
        }
        return newSelected
      })
    }
  }

  const handleAddProductToCart = () => {
    if (!user) {
      navigate('/auth/login')
      return
    }
    const { _id, available_stock } = productSelected
    if (available_stock < quantitySelected) setQuantitySelected(available_stock)
    if (quantitySelected <= 0) {
      toast.error('Quantity must be greater than 0')
      return
    }
    const payload = {
      product_id: _id,
      shop_id: shop._id,
      product_quantity: quantitySelected,
      product_parent_id: product._id
    }
    dispatch(addProductToCartAPI({ payload, loadingClass: [] }))
  }

  const handleOpenReportModal = () => {
    setOpenReportModal(true)
  }

  const handleCloseReportModal = () => {
    if (isSubmittingReport) return
    setOpenReportModal(false)
  }

  const handleSubmitReportProduct = (data) => {
    console.log(data)
  }

  return {
    ui: {
      loading,
      selectedTab,
      productSelected,
      quantitySelected,
      indexSelected,
      openReportModal
    },
    data: {
      product,
      shop,
      breakCrumbs
    },
    handler: {
      handleChangeTab,
      handleSelectItem,
      setQuantitySelected,
      handleAddProductToCart,
      handleSubmitReportProduct,
      handleOpenReportModal,
      handleCloseReportModal
    }
  }
}
