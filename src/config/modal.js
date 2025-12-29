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

const modalStyle = (width, height) => {
  return {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width,
    height,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    maxHeight: '95vh',
    overflow: 'auto',
    scrollbarWidth: 'none',
    display: 'flex',
    flexDirection: 'column',
    borderRadius: '7px',
    '&:focus-visible': {
      outline: 'none'
    }
  }
}

export { modalConfig, modalStyle }
