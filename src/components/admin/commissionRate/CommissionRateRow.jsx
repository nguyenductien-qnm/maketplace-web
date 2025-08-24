import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import { TableCell, TableRow } from '@mui/material'

function CommissionRateRow({
  commissionRate,
  categoriesRoot,
  handleOpenModal
}) {
  const findCategoryName = (code) => {
    const category = categoriesRoot?.find((c) => c?.category_code == code)
    return category?.category_name || ''
  }

  const toPercentage = (value) => {
    return `${(value * 100).toFixed(0)}%`
  }

  return (
    <TableRow
      key={commissionRate?._id}
      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    >
      <TableCell align="left">
        {findCategoryName(commissionRate?.category_code)}
      </TableCell>
      <TableCell align="left">
        {commissionRate?.refund_rate_auto} ~{' '}
        <b>({toPercentage(commissionRate?.refund_rate_auto)})</b>
      </TableCell>
      <TableCell align="left">
        {commissionRate?.refund_rate_manual} ~{' '}
        <b>({toPercentage(commissionRate?.refund_rate_manual)})</b>
      </TableCell>
      <TableCell align="left">
        {commissionRate?.creator_id?.user_name}
      </TableCell>
      <TableCell align="left">{commissionRate?.createdAt}</TableCell>
      <TableCell align="left">{commissionRate?.updatedAt}</TableCell>
      <TableCell align="left">
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
      </TableCell>
    </TableRow>
  )
}
export default CommissionRateRow
