import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import { Button, Checkbox, Divider } from '@mui/material'
import DividerVertical from '../../common/DividerVertical'
import { blue, grey } from '@mui/material/colors'
import { useEffect, useState } from 'react'
import CustomerAddressModal from '~/components/customer/CustomerAddresses/CustomerAddressModal'
function AddressOptionModal({
  open,
  onClose,
  addresses,
  handleAddAddress,
  addressSelected,
  setAddressSelected
}) {
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    maxHeight: '80vh',
    overflow: 'auto',
    scrollbarWidth: 'none'
    // msOverflowStyle: 'none'
  }

  const [tempAddressSelected, setTempAddressSelected] = useState()

  useEffect(() => {
    setTempAddressSelected(addressSelected)
  }, [addressSelected])

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography>My Address</Typography>

        <Box sx={{ marginTop: '15px' }}>
          {addresses?.map((address, index) => (
            <Box key={index}>
              <Divider sx={{ marginBottom: '10px', marginTop: '10px' }} />
              <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Checkbox
                  size="small"
                  checked={tempAddressSelected?._id === address?._id}
                  onChange={() => setTempAddressSelected(address)}
                />

                <Box>
                  <Box
                    sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}
                  >
                    <Typography variant="body2">
                      {address?.full_name}
                    </Typography>
                    <DividerVertical />
                    <Typography variant="body2">
                      {address?.phone_number}
                    </Typography>
                  </Box>
                  <Typography variant="caption">{address?.street}</Typography>
                  <Box sx={{ display: 'flex' }}>
                    <Typography variant="caption">
                      {address?.ward.WardName}
                      {', '}
                    </Typography>
                    <Typography variant="caption">
                      {address?.district.DistrictName}
                      {', '}
                    </Typography>
                    <Typography variant="caption">
                      {address?.province.ProvinceName}
                    </Typography>
                  </Box>
                  {address?.default && (
                    <Typography
                      variant="caption"
                      sx={{
                        color: blue[600],
                        borderColor: blue[600],
                        padding: '3px 7px',
                        border: '1px solid'
                      }}
                    >
                      Default
                    </Typography>
                  )}
                </Box>
              </Box>
            </Box>
          ))}
        </Box>

        <Divider sx={{ mt: '10px' }} />
        <Box
          sx={{
            display: 'flex',
            gap: '10px',
            mt: '15px',
            justifyContent: 'end'
          }}
        >
          <CustomerAddressModal
            handleAddAddress={handleAddAddress}
            actionType="create"
            address={null}
          />
          <Button
            onClick={() => {
              onClose()
            }}
            sx={{
              backgroundColor: grey[200],
              color: 'black',
              width: '100px'
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            sx={{ width: '100px' }}
            onClick={() => {
              setAddressSelected(tempAddressSelected)
              onClose()
            }}
          >
            Confirm
          </Button>
        </Box>
      </Box>
    </Modal>
  )
}
export default AddressOptionModal
