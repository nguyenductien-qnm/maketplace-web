import { useDispatch, useSelector } from 'react-redux'
import FormProductSPU from './FormProductSPU/FormProductSPU'
import FormProductSKU from './FormProductSKU/FormProductSKU'
import MultipleSelectVariation from './FormProductSPU/MultipleSelectVariation'
import { Box, Button, Divider, Typography } from '@mui/material'
import Grid from '@mui/material/Grid2'
import SectionThumbUpLoad from './Thumb/SectionThumbUpload'
import SectionGalleryUpLoad from './Gallery/SectionGalleryUpload'
import InputDescription from './FormProductSPU/InputDescription'
import ButtonAddProductSKU from './ButtonAction'
import { FormProvider, useForm } from 'react-hook-form'
import { blue } from '@mui/material/colors'
import {
  createProductAPI,
  getProductByIdAPI,
  updateProductAPI
} from '~/redux/formProduct.slice'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'

function VendorCreateProduct({ shopId }) {
  const productData = useSelector((state) => state.formProduct)

  const dispatch = useDispatch()

  const { page } = useParams()
  const { _id } = useParams()

  const methods = useForm()
  const { reset } = methods

  const handleActionProduct = async () => {
    if (page === 'create-product') {
      await dispatch(createProductAPI())
    } else if (page === 'update-product') {
      await dispatch(updateProductAPI(_id))
    }
  }

  useEffect(() => {
    const getProductAPI = async () => {
      if (_id) {
        const data = await dispatch(getProductByIdAPI(_id))
        reset(data.payload.data.metadata)
      }
    }
    if (page === 'update-product') getProductAPI()
  }, [])

  return (
    <Box>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(handleActionProduct)}>
          {page === 'create-product' && (
            <Typography sx={{ fontSize: '30px', fontWeight: '600' }}>
              Create Product
            </Typography>
          )}

          {page === 'update-product' && (
            <Typography sx={{ fontSize: '30px', fontWeight: '600' }}>
              Update Product
            </Typography>
          )}

          <Divider sx={{ mt: '10px', mb: '30px' }} />
          <Grid container spacing={2}>
            <Grid size={9}>
              <FormProductSPU page={page} />

              {productData?.isMultiVariation && (
                <Box>
                  <MultipleSelectVariation />

                  <FormProductSKU />

                  <ButtonAddProductSKU />
                </Box>
              )}

              <InputDescription />
              {/* <ButtonCreateProduct /> */}
              <Button
                type="submit"
                fullWidth
                sx={{
                  fontWeight: '600',
                  color: 'white',
                  backgroundColor: blue[600],
                  marginTop: '20px'
                }}
              >
                Submit
              </Button>
            </Grid>
            <Grid size={3}>
              <SectionThumbUpLoad />
              <SectionGalleryUpLoad />
            </Grid>
          </Grid>
        </form>
      </FormProvider>
    </Box>
  )
}
export default VendorCreateProduct
