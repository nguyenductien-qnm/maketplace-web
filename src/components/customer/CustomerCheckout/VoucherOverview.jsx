import React, { useState } from 'react'
import { Box, Typography } from '@mui/material'
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined'
import VoucherSelectionModal from './VoucherSelectionModal'

function VoucherOverview({ content, info, vouchers, handleSelectedVouchers }) {
  const [open, setOpen] = useState(false)

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <Box>
      <Box
        sx={{
          padding: '40px 16px 20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <Box sx={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
          <LocalOfferOutlinedIcon />
          <Typography sx={{ fontSize: '18px' }}>{content}</Typography>
        </Box>

        <Box>
          <Typography
            color="primary"
            sx={{ '&:hover': { cursor: 'pointer', fontWeight: 'bold' } }}
            onClick={handleOpen}
          >
            Select Voucher
          </Typography>
        </Box>
      </Box>

      <VoucherSelectionModal
        open={open}
        onClose={handleClose}
        info={info}
        vouchers={vouchers}
        handleSelectedVouchers={handleSelectedVouchers}
      />
    </Box>
  )
}

export default VoucherOverview
