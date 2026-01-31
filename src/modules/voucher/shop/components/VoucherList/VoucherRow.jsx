import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import ModeOutlinedIcon from '@mui/icons-material/ModeOutlined'
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined'
import ReportOutlinedIcon from '@mui/icons-material/ReportOutlined'
import IOSSwitch from '~/components/common/IOSSwitch'
import DataUsageIcon from '@mui/icons-material/DataUsage'
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined'
import formatCurrency from '~/utils/formatCurrency'
import capitalizeFirstLetter from '~/utils/capitalizeFirstLetter'
import FormControlLabel from '@mui/material/FormControlLabel'
import { blue, green, grey, red } from '@mui/material/colors'
import { navigate } from '~/helpers/navigation'
import { getVoucherStatus } from '~/utils/voucherStatus'
import {
  VOUCHER_STATUS_CHIP_CONFIG,
  VOUCHER_TYPE_IMAGE_MAP
} from '../../constants/voucher.constant'

function VoucherRow({ voucher, ui, handler }) {
  const { isPending } = ui

  const {
    handleOpenDetailModal,
    handleToggleVoucher,
    handleOpenConfirmDialog,
    handleOpenReasonDialog
  } = handler

  const voucherStatus = getVoucherStatus({
    start: voucher.voucher_start_date,
    end: voucher.voucher_end_date
  })

  const renderStatusChip = () => {
    return (
      <Chip
        label={VOUCHER_STATUS_CHIP_CONFIG[voucherStatus].label}
        variant="outlined"
        sx={{
          width: '90px',
          borderColor: VOUCHER_STATUS_CHIP_CONFIG[voucherStatus].color,
          color: VOUCHER_STATUS_CHIP_CONFIG[voucherStatus].color,
          backgroundColor: 'transparent',
          height: 25,
          borderRadius: '5px',
          fontWeight: 500,
          mb: '5px'
        }}
      />
    )
  }

  return (
    <TableRow>
      <TableCell
        sx={{ minWidth: '100px', maxWidth: '250px', overflow: 'hidden' }}
      >
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <img
            style={{ width: '70px', height: '70px' }}
            src={VOUCHER_TYPE_IMAGE_MAP[voucher.voucher_type]}
          />

          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            {renderStatusChip()}

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
              {voucher?.voucher_name || 'N/A'}
            </Typography>
            <Typography variant="caption" sx={{ color: 'grey' }}>
              CODE: {voucher?.voucher_code || 'N/A'}
            </Typography>
          </Box>
        </Box>
      </TableCell>

      <TableCell>{capitalizeFirstLetter(voucher?.voucher_apply)}</TableCell>

      <TableCell>
        <b>
          {voucher?.voucher_type == 'percent'
            ? `${voucher?.voucher_value}%`
            : formatCurrency(voucher?.voucher_value)}
        </b>
      </TableCell>

      <TableCell>{voucher?.voucher_quantity || 0}</TableCell>

      <TableCell>
        {voucher?.voucher_used_count + voucher.voucher_reserved_count || 0}
      </TableCell>

      <TableCell>
        {voucher.voucher_start_date}
        <br />
        {voucher.voucher_end_date}
      </TableCell>

      <TableCell>
        <FormControlLabel
          disabled={
            voucherStatus === 'EXPIRED' ||
            isPending(voucher) ||
            voucher.is_banned
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
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
          <Tooltip title="View detail this voucher">
            <RemoveRedEyeOutlinedIcon
              onClick={() => handleOpenDetailModal({ voucher })}
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

          {voucherStatus != 'EXPIRED' && !voucher.is_banned && (
            <Tooltip title="Edit this voucher">
              <ModeOutlinedIcon
                onClick={() =>
                  navigate(`/vendor/voucher/update/${voucher._id}`)
                }
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

          {voucherStatus == 'EXPIRED' && (
            <Tooltip title="View applied voucher orders">
              <DataUsageIcon
                sx={{
                  fontSize: 24,
                  color: green[400],
                  '&:hover': {
                    cursor: 'pointer',
                    color: green[600]
                  }
                }}
              />
            </Tooltip>
          )}

          {voucherStatus == 'UPCOMING' && (
            <Tooltip title="Permanently delete this voucher">
              <HighlightOffOutlinedIcon
                onClick={() => {
                  handleOpenConfirmDialog({ voucher })
                }}
                sx={{
                  fontSize: 24,
                  color: red[400],
                  '&:hover': {
                    cursor: 'pointer',
                    color: red[700]
                  }
                }}
              />
            </Tooltip>
          )}

          {voucher.is_banned && (
            <Tooltip title="View ban reason">
              <ReportOutlinedIcon
                onClick={() => handleOpenReasonDialog({ voucher })}
                color="warning"
                sx={{
                  fontSize: 24,
                  '&:hover': {
                    cursor: 'pointer',
                    color: '#d84315'
                  }
                }}
              />
            </Tooltip>
          )}
        </Box>
      </TableCell>
    </TableRow>
  )
}

export default VoucherRow
