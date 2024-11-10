import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { uploadImageToCloudinary } from '~/helpers/apiSendImage'
const initialState = {
  isMultiVariation: false,
  spuName: '',
  spuThumb: '',
  spuGallery: [],
  spuPrice: '',
  spuStock: '',
  spuStatus: false,
  spu_attribute: [
    { key: '', value: '' },
    { key: '', value: '' },
    { key: '', value: '' }
  ],
  product_desciption: '',
  productVariation: [],
  product_sku: []
}

export const uploadIamge = createAsyncThunk(
  'formCreateProduct/uploadIamge',
  async ({ file, type }) => {
    const response = await uploadImageToCloudinary(file)
    return { type, url: response }
  }
)

export const formCreateProductSlice = createSlice({
  name: 'formCreateProduct',
  initialState,
  reducers: {
    handleSelecteThumb: (state, action) => {
      state.spuThumb = action.payload
    },

    handleMultiVariation: (state) => {
      state.isMultiVariation = !state.isMultiVariation
    },

    handleSelectVariation: (state, action) => {
      state.productVariation = action.payload
      const arrSKU = state.product_sku
      arrSKU.forEach((element) => {
        element[action.payload] = ''
      })
    },

    handleIncreaseQuantityProductSKU: (state) => {
      let newProductSKu = { price: '', stock: '' }

      for (let i = 0; i < state.productVariation.length; i++) {
        const key = state.productVariation[i]
        newProductSKu[key]
      }

      state.product_sku.push(newProductSKu)
    },

    handleDeleteProductSKU: (state, action) => {
      const { index } = action.payload
      state.product_sku.splice(index, 1)
    },

    handleIncreaseQuantityAttribute: (state) => {
      state.spu_attribute.push({ key: '', value: '' })
    },

    handleChangeSPUName: (state, action) => {
      state.spuName = action.payload
    },

    handleChangeSPUPrice: (state, action) => {
      state.spuPrice = action.payload
    },

    handleChangeSPUStock: (state, action) => {
      state.spuStock = action.payload
    },

    handleChangeSPUAttribute: (state, action) => {
      const { index, keyOrValue, newValue } = action.payload

      if (keyOrValue == 'key') {
        state.spu_attribute[index].key = newValue
      } else {
        state.spu_attribute[index].value = newValue
      }
    },

    handleDeleteSPUAttribute: (state, action) => {
      if (state.spu_attribute.length === 3) return
      const { index } = action.payload
      state.spu_attribute.splice(index, 1)
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
      state.spuThumb = ''
    },

    handleDeleteGallery: (state, action) => {
      const { index } = action.payload
      state.spuGallery.splice(index, 1)
    }
  },
  extraReducers: (builder) => {
    builder.addCase(uploadIamge.fulfilled, (state, action) => {
      if (action.payload.type === 'thumb') {
        state.spuThumb = action.payload.url
      } else {
        state.spuGallery.push(action.payload.url)
      }
    })
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
  handleDeleteGallery
} = formCreateProductSlice.actions

export default formCreateProductSlice.reducer
