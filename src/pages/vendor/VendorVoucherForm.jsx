import Box from '@mui/material/Box'
import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import BasicInformation from '~/components/vendor/VendorVoucherForm/BasicInformation'
import DiscountSetting from '~/components/vendor/VendorVoucherForm/DiscountSetting'
import VoucherApplicable from '~/components/vendor/VendorVoucherForm/VoucherApplicable'
import ProductSelectionModal from '~/components/vendor/VendorVoucherForm/ProductSelectionModal'
import VoucherFormSkeleton from '~/components/vendor/VendorVoucherForm/VoucherFormSkeleton'
import { useVendorVoucherForm } from '~/hooks/vendor/voucherForm.hook'
import { navigate } from '~/helpers/navigation'

const alertColor = {
  ONGOING: 'success',
  UPCOMING: 'warning',
  EXPIRED: 'error'
}

function VendorVoucherForm() {
  const { ui, data, handler, form } = useVendorVoucherForm()
  const {
    openModal,
    loading,
    isSubmitting,
    pageTitle,
    isUpdate,
    voucherStatus
  } = ui
  const { selectedProducts } = data
  const { handleSubmitForm } = handler

  return (
    <form onSubmit={handleSubmitForm}>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: '600', mb: 1 }}>
          {pageTitle}
        </Typography>
        <Divider />
      </Box>

      {loading && <VoucherFormSkeleton />}

      {!loading && (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {isUpdate && (
            <Alert color={alertColor[voucherStatus]}>
              Status: {voucherStatus}
            </Alert>
          )}

          <BasicInformation form={form} ui={ui} />

          <DiscountSetting form={form} ui={ui} />

          <VoucherApplicable
            form={form}
            data={data}
            handler={handler}
            ui={ui}
          />

          {openModal && (
            <ProductSelectionModal
              open={openModal}
              selected={selectedProducts}
              handle={handler}
            />
          )}

          {voucherStatus != 'EXPIRED' && (
            <Button
              type="submit"
              variant="contained"
              fullWidth
              loadingPosition="start"
              loading={isSubmitting}
              disabled={isSubmitting}
              className="btn-vendor-submit-voucher-form"
            >
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </Button>
          )}

          {voucherStatus == 'EXPIRED' && (
            <Button
              onClick={() => navigate('/vendor/voucher')}
              variant="outlined"
              fullWidth
              color="secondary"
            >
              Back to list
            </Button>
          )}
        </Box>
      )}
    </form>
  )
}
export default VendorVoucherForm
