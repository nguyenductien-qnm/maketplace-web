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

function VendorProductForm() {
  const {
    methods,
    loading,
    isMultiVariation,
    classifications,
    productSKU,
    pathname,
    handleAddVariation,
    onSubmit
  } = useVendorProductForm()

  const isCreate = pathname === '/vendor/create-product'
  const isUpdate = pathname === '/vendor/update-product'
  const pageTitle = isCreate
    ? 'Create Product'
    : isUpdate
    ? 'Update Product'
    : ''

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
            <SPUForm />

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
