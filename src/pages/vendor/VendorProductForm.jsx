import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import ProductFormSkeleton from '~/components/vendor/VendorProductFrom/ProductFormSkeleton'
import BasicInformation from '~/components/vendor/VendorProductFrom/BasicInformation/BasicInformation'
import DetailInformation from '~/components/vendor/VendorProductFrom/DetailInformation'
import DeliveryInformation from '~/components/vendor/VendorProductFrom/DeliveryInformation'
import SaleInformation from '~/components/vendor/VendorProductFrom/SaleInformation/SaleInformation'
import { useVendorProductForm } from '~/hooks/vendor/productForm.hook'

function VendorProductForm() {
  const { ui, form, data, handlers } = useVendorProductForm()

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
          <BasicInformation form={form} categoriesTree={data.categoriesTree} />

          <DetailInformation form={form} />

          <SaleInformation
            form={form}
            variations={data.variations}
            variationHandlers={handlers.variations}
            onApplyAll={handlers.handleApplyAll}
          />

          <DeliveryInformation form={form} />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={ui.isSubmitting}
          >
            {ui.isSubmitting ? 'Submitting...' : 'Submit'}
          </Button>
        </Box>
      )}
    </form>
  )
}

export default VendorProductForm
