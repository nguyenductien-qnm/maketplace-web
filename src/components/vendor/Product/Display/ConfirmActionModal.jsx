import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Typography
} from '@mui/material'
import {
  softDeleteProductAPI,
  deletePermanentProductAPI,
  restoreProductAPI
} from '~/api/product.api'
import { useState } from 'react'

const actionMessages = {
  softDelete: {
    title: 'Confirm Temporary Deletion',
    message:
      'Are you sure you want to temporarily delete this product? You can restore it within 15 days.',
    confirmText: 'Soft Delete',
    confirmColor: 'warning',
    apiCall: (_id) => softDeleteProductAPI(_id)
  },
  permanentDelete: {
    title: 'Confirm Permanent Deletion',
    message:
      'This action cannot be undone! Are you sure you want to permanently delete this product?',
    confirmText: 'Delete Permanently',
    confirmColor: 'error',
    apiCall: (_id) => deletePermanentProductAPI(_id)
  },
  restore: {
    title: 'Confirm Restore',
    message: 'Are you sure you want to restore this product?',
    confirmText: 'Restore',
    confirmColor: 'primary',
    apiCall: (_id) => restoreProductAPI(_id)
  }
}

function ConfirmActionModal({
  open,
  onClose,
  productId,
  actionType = 'softDelete',
  handleProductAction
}) {
  const [loading, setLoading] = useState(false)
  const { title, message, confirmText, confirmColor, apiCall } =
    actionMessages[actionType] || actionMessages.softDelete

  const handleConfirm = async () => {
    if (!productId) return
    setLoading(true)
    try {
      await apiCall(productId)
      handleProductAction(productId, actionType)
      onClose()
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <Typography>{message}</Typography>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={onClose}
          variant="outlined"
          color="secondary"
          disabled={loading}
        >
          Cancel
        </Button>
        <Button
          onClick={handleConfirm}
          variant="contained"
          color={confirmColor}
          disabled={loading}
        >
          {loading ? 'Processing...' : confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ConfirmActionModal
