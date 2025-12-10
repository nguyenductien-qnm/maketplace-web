import { Box } from '@mui/material'
import Paper from '@mui/material/Paper'
import ReasonModal from '~/components/admin/ReasonModal'
import VoucherDetailModal from '~/components/admin/voucher/VoucherDetailModal'
import VoucherFilterExpand from '~/components/admin/voucher/VoucherFilter'
// import VoucherForm from '~/components/admin/voucher/VoucherForm'
import VoucherForm from '~/components/admin/voucher/VoucherForm'
import VoucherHeader from '~/components/admin/voucher/VoucherHeader'
import VoucherTable from '~/components/admin/voucher/VoucherTable'
import VoucherSummary from '~/components/admin/voucher/VoucherSummary'
import { useAdminVoucher } from '~/hooks/admin/voucher.hook'

function AdminVoucher() {
  const { ui, data, handler } = useAdminVoucher()
  const { selectedVoucher, action } = ui
  const { openVoucherForm } = ui.form
  const { handleCreateVoucher, handleUpdateVoucher } = handler

  return (
    <Box>
      <VoucherHeader ui={{ ...ui.header }} handler={{ ...handler.header }} />

      <VoucherSummary />

      <VoucherFilterExpand
        data={{ ...data.filter }}
        handler={{ ...handler.filter }}
      />

      <VoucherTable
        ui={{ ...ui.table }}
        data={{ ...data.table }}
        handler={{ ...handler.table }}
      />

      <VoucherForm
        key={selectedVoucher?._id || 'new'}
        voucher={selectedVoucher}
        mode="admin"
        open={openVoucherForm}
        onclose={handler.form.handleCloseForm}
        action={action}
        onSubmit={
          action === 'create' ? handleCreateVoucher : handleUpdateVoucher
        }
      />

      {/* <VoucherDetailModal
        open={openDetailModal}
        onClose={handleCloseModal}
        voucher={voucherDetail}
      /> */}

      {/* <ReasonModal
        open={openReasonModal}
        onClose={handleCloseModal}
        header={modalProps?.header}
        submitText={modalProps?.submitText}
        submitColor={modalProps?.submitColor}
        onSubmit={modalProps?.onSubmit}
      /> */}
    </Box>
  )
}
export default AdminVoucher
