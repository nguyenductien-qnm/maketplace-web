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
    isOpenProductModal,
    isLoading,
    isSubmitting,
    title,
    isUpdate,
    voucherStatus
  } = ui

  const { handleSubmitForm } = handler

  const { selectedProducts } = data

  return (
    <form onSubmit={handleSubmitForm}>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 600, mb: 1 }}>
          {title}
        </Typography>
        <Divider />
      </Box>

      {isLoading && <VoucherFormSkeleton />}

      {!isLoading && (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
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

          {isOpenProductModal && (
            <ProductSelectionModal
              open={isOpenProductModal}
              selected={selectedProducts}
              handle={handler}
            />
          )}

          {voucherStatus !== 'EXPIRED' ? (
            <Button
              type="submit"
              variant="contained"
              fullWidth
              loading={isSubmitting}
              loadingPosition="start"
            >
              Submit
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
