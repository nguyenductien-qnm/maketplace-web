import Box from '@mui/material/Box'
import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import BasicInformation from '../components/VoucherForm/BasicInformation'
import DiscountSetting from '../components/VoucherForm/DiscountSetting'
import VoucherApplicable from '../components/VoucherForm/VoucherApplicable'
import ProductSelectionModal from '../components/VoucherForm/ProductSelectionModal'
import VoucherFormSkeleton from '../components/VoucherForm/VoucherFormSkeleton'
import { useShopVoucherForm } from '../hooks/useShopVoucherForm'
import { VOUCHER_STATUS_ALERT_COLOR } from '../constants/voucherForm.constants'

function VoucherFormPage() {
  const { ui, data, handler, form } = useShopVoucherForm()

  const {
    openModal,
    loading,
    isSubmitting,
    pageTitle,
    isUpdate,
    voucherStatus
  } = ui

  const { selectedProducts } = data

  return (
    <form onSubmit={handler.handleSubmitForm}>
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 600, mb: 1 }}>
          {pageTitle}
        </Typography>
        <Divider />
      </Box>

      {/* Loading */}
      {loading && <VoucherFormSkeleton />}

      {/* Content */}
      {!loading && (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {/* Status */}
          {isUpdate && voucherStatus && (
            <Alert color={VOUCHER_STATUS_ALERT_COLOR[voucherStatus]}>
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

          {/* Submit / Back */}
          {voucherStatus !== 'EXPIRED' ? (
            <Button
              type="submit"
              variant="contained"
              fullWidth
              loading={isSubmitting}
              disabled={isSubmitting}
              className="btn-vendor-submit-voucher-form"
            >
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </Button>
          ) : (
            <Button
              onClick={handler.handleBackToList}
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

export default VoucherFormPage
