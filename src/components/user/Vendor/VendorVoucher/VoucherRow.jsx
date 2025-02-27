import { Box, Checkbox, TableCell, TableRow } from '@mui/material'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import ModeOutlinedIcon from '@mui/icons-material/ModeOutlined'
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined'
import { blue, green, red } from '@mui/material/colors'
import { useState } from 'react'
import VoucherDetailModal from './VoucherDetailModal'
import VoucherModal from './VoucherModal'

function VoucherRow({ voucherData }) {
  const [openModal, setOpenModal] = useState(false)
  const [openModalDetail, setOpenModalDetail] = useState(false)
  const [selectedVoucher, setSelectedVoucher] = useState(null)

  const handleOpenEditModal = () => {
    setSelectedVoucher(voucherData)
    setOpenModal(true)
  }

  const handleCloseModal = () => {
    setOpenModal(false)
    setSelectedVoucher(null)
  }

  const handleCloseModalDetail = () => setOpenModalDetail(false)

  return (
    <TableRow>
      <TableCell>
        <Checkbox size="small" />
      </TableCell>
      <TableCell>{voucherData?.voucher_code || 'N/A'}</TableCell>
      <TableCell sx={{ maxWidth: '200px' }}>
        {voucherData?.voucher_name || 'N/A'}
      </TableCell>
      <TableCell>{voucherData?.start_date || 'N/A'}</TableCell>
      <TableCell>{voucherData?.end_date || 'N/A'}</TableCell>
      <TableCell>{voucherData?.quantity || 0}</TableCell>
      <TableCell>{voucherData?.voucher_type || 'N/A'}</TableCell>
      <TableCell>{voucherData?.discount_value || 0}</TableCell>
      <TableCell sx={{ height: '100%' }}>
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
          <ModeOutlinedIcon
            onClick={handleOpenEditModal}
            sx={{
              fontSize: 24,
              color: green[600],
              '&:hover': {
                cursor: 'pointer'
              }
            }}
          />
          <InfoOutlinedIcon
            onClick={() => setOpenModalDetail(true)}
            sx={{
              fontSize: 24,
              color: blue[600],
              '&:hover': {
                cursor: 'pointer'
              }
            }}
          />
          <HighlightOffOutlinedIcon
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

      <VoucherDetailModal
        open={openModalDetail}
        handleClose={handleCloseModalDetail}
      />

      <VoucherModal
        action="UPDATE"
        open={openModal}
        handleClose={handleCloseModal}
        voucherData={selectedVoucher}
      />
    </TableRow>
  )
}

export default VoucherRow
