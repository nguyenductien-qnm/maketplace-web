import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined'
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined'
import LockOpenIcon from '@mui/icons-material/LockOpen'
import BlockIcon from '@mui/icons-material/Block'
import { renderAvatar, renderDefault } from '~/components/common/common'

function ShopRow({ shop, handleOpenModal, handleApproveShop, SHOP_TABLE_MAP }) {
  const renderDetailButton = () => (
    <Tooltip title="View detail info">
      <Box
        sx={{
          '&:hover': {
            cursor: 'pointer'
          }
        }}
        onClick={() => {
          handleOpenModal({ action: 'detail', shop })
        }}
      >
        <InfoOutlinedIcon />
      </Box>
    </Tooltip>
  )

  const renderActionButton = () => {
    switch (shop?.shop_status) {
      case 'approved':
      case 'paused':
        return (
          <Tooltip title="Ban shop">
            <Button
              className="btn-admin-shop-action"
              color="error"
              variant="outlined"
              onClick={() => handleOpenModal({ action: 'ban', shop })}
            >
              <BlockIcon />
            </Button>
          </Tooltip>
        )

      case 'banned':
        return (
          <Tooltip title="Unban shop">
            <Button
              className="btn-admin-shop-action"
              variant="outlined"
              onClick={() => handleOpenModal({ action: 'unban', shop })}
            >
              <LockOpenIcon />
            </Button>
          </Tooltip>
        )

      case 'pending':
        return (
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'nowrap' }}>
            <Tooltip title="Accept">
              <Button
                className="btn-admin-shop-action"
                color="success"
                variant="outlined"
                onClick={() =>
                  handleApproveShop({
                    _id: shop._id,
                    action: 'approve'
                  })
                }
              >
                <CheckOutlinedIcon />
              </Button>
            </Tooltip>
            <Tooltip title="Reject">
              <Button
                className="btn-admin-shop-action"
                color="error"
                variant="outlined"
                onClick={() => handleOpenModal({ action: 'reject', shop })}
              >
                <ClearOutlinedIcon />
              </Button>
            </Tooltip>
          </Box>
        )

      default:
        return null
    }
  }

  const RENDER_MAP = {
    shop_avatar: renderAvatar,
    detail: renderDetailButton,
    action: renderActionButton
  }

  return (
    <TableRow
      key={shop?._id}
      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    >
      {SHOP_TABLE_MAP?.map(({ key }) => (
        <TableCell align="left" key={key}>
          {RENDER_MAP[key]
            ? RENDER_MAP[key]?.(shop, key)
            : renderDefault(shop, key)}
        </TableCell>
      ))}
    </TableRow>
  )
}

export default ShopRow
