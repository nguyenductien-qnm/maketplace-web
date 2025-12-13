import Box from '@mui/material/Box'
import ReasonModal from '~/components/admin/ReasonModal'
import VoucherDetailModal from '~/components/admin/voucher/VoucherDetailModal'
import VoucherFilterExpand from '~/components/admin/voucher/VoucherFilter'
import VoucherForm from '~/components/admin/voucher/VoucherForm'
import VoucherHeader from '~/components/admin/voucher/VoucherHeader'
import VoucherTable from '~/components/admin/voucher/VoucherTable'
import VoucherSummary from '~/components/admin/voucher/VoucherSummary'
import { useAdminVoucher } from '~/hooks/admin/voucher.hook'

function AdminVoucher() {
  const { ui, data, handler } = useAdminVoucher()
  const { selectedVoucher, action, modalProps } = ui
  const { openVoucherForm } = ui.form
  const { openReasonModal } = ui.modal
  const { handleCreateVoucher, handleUpdateVoucher } = handler
  const { handleCloseModal } = handler.modal
  const { voucherDetail } = data

  return (
    <Box>
      <VoucherHeader ui={ui.header} handler={handler.header} />

      <VoucherSummary summary={data.summary} />

      <VoucherFilterExpand data={data.filter} handler={handler.filter} />

      <VoucherTable ui={ui.table} data={data.table} handler={handler.table} />

      <VoucherForm
        key={selectedVoucher?._id || 'new'}
        voucher={voucherDetail?.voucher}
        open={openVoucherForm}
        onClose={handler.form.handleCloseForm}
        action={action}
        ui={{ ...ui.form }}
        onSubmit={
          action === 'create' ? handleCreateVoucher : handleUpdateVoucher
        }
      />

      <VoucherDetailModal
        ui={ui.modal}
        data={data.modal}
        handler={handler.modal}
      />

      <ReasonModal
        open={openReasonModal}
        onClose={handleCloseModal}
        header={modalProps?.header}
        submitText={modalProps?.submitText}
        submitColor={modalProps?.submitColor}
        onSubmit={modalProps?.onSubmit}
      />
    </Box>
  )
}
export default AdminVoucher
