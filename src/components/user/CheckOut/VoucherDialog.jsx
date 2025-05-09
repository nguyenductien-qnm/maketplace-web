import React from 'react'
import { useState } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  Typography
} from '@mui/material'
import { grey } from '@mui/material/colors'

const VoucherDialog = ({ open, onClose, vouchers, handleSelectedVouchers }) => {
  const [selectedVoucher, setSelectedVoucher] = useState('')

  const handleVoucherChange = (event) => {
    setSelectedVoucher(event.target.value)
  }

  const handleChooseVoucher = () => {
    if (selectedVoucher) handleSelectedVouchers(selectedVoucher)
    onClose()
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Select Voucher</DialogTitle>
      <DialogContent dividers>
        {vouchers?.length === 0 ? (
          <Typography variant="body2" color="text.secondary">
            No available vouchers for this shop.
          </Typography>
        ) : (
          <RadioGroup value={selectedVoucher} onChange={handleVoucherChange}>
            {vouchers?.map((voucher) => (
              <FormControlLabel
                key={voucher._id}
                value={voucher._id}
                control={<Radio />}
                label={
                  <div>
                    <Typography fontWeight={500}>
                      {voucher.voucher_name}
                    </Typography>
                    <Typography variant="body2" sx={{ color: grey[600] }}>
                      Save{' '}
                      {voucher.voucher_type === 'percent'
                        ? `${voucher.voucher_value}%`
                        : `$${voucher.voucher_value}`}
                      (Min. order ${voucher.voucher_min_order_value})<br />
                      Valid from {voucher.voucher_start_date} to{' '}
                      {voucher.voucher_end_date}
                    </Typography>
                  </div>
                }
              />
            ))}
          </RadioGroup>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          onClick={handleChooseVoucher}
          variant="contained"
          disabled={!selectedVoucher}
        >
          Apply
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default VoucherDialog
