import Box from '@mui/material/Box'
import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import ProductFormSkeleton from '~/components/vendor/VendorProductFrom/ProductFormSkeleton'
import BasicInformation from '~/components/vendor/VendorProductFrom/BasicInformation/BasicInformation'
import DetailInformation from '~/components/vendor/VendorProductFrom/DetailInformation'
import DeliveryInformation from '~/components/vendor/VendorProductFrom/DeliveryInformation'
import SaveIcon from '@mui/icons-material/Save'
import SaleInformation from '~/components/vendor/VendorProductFrom/SaleInformation/SaleInformation'
import { useVendorProductForm } from '~/hooks/vendor/productForm.hook'

function VendorProductForm() {
  const { ui, form, data, handlers } = useVendorProductForm()

  const { productStatus } = ui

  return (
    <form onSubmit={handlers.onSubmit}>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: '600', mb: 1 }}>
          {ui.pageTitle}
        </Typography>
        <Divider />
      </Box>

      {ui.loading && <ProductFormSkeleton />}

      {!ui.loading && (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {ui.isUpdate && (
            <Alert variant="outlined" severity="warning">
              Updating the product name, images, category, or description will
              require re-approval.
              <br />
              Please consider carefully before making changes.
              <br />
              This does not apply to products that are private or currently
              pending approval.
            </Alert>
          )}

          <BasicInformation form={form} categoriesTree={data.categoriesTree} />

          <DetailInformation form={form} />

          <SaleInformation
            form={form}
            variations={data.variations}
            variationHandlers={handlers.variations}
            onApplyAll={handlers.handleApplyAll}
          />

          <DeliveryInformation form={form} />

          {productStatus != 'banned' && (
            <Button
              type="submit"
              variant="contained"
              fullWidth
              loading={ui.isSubmitting}
              loadingPosition="start"
              startIcon={<SaveIcon />}
              disabled={ui.isSubmitting}
              className="btn-vendor-submit-product-form"
            >
              {ui.isSubmitting ? 'Submitting...' : 'Submit'}
            </Button>
          )}
        </Box>
      )}
    </form>
  )
}

export default VendorProductForm
