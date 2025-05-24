import { Box, TableCell, TableRow } from '@mui/material'
import ModeOutlinedIcon from '@mui/icons-material/ModeOutlined'
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined'
import { green, red } from '@mui/material/colors'

function VoucherRow({
  voucher,
  setAction,
  setOpenModal,
  setSelectedVoucher,
  setOpenDelModal
}) {
  return (
    <TableRow>
      <TableCell
        sx={{
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          maxWidth: 150
        }}
      >
        {voucher?.voucher_code || 'N/A'}
      </TableCell>
      <TableCell
        sx={{
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          maxWidth: 150
        }}
      >
        {voucher?.voucher_name || 'N/A'}
      </TableCell>
      <TableCell>{voucher?.voucher_start_date || 'N/A'}</TableCell>
      <TableCell>{voucher?.voucher_end_date || 'N/A'}</TableCell>
      <TableCell>{voucher?.voucher_quantity || 0}</TableCell>
      <TableCell>{voucher?.voucher_uses_count || 0}</TableCell>
      <TableCell>
        {voucher?.voucher_type === 'fixed_amount' && 'Fixed'}
        {voucher?.voucher_type === 'percent' && 'Percent'}
      </TableCell>
      <TableCell>{voucher?.voucher_value || 0}</TableCell>
      <TableCell sx={{ height: '100%' }}>
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
          <ModeOutlinedIcon
            onClick={() => {
              setSelectedVoucher(voucher)
              setAction('UPDATE')
              setOpenModal(true)
            }}
            sx={{
              fontSize: 24,
              color: green[600],
              '&:hover': {
                cursor: 'pointer'
              }
            }}
          />
          <HighlightOffOutlinedIcon
            onClick={() => {
              setSelectedVoucher(voucher)
              setOpenDelModal(true)
            }}
            sx={{
              fontSize: 24,
              color: red[600],
              '&:hover': {
                cursor: 'pointer'
              }
            }}
          />
        </Box>
      </TableCell>
    </TableRow>
  )
}

export default VoucherRow
