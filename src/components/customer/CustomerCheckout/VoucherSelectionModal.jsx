import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Fade from '@mui/material/Fade'
import Modal from '@mui/material/Modal'
import TypographyTitle from '~/components/common/TypographyTitle'
import { modalConfig, modalStyle } from '~/config/modal'
import { useState } from 'react'
import {
  Chip,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography
} from '@mui/material'
import { grey } from '@mui/material/colors'

function VoucherSelectionModal({
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
    if (selectedVoucher) {
      handleSelectedVouchers({
        shop_id: info.shop_id,
        voucher_code: selectedVoucher
      })
    }
    onClose()
  }

  const { ableVouchers = [], unableVouchers = [] } = vouchers || {}

  return (
    <Modal open={open} onClose={onClose} {...modalConfig}>
      <Fade in={open}>
        <Box sx={modalStyle(650)}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <TypographyTitle>{info.header}</TypographyTitle>
          </Box>

          <Box sx={{ mt: 2, width: '100%' }}>
            {ableVouchers?.length === 0 ? (
              <Typography variant="body2" color="text.secondary">
                No available vouchers for this shop.
              </Typography>
            ) : (
              <RadioGroup
                value={selectedVoucher}
                onChange={handleVoucherChange}
              >
                {ableVouchers?.map((voucher) => (
                  <FormControlLabel
                    key={voucher._id}
                    value={voucher.voucher_code}
                    control={<Radio />}
                    labelPlacement="start"
                    sx={{
                      border: `2px dashed ${grey[300]}`,
                      p: '15px 20px 15px 15px',
                      borderRadius: '8px',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      margin: 0,
                      marginBottom: 2,
                      width: '100%'
                    }}
                    label={
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 2,
                          flex: 1,
                          minWidth: 0
                        }}
                      >
                        <Box
                          component="img"
                          src={info.logo}
                          sx={{
                            height: '60px',
                            width: '60px',
                            borderRadius: '9999px',
                            flexShrink: 0
                          }}
                        />

                        <Box sx={{ flex: 1, minWidth: 0 }}>
                          <Typography
                            sx={{ fontWeight: 'bold', fontSize: '18px' }}
                          >
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
          </Box>

          <Box sx={{ mt: 2, width: '100%' }}>
            {unableVouchers?.length > 0 && (
              <RadioGroup
                value={selectedVoucher}
                onChange={handleVoucherChange}
              >
                {unableVouchers?.map((voucher) => (
                  <FormControlLabel
                    key={voucher._id}
                    value={voucher.voucher_code}
                    control={<Radio />}
                    labelPlacement="start"
                    sx={{
                      border: `2px dashed ${grey[300]}`,
                      p: '15px 20px 15px 15px',
                      borderRadius: '8px',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      margin: 0,
                      marginBottom: 2,
                      width: '100%'
                    }}
                    label={
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 2,
                          flex: 1,
                          minWidth: 0
                        }}
                      >
                        <Box
                          component="img"
                          src={info.logo}
                          sx={{
                            height: '60px',
                            width: '60px',
                            borderRadius: '9999px',
                            flexShrink: 0
                          }}
                        />

                        <Box sx={{ flex: 1, minWidth: 0 }}>
                          <Typography
                            sx={{ fontWeight: 'bold', fontSize: '18px' }}
                          >
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
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'end', gap: 1, mt: 2 }}>
            <Button color="secondary" variant="outlined" onClick={onClose}>
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={handleChooseVoucher}
              disabled={!selectedVoucher}
            >
              Confirm
            </Button>
          </Box>
        </Box>
      </Fade>
    </Modal>
  )
}
export default VoucherSelectionModal
