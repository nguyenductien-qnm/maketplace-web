import Box from '@mui/material/Box'
import ReasonModal from '../components/ReasonModal'
import VoucherDetailModal from '../components/VoucherDetailModal'
import VoucherFilter from '../components/VoucherFilter'
import VoucherForm from '../components/VoucherForm'
import VoucherHeader from '../components/VoucherHeader'
import VoucherTable from '../components/VoucherTable'
import VoucherSummary from '../components/VoucherSummary'
import { useAdminVoucher } from '~/modules/voucher/admin/hooks/useAdminVoucher'

function VoucherList() {
  const { ui, data, handler } = useAdminVoucher()

  return (
    <Box>
      <VoucherHeader ui={ui.header} handler={handler.header} />

      <VoucherSummary ui={ui.summary} summary={data.summary} />

      <VoucherFilter
        ui={ui.filter}
        data={data.filters}
        handler={handler.filter}
      />

      <VoucherTable ui={ui.table} data={data.table} handler={handler.table} />

      <VoucherForm ui={ui.form} data={data.form} handler={handler.form} />

      <VoucherDetailModal
        ui={ui.detailModal}
        data={data.detailModal}
        handler={handler.detailModal}
      />

      <ReasonModal ui={ui.reasonModal} handler={handler.reasonModal} />
    </Box>
  )
}
export default VoucherList
