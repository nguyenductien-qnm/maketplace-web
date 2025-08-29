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

function ShopRow({ shop, handleOpenModal, handleApproveShop }) {
  return (
    <TableRow
      key={shop?._id}
      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    >
      <TableCell component="th" scope="row">
        <Avatar src={shop?.shop_avatar} />
      </TableCell>
      <TableCell align="left">{shop?.shop_name}</TableCell>
      <TableCell align="left">{shop?.shop_email}</TableCell>
      <TableCell align="left">{shop?.shop_phone}</TableCell>
      <TableCell align="left">{shop?.shop_product_count}</TableCell>
      <TableCell align="left">{shop?.shop_follower_count}</TableCell>
      <TableCell align="left">{shop?.shop_rating}</TableCell>
      <TableCell align="left">
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
      </TableCell>
      <TableCell align="left">
        {(shop?.shop_status === 'approved' ||
          shop?.shop_status === 'paused') && (
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
        )}

        {shop?.shop_status === 'banned' && (
          <Tooltip title="Unban shop">
            <Button
              className="btn-admin-shop-action"
              variant="outlined"
              onClick={() => handleOpenModal({ action: 'unban', shop })}
            >
              <LockOpenIcon />
            </Button>
          </Tooltip>
        )}

        {shop?.shop_status === 'pending' && (
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
        )}
      </TableCell>
    </TableRow>
  )
}

export default ShopRow
