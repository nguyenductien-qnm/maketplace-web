import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Grid2,
  Typography,
  TextField,
  Button
} from '@mui/material'

const VoucherDetailModal = ({ open, handleClose }) => {
  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>Detail Voucher</DialogTitle>
      <DialogContent>
        <Box sx={{ mt: 2 }}>
          <Grid2 container spacing={2}>
            <Grid2 size={6}>
              <Typography variant="body2">CODE Voucher</Typography>
              <TextField size="small" fullWidth />
            </Grid2>

            <Grid2 size={6}>
              <Typography variant="body2">Voucher Name</Typography>
              <TextField size="small" fullWidth />
            </Grid2>

            <Grid2 size={6}>
              <Typography variant="body2">Voucher Type</Typography>
              <TextField size="small" fullWidth />
            </Grid2>

            <Grid2 size={6}>
              <Typography variant="body2">Voucher Value</Typography>
              <TextField type="number" size="small" fullWidth />
            </Grid2>

            <Grid2 size={6}>
              <Typography variant="body2">Voucher Start Date & Time</Typography>
              <TextField type="datetime-local" size="small" fullWidth />
            </Grid2>

            <Grid2 size={6}>
              <Typography variant="body2">Voucher End Date & Time</Typography>
              <TextField type="datetime-local" size="small" fullWidth />
            </Grid2>

            <Grid2 size={6}>
              <Typography variant="body2">Voucher Quantity</Typography>
              <TextField type="number" size="small" fullWidth />
            </Grid2>

            <Grid2 size={6}>
              <Typography variant="body2">Voucher Min Order Value</Typography>
              <TextField type="number" size="small" />
            </Grid2>

            <Grid2 size={12}>
              <Typography variant="body2">Voucher Applies</Typography>
              <TextField size="small" fullWidth />
            </Grid2>
          </Grid2>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default VoucherDetailModal
