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
  Typography,
  Box,
  Chip
} from '@mui/material'
import { grey } from '@mui/material/colors'
import TypographyTitle from '~/components/common/TypographyTitle'

function VoucherDialog({
  open,
  onClose,
  info,
  vouchers,
  handleSelectedVouchers
}) {
  const [selectedVoucher, setSelectedVoucher] = useState('')

  const handleVoucherChange = (event) => {
    setSelectedVoucher(event.target.value)
  }

  const handleChooseVoucher = () => {
    if (selectedVoucher) handleSelectedVouchers(selectedVoucher)
    onClose()
  }

  const { ableVouchers = [], unableVouchers = [] } = vouchers || {}

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <TypographyTitle>{info.header}</TypographyTitle>
      </DialogTitle>
      <DialogContent dividers>
        {ableVouchers?.length === 0 ? (
          <Typography variant="body2" color="text.secondary">
            No available vouchers for this shop.
          </Typography>
        ) : (
          <RadioGroup value={selectedVoucher} onChange={handleVoucherChange}>
            {ableVouchers?.map((voucher) => (
              <FormControlLabel
                key={voucher._id}
                value={voucher._id}
                control={<Radio />}
                labelPlacement="start"
                sx={{
                  //   position: 'relative',
                  border: `2px dashed ${grey[300]}`,
                  // p: '15px 20px 15px 5px',
                  // mb: 2,
                  borderRadius: '8px'
                  // alignItems: 'center',
                  // justifyContent: 'start',
                  //   backgroundSize: '100% 100%',
                  //   backgroundPosition: 'left center, right center',
                  //   backgroundRepeat: 'no-repeat'
                }}
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box
                      component="img"
                      src={info.logo}
                      sx={{ height: '60px', borderRadius: '9999px' }}
                    />

                    <Box>
                      <Typography sx={{ fontWeight: 'bold', fontSize: '18px' }}>
                        Save{' '}
                        {voucher.voucher_type === 'percent'
                          ? `${voucher.voucher_value}%`
                          : `$${voucher.voucher_value}`}
                      </Typography>

                      <Typography variant="body2" sx={{ mt: 1 }}>
                        Min order ${voucher.voucher_min_order_value}
                      </Typography>

                      <Chip
                        sx={{
                          mt: 1,
                          color: 'white',
                          backgroundColor: 'primary.main'
                        }}
                        size="small"
                        label={
                          voucher.voucher_apply === 'all'
                            ? 'All products'
                            : 'Specific products'
                        }
                      />

                      <Typography variant="body2" sx={{ mt: 1 }}>
                        Expired: {voucher.voucher_end_date}
                      </Typography>
                    </Box>
                  </Box>
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
