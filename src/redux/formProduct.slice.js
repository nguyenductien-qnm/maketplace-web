import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import { uploadImageToCloudinary } from '~/helpers/apiSendImage'
import { authorizedAxios } from '~/utils/authorizedAxios'
import { API_ROOT } from '~/utils/constants'
const initialState = {
  isMultiVariation: false,
  product_name: '',
  product_thumb: '',
  product_gallery: [],
  product_price: 0,
  product_stock: 0,
  product_categories: [],
  product_status: '',
  product_specs: [
    { key: '', value: '' },
    { key: '', value: '' },
    { key: '', value: '' }
  ],
  product_description: '',
  product_classifications: [],
  product_sku: [],
  product_dimensions: {
    length: 0,
    width: 0,
    height: 0,
    weight: 0
  }
}

export const uploadImage = createAsyncThunk(
  'formProduct/uploadImage',
  async ({ file, type }) => {
    const response = await uploadImageToCloudinary(file)
    return { type, url: response }
  }
)

export const createProductAPI = createAsyncThunk(
  'formProduct/createProductAPI',
  async (_, { getState }) => {
    const state = getState()
    const productData = { ...state.formProduct }
    if (productData.isMultiVariation) {
      const variations = productData.product_classifications
      const skuProduct = productData.product_sku

      let arrSKU = skuProduct.map((sku) => {
        const filteredKeys = Object.fromEntries(
          variations.filter((key) => key in sku).map((key) => [key, sku[key]])
        )
        return { price: sku.price, stock: sku.stock, ...filteredKeys }
      })

      productData.product_sku = arrSKU
    } else {
      delete productData.product_classifications
      delete productData.product_sku
    }
    const res = await authorizedAxios.post(
      `${API_ROOT}/v1/api/productSPU/create`,
      productData
    )
    return res
  }
)

export const getProductByIdAPI = createAsyncThunk(
  'formProduct/getProductByIdAPI',
  async (_id) => {
    const res = await authorizedAxios.post(
      `${API_ROOT}/v1/api/productSPU/get-product-by-id`,
      { _id }
    )
    return res
  }
)

export const updateProductAPI = createAsyncThunk(
  'formProduct/updateProductAPI',
  async (_id, { getState }) => {
    const state = getState()
    const user = state.user.currentUser
    const productData = {
      ...state.formProduct,
      product_shop: user.shop_id
    }
    productData._id = _id
    const res = await authorizedAxios.post(
      `${API_ROOT}/v1/api/productSPU/update`,
      productData
    )
    return res
  }
)

