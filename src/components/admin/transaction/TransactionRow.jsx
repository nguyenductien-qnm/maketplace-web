import Box from '@mui/material/Box'
import Tooltip from '@mui/material/Tooltip'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'

import {
  renderDefault,
  renderAmount,
  renderAvatar,
  renderCapitalizeFirstLetter
} from '~/components/common/common'

function TransactionRow({
  transaction,
  handleOpenModal,
  TRANSACTION_TABLE_MAP
}) {
  const renderDetailButton = () => (
    <Tooltip title="View recent transactions">
      <Box
        sx={{
          '&:hover': {
            cursor: 'pointer'
          }
        }}
        onClick={() => handleOpenModal({ transaction })}
      >
        <InfoOutlinedIcon />
      </Box>
    </Tooltip>
  )

  const RENDER_MAP = {
    'shop_id?.shop_avatar': renderAvatar,
    'user_id?.user_avatar': renderAvatar,
    amount: renderAmount,
    type: renderCapitalizeFirstLetter,
    status: renderCapitalizeFirstLetter,
    detail: renderDetailButton
  }

  return (
    <TableRow
      key={transaction?._id}
      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    >
      {TRANSACTION_TABLE_MAP?.map(({ key }) => (
        <TableCell key={key} align="left">
          {RENDER_MAP?.[key]
            ? RENDER_MAP[key]?.(transaction, key)
            : renderDefault(transaction, key)}
        </TableCell>
      ))}
    </TableRow>
  )
}
export default TransactionRow
