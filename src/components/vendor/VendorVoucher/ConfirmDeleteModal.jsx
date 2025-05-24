import React from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography
} from '@mui/material'

const ConfirmDeleteModal = ({
  open,
  onClose,
  voucherId,
  handleDeleteVoucher,
  title = 'Confirm Deletion',
  message = 'Are you sure you want to delete this item? This action cannot be undone.'
}) => {
  const handleConfirm = async () => {
    const res = await handleDeleteVoucher({ _id: voucherId })
    if (res.status === 200) {
      onClose()
    }
  }
  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <Typography>{message}</Typography>
      </DialogContent>
      <DialogActions>
        <Button
          className="btn-shop-cancel-delete-order"
          onClick={onClose}
          color="secondary"
          variant="outlined"
        >
          Cancel
        </Button>
        <Button
          className="btn-shop-confirm-delete-voucher"
          onClick={handleConfirm}
          color="error"
          variant="contained"
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ConfirmDeleteModal
