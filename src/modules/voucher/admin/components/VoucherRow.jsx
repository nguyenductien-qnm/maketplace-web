import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import Avatar from '@mui/material/Avatar'
import FormControlLabel from '@mui/material/FormControlLabel'
import Typography from '@mui/material/Typography'
import Tooltip from '@mui/material/Tooltip'
import ReplayOutlinedIcon from '@mui/icons-material/ReplayOutlined'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import capitalizeFirstLetter from '~/utils/capitalizeFirstLetter'
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined'
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined'
import ModeOutlinedIcon from '@mui/icons-material/ModeOutlined'
import BlockOutlinedIcon from '@mui/icons-material/BlockOutlined'
import IOSSwitch from '~/components/common/IOSSwitch'
import { getVoucherStatus } from '~/utils/voucherStatus'
import { blue, grey, orange, red } from '@mui/material/colors'
import { VOUCHER_STATUS } from '~/constant/voucherStatus.const'
import { VOUCHER_CREATOR_ROLE_COLOR } from '../constants/voucher.constant'

function VoucherRow({ ui, voucher, handler }) {
  const voucherStatus = getVoucherStatus({
    start: voucher.voucher_start_date,
    end: voucher.voucher_end_date
  })

  const { isPending } = ui

  const creatorRole = voucher.voucher_creator_role

  const creator =
    creatorRole == 'admin' ? voucher.admin_creator : voucher.shop_creator

  const {
    handleOpenDetailModal,
    handleOpenReasonModal,
    handleOpenForm,
    handleToggleVoucher
  } = handler

  const renderChip = (key) => {
    const containedValue = {
      fixed_amount: 'Fixed',
      private: 'Private'
    }
    const outlinedValue = {
      percent: 'Percent',
      public: 'Public'
    }

    const value = voucher?.[key]

    return (
      <Chip
        variant={containedValue[value] ? 'contained' : 'outlined'}
        label={containedValue[value] || outlinedValue[value] || value}
        sx={{ width: '70px' }}
      />
    )
  }

  return (
    <TableRow
      key={voucher._id}
      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    >
      <TableCell>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <Avatar
            sx={{ height: '50px', width: '50px' }}
            src={creator.creator_avatar}
          />
          <Box>
            <Chip
              label={capitalizeFirstLetter(creatorRole)}
              size="small"
              variant="outlined"
              sx={{
                borderColor: VOUCHER_CREATOR_ROLE_COLOR[creatorRole],
                color: VOUCHER_CREATOR_ROLE_COLOR[creatorRole],
                width: '60px',
                mb: 1,
                borderRadius: '5px',
                fontSize: '12px'
              }}
            />
            <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
              {creator.creator_name}
            </Typography>
            <Typography variant="caption" sx={{ color: 'grey' }}>
              {creator.creator_code}
            </Typography>
          </Box>
        </Box>
      </TableCell>
      <TableCell>
        <Chip
          label={VOUCHER_STATUS[voucherStatus].label}
          variant="outlined"
          sx={{
            width: '82px',
            borderColor: VOUCHER_STATUS[voucherStatus].color,
            color: VOUCHER_STATUS[voucherStatus].color,
            backgroundColor: 'transparent',
            height: 25,
            borderRadius: '5px',
            fontWeight: 500,
            mb: 1
          }}
        />
        <Typography
          variant="body2"
          sx={{
            display: '-webkit-box',
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: 3,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            wordBreak: 'break-word',
            fontWeight: 'bold'
          }}
        >
          {voucher?.voucher_name}
        </Typography>
        <Typography variant="caption" sx={{ color: 'grey' }}>
          CODE: {voucher?.voucher_code}
        </Typography>
      </TableCell>
      <TableCell>{renderChip('voucher_type')}</TableCell>
      <TableCell>{renderChip('voucher_visibility')}</TableCell>
      <TableCell>
        <FormControlLabel
          disabled={
            voucher.voucher_creator_role === 'shop' ||
            voucherStatus === 'EXPIRED' ||
            isPending(voucher)
          }
          control={
            <IOSSwitch
              sx={{ m: 1 }}
              checked={voucher.is_enabled}
              onChange={() =>
                handleToggleVoucher({
                  voucher,
                  action: voucher.is_enabled ? 'disable' : 'enable'
                })
              }
            />
          }
        />
      </TableCell>
      <TableCell>
        <Typography variant="body2" sx={{ mb: 1 }}>
          {voucher?.voucher_start_date}
        </Typography>
        <Typography variant="body2">{voucher?.voucher_end_date}</Typography>
      </TableCell>
      <TableCell>{voucher.voucher_quantity}</TableCell>
      <TableCell>{voucher.voucher_reserved_count}</TableCell>
      <TableCell>
        <b>{voucher.voucher_value}</b>
      </TableCell>
      <TableCell>
        <Box
          sx={{
            display: 'flex',
            gap: 1
          }}
        >
          {/* view  */}
          <Tooltip title="View detail this voucher">
            <RemoveRedEyeOutlinedIcon
              onClick={() => {
                handleOpenDetailModal({ voucher })
              }}
              sx={{
                color: grey[500],
                fontSize: 24,
                '&:hover': {
                  cursor: 'pointer',
                  color: grey[800]
                }
              }}
            />
          </Tooltip>

          {/* update  */}
          {voucherStatus != 'EXPIRED' && creatorRole == 'admin' && (
            <Tooltip title="Edit this voucher">
              <ModeOutlinedIcon
                onClick={() => handleOpenForm({ voucherId: voucher._id })}
                sx={{
                  fontSize: 24,
                  color: blue[300],
                  '&:hover': {
                    cursor: 'pointer',
                    color: blue[700]
                  }
                }}
              />
            </Tooltip>
          )}

          {/* delete  */}
          {voucherStatus == 'UPCOMING' && creatorRole == 'admin' && (
            <Tooltip title="Permanently delete this voucher">
              <HighlightOffOutlinedIcon
                onClick={() => {
                  handleOpenConfirmDialog(voucher)
                }}
                sx={{
                  fontSize: 24,
                  color: red[300],
                  '&:hover': {
                    cursor: 'pointer',
                    color: red[700]
                  }
                }}
              />
            </Tooltip>
          )}

          {/* ban  */}
          {voucherStatus != 'EXPIRED' &&
            creatorRole == 'shop' &&
            !voucher.is_banned && (
              <Tooltip title="Ban this voucher">
                <BlockOutlinedIcon
                  onClick={() =>
                    handleOpenReasonModal({ action: 'ban', voucher })
                  }
                  sx={{
                    fontSize: 24,
                    color: orange[500],
                    '&:hover': {
                      cursor: 'pointer',
                      color: orange[900]
                    }
                  }}
                />
              </Tooltip>
            )}

          {/* unban  */}
          {voucherStatus != 'EXPIRED' && voucher.is_banned && (
            <Tooltip title="Unban this voucher">
              <ReplayOutlinedIcon
                sx={{ '&:hover': { cursor: 'pointer' } }}
                color="success"
                onClick={() =>
                  handleOpenReasonModal({ action: 'unban', voucher })
                }
              />
            </Tooltip>
          )}
        </Box>
      </TableCell>
    </TableRow>
  )
}
export default VoucherRow
