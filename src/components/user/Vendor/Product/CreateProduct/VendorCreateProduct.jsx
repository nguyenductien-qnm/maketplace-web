import { useSelector } from 'react-redux'
import FormCreateProductSPU from './FormCreateProductSPU/FormCreateProductSPU'
import FormCreateProductSKU from './FormCreateProductSKU/FormCreateProductSKU'
import MultipleSelectVariation from './FormCreateProductSPU/MultipleSelectVariation'
import { Box, Button, Divider, Typography } from '@mui/material'
import Grid from '@mui/material/Grid2'
import { useState } from 'react'
import SectionThumbUpLoad from './Thumb/SectionThumbUpload'
import SectionGalleryUpLoad from './Gallery/SectionGalleryUpload'
import InputDescription from './FormCreateProductSPU/InputDescription'
import ButtonCreateProduct from './FormCreateProductSPU/ButtonCreateProduct'
import ButtonAddProductSKU from './ButtonAddProductSPU'

function VendorCreateProduct() {
  const isMultiVariation = useSelector(
    (state) => state.formCreateProduct.isMultiVariation
  )

  return (
    <Box>
      <Typography sx={{ fontSize: '30px', fontWeight: '600' }}>
        Add New Product
      </Typography>
      <Divider sx={{ mt: '10px', mb: '30px' }} />
      <Grid container spacing={2}>
        <Grid item size={9}>
          <FormCreateProductSPU />

          {isMultiVariation && (
            <Box>
              <MultipleSelectVariation />

              <FormCreateProductSKU />

              <ButtonAddProductSKU />
            </Box>
          )}

          {/* <InputDescription /> */}
          <ButtonCreateProduct />
        </Grid>
        <Grid item size={3}>
          <SectionThumbUpLoad />
          <SectionGalleryUpLoad />
        </Grid>
      </Grid>
    </Box>
  )
}
export default VendorCreateProduct
