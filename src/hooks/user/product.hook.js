import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getProductDetailByCustomerAPI } from '~/api/product.api'
import { navigate } from '~/helpers/navigation'

export const useCustomerProduct = () => {
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
    setProductSelected(product)
  }

  const handleSelectItem = (optionIndex, valueIndex) => {
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

  const handleAddProductToCart = () => {
    let product1 = {}
    if (product?.product_sku?.length > 0) {
      product1.product_id = productSelected._id
      product1.quantity = quantitySelected
      product1.product_type = 'product_sku'
    } else {
      product1.product_id = product?._id
      product1.quantity = quantitySelected
      product1.product_type = 'product_spu'
    }

    // if (product1)
    //   addToCartAPI(product1, ['.btn-user-add-to-cart', '.btn-user-buy-now'])
    console.log('product1:::', product1)
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
