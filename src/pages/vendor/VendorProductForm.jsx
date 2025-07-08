import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import FormControlLabel from '@mui/material/FormControlLabel'
import Switch from '@mui/material/Switch'
import Typography from '@mui/material/Typography'
import ProductFormSkeleton from '~/components/vendor/VendorProductFrom/ProductFormSkeleton'
import SKUForm from '~/components/vendor/VendorProductFrom/SKUForm'
import SPUForm from '~/components/vendor/VendorProductFrom/SPUForm'
import ProductVariationsSelect from '~/components/vendor/VendorProductFrom/ProductVariationsSelect'
import { useVendorProductForm } from '~/hooks/vendor/productForm.hook'
import { FormProvider } from 'react-hook-form'
import TypographyLabel from '~/components/common/TypographyLabel'
import ReadOnlyTextField from '~/components/common/ReadOnlyTextField'
import { WEB_ROOT } from '~/utils/constants'

function VendorProductForm() {
  const {
    methods,
    loading,
    isMultiVariation,
    classifications,
    productSKU,
    pathname,
    handleAddVariation,
    onSubmit,
    handleUploadThumb,
    handleUploadGallery,
    handleDeleteGallery
  } = useVendorProductForm()

  const isCreate = pathname === '/vendor/create-product'
  const isUpdate = pathname.includes('/vendor/update-product')
  const pageTitle = isCreate
    ? 'Create Product'
    : isUpdate
    ? 'Update Product'
    : ''
  const { getValues } = methods
  return (
    <FormProvider {...methods}>
      <form onSubmit={onSubmit}>
        {(isCreate || isUpdate) && (
          <Typography sx={{ fontSize: '30px', fontWeight: '600' }}>
            {pageTitle}
          </Typography>
        )}

        <Divider sx={{ mt: '10px', mb: '30px' }} />
        {loading && <ProductFormSkeleton />}
        {!loading && (
          <Box>
            <SPUForm
              handleUploadThumb={handleUploadThumb}
              handleUploadGallery={handleUploadGallery}
              handleDeleteGallery={handleDeleteGallery}
            />

            <FormControlLabel
              control={
                <Switch
                  checked={isMultiVariation}
                  onChange={() =>
                    methods.setValue('isMultiVariation', !isMultiVariation)
                  }
                  color="primary"
                />
              }
              label="Multi variation"
            />

            {isMultiVariation && (
              <ProductVariationsSelect
                methods={methods}
                classifications={classifications}
              />
            )}

            {productSKU.length > 0 && <SKUForm />}

            {isMultiVariation && (
              <Button
                variant="contained"
                color="primary"
                sx={{ mt: 2 }}
                onClick={handleAddVariation}
              >
                + Add Variation
              </Button>
            )}

            {isUpdate && (
              <Box>
                <Divider sx={{ mt: 2, mb: 2 }} />
                <Box>
                  <TypographyLabel>Product slug</TypographyLabel>
                  <ReadOnlyTextField
                    value={`${WEB_ROOT}/product/${getValues('product_slug')}`}
                  />
                </Box>

                <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                  <Box sx={{ flex: 1 }}>
                    <TypographyLabel>Product sold</TypographyLabel>
                    <ReadOnlyTextField value={getValues('product_sold')} />
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <TypographyLabel>Reserved stock</TypographyLabel>
                    <ReadOnlyTextField value={getValues('reserved_stock')} />
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <TypographyLabel>Rating</TypographyLabel>
                    <ReadOnlyTextField
                      value={getValues('product_rating_average')}
                    />
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <TypographyLabel>Review</TypographyLabel>
                    <ReadOnlyTextField
                      value={getValues('product_review_count')}
                    />
                  </Box>
                  <Box sx={{ flex: 2 }}>
                    <TypographyLabel>Created at</TypographyLabel>
                    <ReadOnlyTextField value={getValues('createdAt')} />
                  </Box>
                </Box>
              </Box>
            )}

            <Box sx={{ mt: '20px' }}>
              <Button
                className="btn-shop-create-product"
                type="submit"
                variant="contained"
                sx={{ width: '100%' }}
              >
                Submit
              </Button>
            </Box>
          </Box>
        )}
      </form>
    </FormProvider>
  )
}
export default VendorProductForm
