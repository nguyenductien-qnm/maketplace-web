import Box from '@mui/material/Box'
import ConfirmModal from '~/components/common/ConfirmModal'
import VoucherHeader from '../components/VoucherList/VoucherHeader'
import VoucherTab from '../components/VoucherList/VoucherTab'
import VoucherDetailModal from '../../_shared/components/VoucherDetailModal'
import NotificationDialog from '../components/VoucherList/NotificationDialog'
import { useShopVoucher } from '../hooks/useShopVoucher'

function VoucherListPage() {
  const { ui, data, handler } = useShopVoucher()

  return (
    <Box>
      <VoucherHeader
        ui={ui.header}
        data={data.filters}
        handler={handler.header}
      />

      <VoucherTab ui={ui.tab} data={data.tab} handler={handler.tab} />

      <VoucherDetailModal
        mode="shop"
        ui={ui.detailModal}
        data={data.detailModal}
        handler={handler.detailModal}
      />

      <NotificationDialog
        ui={ui.reasonDialog}
        data={data.auditLog}
        handler={handler.reasonDialog}
      />

      <ConfirmModal
        open={ui.confirmDialog.isOpen}
        header="Confirm Deletion"
        content="This action cannot be undone! Are you sure you want to permanently delete this voucher?"
        confirmText="Confirm"
        confirmColor="error"
        onClose={handler.confirmDialog.handleCloseConfirmDialog}
        onConfirm={() => {}}
        // onConfirm={handleDeleteVoucher}
      />
    </Box>
  )
}
export default VoucherListPage
