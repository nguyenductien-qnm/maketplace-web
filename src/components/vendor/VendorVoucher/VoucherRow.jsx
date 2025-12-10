import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import ModeOutlinedIcon from '@mui/icons-material/ModeOutlined'
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined'
import capitalizeFirstLetter from '~/utils/capitalizeFirstLetter'
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined'
import { blue, green, red } from '@mui/material/colors'
import { navigate } from '~/helpers/navigation'
import { getVoucherStatus } from '~/utils/voucherStatus'

const imgVoucher = {
  percent:
    'https://deo.shopeemobile.com/shopee/shopee-seller-live-sg/mmf_portal_seller_root_dir/static/modules/vouchers-v2/image/percent-colorful.0e15568.png',
  fixed_amount:
    'https://deo.shopeemobile.com/shopee/shopee-seller-live-sg/mmf_portal_seller_root_dir/static/modules/vouchers-v2/image/dollar-colorful.5e618d0.png'
}

const CONFIG_CHIP = {
  UPCOMING: { label: 'Upcoming', color: '#ff9800' },
  ONGOING: { label: 'Ongoing', color: '#4caf50' },
  EXPIRED: { label: 'Expired', color: '#f44336' }
}

function VoucherRow({ voucher, handleOpenConfirmDialog }) {
  const { voucher_start_date, voucher_end_date } = voucher

  const voucherStatus = getVoucherStatus({
    start: voucher_start_date,
    end: voucher_end_date
  })

  const renderStatusChip = () => {
    return (
      <Chip
        label={CONFIG_CHIP[voucherStatus].label}
        variant="outlined"
        sx={{
          width: '90px',
          borderColor: CONFIG_CHIP[voucherStatus].color,
          color: CONFIG_CHIP[voucherStatus].color,
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
            src={imgVoucher[voucher.voucher_type]}
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
      <TableCell>
        {voucher?.voucher_type === 'fixed_amount' && 'Fixed'}
        {voucher?.voucher_type === 'percent' && 'Percent'}
      </TableCell>
      <TableCell>{voucher?.voucher_value || 'N/A'}</TableCell>
      <TableCell>
        {capitalizeFirstLetter(voucher?.voucher_apply) || 'N/A'}
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

      <TableCell sx={{ height: '100%' }}>
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
          {voucherStatus != 'EXPIRED' && (
            <Tooltip title="Edit this voucher">
              <ModeOutlinedIcon
                onClick={() =>
                  navigate(`/vendor/voucher/update/${voucher._id}`)
                }
                sx={{
                  fontSize: 24,
                  color: green[400],
                  '&:hover': {
                    cursor: 'pointer',
                    color: green[800]
                  }
                }}
              />
            </Tooltip>
          )}

          {voucherStatus == 'EXPIRED' && (
            <Tooltip title="View applied voucher orders">
              <LocalShippingOutlinedIcon
                sx={{
                  fontSize: 24,
                  color: blue[400],
                  '&:hover': {
                    cursor: 'pointer',
                    color: blue[600]
                  }
                }}
              />
            </Tooltip>
          )}

          {voucherStatus == 'COMING' && (
            <Tooltip title="Permanently delete this voucher">
              <HighlightOffOutlinedIcon
                onClick={() => {
                  handleOpenConfirmDialog(voucher)
                }}
                sx={{
                  fontSize: 24,
                  color: red[400],
                  '&:hover': {
                    cursor: 'pointer',
                    color: red[600]
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
