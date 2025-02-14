import { Box, Paper, Typography } from '@mui/material'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import AddressOptionModal from '~/components/user/CheckOut/AddressOptionsModal'
import { blue } from '@mui/material/colors'
import { useState } from 'react'
function ShippingAddress({ addresses, addressSelected, setAddressSelected }) {
  const [openModal, setOpenModal] = useState()

  const closeModal = () => {
    setOpenModal(false)
  }

  return (
    <Box>
      <Paper sx={{ padding: '25px 30px' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <LocationOnIcon sx={{ color: blue[600] }} />
          <Typography variant="h6">Delivery Address</Typography>
        </Box>
        <Box sx={{ display: 'flex', marginTop: '15px', gap: '20px' }}>
          <Typography fontWeight="bold">
            {addressSelected?.full_name} {addressSelected?.phone_number}
          </Typography>
          <Typography>
            {addressSelected?.street}, {addressSelected?.ward.WardName},{' '}
            {addressSelected?.district.DistrictName},{' '}
            {addressSelected?.province.ProvinceName}
          </Typography>
          <Typography
            sx={{
              color: blue[600],
              '&:hover': {
                cursor: 'pointer',
                color: blue[700],
                textDecoration: 'underline'
              }
            }}
            onClick={() => {
              setOpenModal(true)
            }}
          >
            Change
          </Typography>
        </Box>
      </Paper>
      <AddressOptionModal
        open={openModal}
        addresses={addresses}
        onClose={closeModal}
        addressSelected={addressSelected}
        setAddressSelected={setAddressSelected}
      />
    </Box>
  )
}
export default ShippingAddress
