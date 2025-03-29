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
  handleClose,
  _id,
  shopDeleteVoucher,
  title = 'Confirm Deletion',
  message = 'Are you sure you want to delete this item? This action cannot be undone.'
}) => {
  const handleConfirm = async () => {
    const res = await shopDeleteVoucher({ _id })
    if (res.status === 200) {
      handleClose()
    }
  }
  return (
    <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <Typography>{message}</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary" variant="outlined">
          Cancel
        </Button>
        <Button onClick={handleConfirm} color="error" variant="contained">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ConfirmDeleteModal
