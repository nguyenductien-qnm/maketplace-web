import Box from '@mui/material/Box'
import VoucherHeader from '../components/VoucherList/VoucherHeader'
import VoucherTab from '../components/VoucherList/VoucherTab'
import VoucherDetailModal from '../../_shared/components/VoucherDetailModal'
import NotificationDialog from '../components/VoucherList/NotificationDialog'
import ConfirmDialog from '../components/VoucherList/ConfirmDialog'
import { useShopVoucher } from '../hooks/useShopVoucher'

function VoucherListPage() {
  const { ui, data, handler } = useShopVoucher()

  return (
    <Box>
      <VoucherHeader
        ui={ui.header}
        data={data.filter}
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

      <ConfirmDialog ui={ui.confirmDialog} handler={handler.confirmDialog} />
    </Box>
  )
}
export default VoucherListPage
