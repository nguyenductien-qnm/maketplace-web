import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import BasicInformation from '~/components/vendor/VendorVoucherForm/BasicInformation'
import DiscountSetting from '~/components/vendor/VendorVoucherForm/DiscountSetting'
import VoucherApplicable from '~/components/vendor/VendorVoucherForm/VoucherApplicable'
import SaveIcon from '@mui/icons-material/Save'
import ProductSelectionModal from '~/components/vendor/VendorVoucherForm/ProductSelectionModal'
import { useVendorVoucherForm } from '~/hooks/vendor/voucherForm.hook'

function VendorVoucherForm() {
  const { ui, data, handler, form } = useVendorVoucherForm()
  const { openModal, loading, isSubmitting, pageTitle } = ui
  const { selectedProducts } = data

  return (
    <form>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: '600', mb: 1 }}>
          {pageTitle}
        </Typography>
        <Divider />
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <BasicInformation form={form} />

        <DiscountSetting form={form} />

        <VoucherApplicable form={form} data={data} handler={handler} />

        {openModal && (
          <ProductSelectionModal
            open={openModal}
            selected={selectedProducts}
            handle={handler}
          />
        )}

        <Button
          type="submit"
          variant="contained"
          fullWidth
          loading={isSubmitting}
          loadingPosition="start"
          startIcon={<SaveIcon />}
          disabled={isSubmitting}
          className="btn-vendor-submit-voucher-form"
        >
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </Button>
      </Box>
    </form>
  )
}
export default VendorVoucherForm
