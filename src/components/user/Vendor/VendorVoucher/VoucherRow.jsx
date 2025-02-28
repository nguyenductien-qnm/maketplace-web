import { Box, Checkbox, TableCell, TableRow } from '@mui/material'
import ModeOutlinedIcon from '@mui/icons-material/ModeOutlined'
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined'
import { green, red } from '@mui/material/colors'
import { useState } from 'react'
import VoucherModal from './VoucherModal'
import formatDate from '~/utils/formatDate'
import ConfirmDeleteModal from './ConfirmDeleteModal'

function VoucherRow({ voucher, shopUpdateVoucher, shopDeleteVoucher }) {
  const [openModal, setOpenModal] = useState(false)
  const [openDeleteModal, setOpenDeleteModal] = useState(false)

  return (
    <TableRow>
      <TableCell>
        <Checkbox size="small" />
      </TableCell>
      <TableCell>{voucher?.voucher_code || 'N/A'}</TableCell>
      <TableCell sx={{ maxWidth: '200px' }}>
        {voucher?.voucher_name || 'N/A'}
      </TableCell>
      <TableCell>{formatDate(voucher?.voucher_start_date) || 'N/A'}</TableCell>
      <TableCell>{formatDate(voucher?.voucher_end_date) || 'N/A'}</TableCell>
      <TableCell>{voucher?.voucher_quantity || 0}</TableCell>
      <TableCell>{voucher?.voucher_uses_count || 0}</TableCell>
      <TableCell>{voucher?.voucher_type || 'N/A'}</TableCell>
      <TableCell>{voucher?.voucher_value || 0}</TableCell>
      <TableCell sx={{ height: '100%' }}>
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
          <ModeOutlinedIcon
            onClick={() => setOpenModal(true)}
            sx={{
              fontSize: 24,
              color: green[600],
              '&:hover': {
                cursor: 'pointer'
              }
            }}
          />
          <HighlightOffOutlinedIcon
            onClick={() => setOpenDeleteModal(true)}
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
      <ConfirmDeleteModal
        open={openDeleteModal}
        handleClose={() => setOpenDeleteModal(false)}
        shopDeleteVoucher={shopDeleteVoucher}
        _id={voucher._id}
      />
      <VoucherModal
        action="UPDATE"
        open={openModal}
        handleClose={() => setOpenModal(false)}
        voucher={voucher}
        shopUpdateVoucher={shopUpdateVoucher}
      />
    </TableRow>
  )
}

export default VoucherRow
