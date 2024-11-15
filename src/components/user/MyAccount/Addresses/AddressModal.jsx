import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import { useState } from 'react'
import AddIcon from '@mui/icons-material/Add'
import { blue, grey } from '@mui/material/colors'
import { FormControlLabel, FormLabel, TextField } from '@mui/material'
import Checkbox from '@mui/material/Checkbox'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4
}
import FormAddress from '~/components/FormAddress'

function AddressModal() {
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <div>
      <Button
        onClick={handleOpen}
        sx={{
          display: 'flex',
          gap: '5px',
          fontSize: '14px',
          padding: '10px 20px',
          color: 'white',
          backgroundColor: blue[600]
        }}
      >
        <AddIcon /> Add new address
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            New Address
          </Typography>
          <Box sx={{ display: 'flex', gap: '20px' }}>
            <TextField label="Full Name" size="small" />
            <TextField label="Phone Number" size="small" />
          </Box>

          <Box sx={{ width: '100%' }}>
            <FormAddress />
          </Box>

          <FormControlLabel
            control={<Checkbox size="small" defaultChecked />}
            label="Set as Default Address"
            sx={{ marginTop: '10px' }}
          />

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'end',
              gap: '10px',
              marginTop: '20px'
            }}
          >
            <Button
              sx={{
                backgroundColor: grey[200],
                color: 'black',
                padding: '5px 10px'
              }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              sx={{
                backgroundColor: blue[600],
                color: 'white',
                padding: '5px 10px'
              }}
            >
              Submit
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  )
}

export default AddressModal
