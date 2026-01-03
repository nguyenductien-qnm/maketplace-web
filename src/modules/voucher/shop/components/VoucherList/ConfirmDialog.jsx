import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

function ConfirmDialog({ ui, handler }) {
  const { isOpen, isSubmitting, header, content, confirmText, confirmColor } =
    ui
  const { handleClose, handleConfirm } = handler

  return (
    <Dialog open={isOpen} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>{header}</DialogTitle>
      <DialogContent>
        <Typography>{content}</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant="outlined" color="secondary">
          Cancel
        </Button>
        <Button
          loading={isSubmitting}
          className="btn-confirm-modal"
          onClick={handleConfirm}
          variant="contained"
          color={confirmColor}
        >
          {confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ConfirmDialog
