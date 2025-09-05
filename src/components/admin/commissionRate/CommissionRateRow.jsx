import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import { renderDefault } from '~/components/common/common'

function CommissionRateRow({
  commissionRate,
  categoriesRoot,
  handleOpenModal,
  COMMISSION_RATE_TABLE_MAP
}) {
  const findCategoryName = (code) => {
    const category = categoriesRoot?.find((c) => c?.category_code == code)
    return category?.category_name || ''
  }

  const toPercentage = (value) => {
    if (value == null) return '—'
    return `${(value * 100).toFixed(0)}%`
  }

  const renderCategoryName = (key) => {
    return findCategoryName(commissionRate?.[key])
  }

  const renderNumber = (key) => (
    <>
      {commissionRate?.[key]} ~ <b>({toPercentage(commissionRate?.[key])})</b>
    </>
  )

  const renderDetailButton = () => (
    <Tooltip title="Update commission rate">
      <Button
        variant="outlined"
        color="info"
        onClick={() =>
          handleOpenModal({
            action: 'update',
            commissionRate
          })
        }
      >
        <EditOutlinedIcon />
      </Button>
    </Tooltip>
  )

  const RENDER_MAP = {
    category_code: renderCategoryName,
    refund_rate_auto: renderNumber,
    refund_rate_manual: renderNumber,
    user_name: renderDefault,
    action: renderDetailButton
  }

  return (
    <TableRow
      key={commissionRate?._id}
      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    >
      {COMMISSION_RATE_TABLE_MAP?.map(({ key }) => (
        <TableCell key={key} align="left">
          {RENDER_MAP[key]
            ? RENDER_MAP[key]?.(key)
            : renderDefault(commissionRate, key)}
        </TableCell>
      ))}
    </TableRow>
  )
}
export default CommissionRateRow
