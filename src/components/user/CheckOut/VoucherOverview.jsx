import React, { useState } from 'react'
import { Box, Divider, Typography } from '@mui/material'
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined'
import VoucherDialog from './VoucherDialog'

function VoucherOverview({ content, vouchers, handleSelectedVouchers }) {
  const [open, setOpen] = useState(false)

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <Box sx={{ display: 'flex', gap: '10px', flexDirection: 'column' }}>
      <Divider />
      <Box
        sx={{
          padding: '20px 16px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <Box sx={{ display: 'flex', gap: '10px' }}>
          <LocalOfferOutlinedIcon />
          <Typography>{content}</Typography>
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

      <VoucherDialog
        open={open}
        onClose={handleClose}
        vouchers={vouchers}
        handleSelectedVouchers={handleSelectedVouchers}
      />
    </Box>
  )
}

export default VoucherOverview
