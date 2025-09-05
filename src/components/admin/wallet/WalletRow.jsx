import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Tooltip from '@mui/material/Tooltip'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import formatCurrency from '~/utils/formatCurrency'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import {
  renderDefault,
  renderAmount,
  renderAvatar
} from '~/components/common/common'

function WalletRow({ wallet, WALLET_TABLE_MAP }) {
  const renderRecentTransButton = () => (
    <Tooltip title="View recent transactions">
      <Box
        sx={{
          '&:hover': {
            cursor: 'pointer'
          }
        }}
        onClick={() => handleOpenModal({ wallet })}
      >
        <InfoOutlinedIcon />
      </Box>
    </Tooltip>
  )

  const RENDER_MAP = {
    'shop_id?.shop_avatar': renderAvatar,
    'user_id?.user_avatar': renderAvatar,
    shop_balance: renderAmount,
    user_balance: renderAmount,
    detail: renderRecentTransButton
  }

  return (
    <TableRow
      key={wallet?._id}
      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    >
      {WALLET_TABLE_MAP?.map(({ key }) => (
        <TableCell align="left" key={key}>
          {RENDER_MAP?.[key]
            ? RENDER_MAP[key]?.(wallet, key)
            : renderDefault(wallet, key)}
        </TableCell>
      ))}
    </TableRow>
  )
}
export default WalletRow
