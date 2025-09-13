import Backdrop from '@mui/material/Backdrop'

const modalConfig = {
  'aria-labelledby': 'modal-modal-title',
  closeAfterTransition: true,
  slots: { backdrop: Backdrop },
  slotProps: {
    backdrop: {
      timeout: 500
    }
  }
}

const modalStyle = (width) => {
  return {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    maxHeight: '80vh',
    overflow: 'auto',
    scrollbarWidth: 'none',
    borderRadius: '7px'
  }
}

export { modalConfig, modalStyle }
