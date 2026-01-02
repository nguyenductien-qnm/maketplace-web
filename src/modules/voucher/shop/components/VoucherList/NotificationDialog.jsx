import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import Markdown from 'react-markdown'
import CircularIndeterminate from '~/components/common/CircularIndeterminate'

function NotificationDialog({ ui, data, handler }) {
  const { isLoading, isOpen, title } = ui
  const { handleClose } = handler
  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      PaperProps={{
        sx: {
          width: 600,
          height: '320px',
          maxWidth: '600px'
        }
      }}
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>

      {isLoading && <CircularIndeterminate height={196} />}

      {!isLoading && (
        <>
          <DialogContent>
            <Markdown>{data.content}</Markdown>
          </DialogContent>
        </>
      )}

      <DialogActions sx={{ p: '0 20px 20px 0' }}>
        <Button color="secondary" variant="outlined" onClick={handleClose}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default NotificationDialog
