import { Box, Button, Modal, Typography } from '@mui/material'

function ConfirmModal({
  header,
  content,
  open,
  onClose,
  onConfirm,
  confirmText = 'Confirm'
}) {
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #fff',
    borderRadius: '5px',
    boxShadow: 24,
    p: 4
  }
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {header}
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          {content}
        </Typography>

        <Box
          sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3, gap: 1 }}
        >
          <Button
            className="btn-close-confirm-modal"
            variant="contained"
            sx={{
              backgroundColor: 'gray',
              color: 'white',
              ':hover': { backgroundColor: 'darkgray' }
            }}
            onClick={onClose}
          >
            Close
          </Button>
          <Button
            className="btn-confirm-modal"
            variant="contained"
            color="error"
            onClick={onConfirm}
          >
            {confirmText}
          </Button>
        </Box>
      </Box>
    </Modal>
  )
}

export default ConfirmModal