export const formProductSlice = createSlice({
  name: 'formProduct',
  initialState,
  reducers: {
    handleSelecteThumb: (state, action) => {
      state.product_thumb = action.payload
    },

    handleMultiVariation: (state) => {
      state.isMultiVariation = !state.isMultiVariation
    },

    handleSelectVariation: (state, action) => {
      state.product_classifications = action.payload
      if (state.product_classifications.length === 0) state.product_sku = []
    },

    handleIncreaseQuantityProductSKU: (state) => {
      if (state.product_classifications.length === 0) {
        toast.error('Please select variation first')
        return
      }
      let newProductSKu = { price: '', stock: '' }

      for (let i = 0; i < state.product_classifications.length; i++) {
        const key = state.product_classifications[i]
        newProductSKu[key]
      }

      state.product_sku.push(newProductSKu)
    },

    handleDeleteProductSKU: (state, action) => {
      const { index } = action.payload
      state.product_sku.splice(index, 1)
    },

    handleIncreaseQuantityAttribute: (state) => {
      state.product_specs.push({ key: '', value: '' })
    },

    handleChangeSPUName: (state, action) => {
      state.product_name = action.payload
    },

    handleChangeSPUPrice: (state, action) => {
      state.product_price = action.payload
    },

    handleChangeSPUStock: (state, action) => {
      state.product_stock = action.payload
    },

    handleChangeSPUAttribute: (state, action) => {
      const { index, keyOrValue, newValue } = action.payload

      if (keyOrValue == 'key') {
        state.product_specs[index].key = newValue
      } else {
        state.product_specs[index].value = newValue
      }
    },

    handleDeleteSPUAttribute: (state, action) => {
      if (state.product_specs.length === 3) return
      const { index } = action.payload
      state.product_specs.splice(index, 1)
    },

    handleChangeSKUPrice: (state, action) => {
      const { index, newValue } = action.payload
      state.product_sku[index].price = newValue
    },

    handleChangeSKUStock: (state, action) => {
      const { index, newValue } = action.payload
      state.product_sku[index].stock = newValue
    },

    handleChangeOptionValue: (state, action) => {
      const { index, newValue, key } = action.payload
      state.product_sku[index][key] = newValue
    },

    handleDeleteThumb: (state) => {
      state.product_thumb = ''
    },

    handleDeleteGallery: (state, action) => {
      const { index } = action.payload
      state.product_gallery.splice(index, 1)
    },

    hanldeSelectedCategories: (state, action) => {
      state.product_categories = action.payload
    },

    handleChangeProductDescription: (state, action) => {
      state.product_description = action.payload
    },

    handleChangeProductStatus: (state, action) => {
      state.product_status = action.payload
    },

    handleChangeProductLength: (state, action) => {
      state.product_dimensions.length = action.payload
    },

    handleChangeProductWidth: (state, action) => {
      state.product_dimensions.width = action.payload
    },

    handleChangeProductHeight: (state, action) => {
      state.product_dimensions.height = action.payload
    },

    handleChangeProductWeight: (state, action) => {
      state.product_dimensions.weight = action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(uploadImage.fulfilled, (state, action) => {
      if (action.payload.type === 'thumb') {
        state.product_thumb = action.payload.url
      } else {
        state.product_gallery.push(action.payload.url)
      }
    }),
      builder.addCase(getProductByIdAPI.fulfilled, (state, action) => {
        const data = action.payload.data.metadata
        Object.keys(state).forEach((key) => {
          if (
            key !== 'isMultiVariation' &&
            key !== 'product_sku' &&
            key !== 'product_classifications'
          ) {
            state[key] = data[key]
          }
        })
        if (data?.product_sku && data.product_sku.length > 0) {
          data.product_sku.forEach((skuItem) => {
            data.product_classifications.forEach((classification) => {
              const classificationName = classification.name
              const index = data.product_classifications.findIndex(
                (i) => i.name === classificationName
              )
              if (!skuItem[`${classificationName}`]) {
                const i = skuItem?.sku_tier_indices[index]
                skuItem[`${classificationName}`] = classification?.options[i]
              }
              skuItem.price = skuItem.sku_price
              skuItem.stock = skuItem.sku_stock
            })
            // delete skuItem.sku_price
            // delete skuItem.sku_stock
            // delete skuItem.sku_tier_indices
          })

          const product_classifications = data.product_classifications.map(
            (e) => e.name
          )
          state.product_sku = data.product_sku
          state.product_classifications = product_classifications
          state.isMultiVariation = true
        }
      }),
      builder.addCase(createProductAPI.fulfilled, (state, action) => {})
  }
})

export const {
  handleMultiVariation,
  handleSelectVariation,
  handleIncreaseQuantityProductSKU,
  handleChangeSPUName,
  handleChangeSPUPrice,
  handleChangeSPUStock,
  handleIncreaseQuantityAttribute,
  handleChangeSPUAttribute,
  handleDeleteSPUAttribute,
  handleDeleteProductSKU,
  handleChangeSKUPrice,
  handleChangeSKUStock,
  handleChangeOptionValue,
  handleDeleteThumb,
  handleDeleteGallery,
  hanldeSelectedCategories,
  handleChangeProductDescription,
  handleChangeProductStatus,
  handleChangeProductLength,
  handleChangeProductWidth,
  handleChangeProductHeight,
  handleChangeProductWeight
} = formProductSlice.actions

export default formProductSlice.reducer
