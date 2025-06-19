import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import Button from '@mui/material/Button'
import TypographyLabel from '~/components/common/TypographyLabel'
import { Box, TextField } from '@mui/material'
import CircularIndeterminate from '~/components/common/CircularIndeterminate'

function VoucherDetailModal({ open, onClose, voucher }) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Voucher Detail</DialogTitle>
      <DialogContent>
        {!voucher && (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              mt: 5
            }}
          >
            <CircularIndeterminate />
          </Box>
        )}

        {voucher && (
          <Box>
            <Box sx={{ display: 'flex', gap: 2, mt: 1 }}>
              <Box sx={{ flex: 1 }}>
                <TypographyLabel>CODE</TypographyLabel>
                <TextField
                  size="small"
                  value={voucher?.voucher_code}
                  disabled
                  fullWidth
                />
              </Box>

              <Box sx={{ flex: 1 }}>
                <TypographyLabel>Name</TypographyLabel>
                <TextField
                  size="small"
                  value={voucher?.voucher_name}
                  disabled
                  fullWidth
                />
              </Box>

              <Box sx={{ flex: 1 }}>
                <TypographyLabel>Creator role</TypographyLabel>
                <TextField
                  size="small"
                  value={voucher?.voucher_creator_role}
                  disabled
                  fullWidth
                />
              </Box>
            </Box>

            <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
              <Box sx={{ flex: 1 }}>
                <TypographyLabel>Type</TypographyLabel>
                <TextField
                  size="small"
                  value={voucher?.voucher_type}
                  disabled
                  fullWidth
                />
              </Box>

              <Box sx={{ flex: 1 }}>
                <TypographyLabel>Value</TypographyLabel>
                <TextField
                  size="small"
                  value={voucher?.voucher_value}
                  disabled
                  fullWidth
                />
              </Box>

              <Box sx={{ flex: 1 }}>
                <TypographyLabel>Min order value</TypographyLabel>
                <TextField
                  size="small"
                  value={voucher?.voucher_min_order_value}
                  disabled
                  fullWidth
                />
              </Box>
            </Box>

            <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
              <Box sx={{ flex: 1 }}>
                <TypographyLabel>Start date</TypographyLabel>
                <TextField
                  size="small"
                  value={voucher?.voucher_start_date}
                  disabled
                  fullWidth
                />
              </Box>

              <Box sx={{ flex: 1 }}>
                <TypographyLabel>End date</TypographyLabel>
                <TextField
                  size="small"
                  value={voucher?.voucher_end_date}
                  disabled
                  fullWidth
                />
              </Box>

              <Box sx={{ flex: 1 }}>
                <TypographyLabel>Created at</TypographyLabel>
                <TextField
                  size="small"
                  value={voucher?.createdAt}
                  disabled
                  fullWidth
                />
              </Box>
            </Box>

            <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
              <Box sx={{ flex: 1 }}>
                <TypographyLabel>Quantity</TypographyLabel>
                <TextField
                  size="small"
                  value={voucher?.voucher_quantity}
                  disabled
                  fullWidth
                />
              </Box>

              <Box sx={{ flex: 1 }}>
                <TypographyLabel>Reserved</TypographyLabel>
                <TextField
                  size="small"
                  value={voucher?.voucher_reserved}
                  disabled
                  fullWidth
                />
              </Box>

              <Box sx={{ flex: 1 }}>
                <TypographyLabel>Uses count</TypographyLabel>
                <TextField
                  size="small"
                  value={voucher?.voucher_uses_count}
                  disabled
                  fullWidth
                />
              </Box>
            </Box>

            <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
              <Box sx={{ flex: 1 }}>
                <TypographyLabel>Applies</TypographyLabel>
                <TextField
                  size="small"
                  value={voucher?.voucher_applies}
                  disabled
                  fullWidth
                />
              </Box>

              <Box sx={{ flex: 1 }}>
                <TypographyLabel>Status</TypographyLabel>
                <TextField
                  size="small"
                  value={voucher?.voucher_status}
                  disabled
                  fullWidth
                />
              </Box>
            </Box>
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="outlined" color="secondary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default VoucherDetailModal
