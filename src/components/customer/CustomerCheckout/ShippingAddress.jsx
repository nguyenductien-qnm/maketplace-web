import { Box, Button, Paper, Skeleton, Typography } from '@mui/material'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import AddressOptionModal from './AddressOptionsModal'
import { blue } from '@mui/material/colors'
import { useEffect, useState } from 'react'
import AddIcon from '@mui/icons-material/Add'
import Alert from '@mui/material/Alert'
import { useNavigate } from 'react-router-dom'
function ShippingAddress({
  addresses,
  addressSelected,
  setAddressSelected,
  handleAddAddress
}) {
  const navigate = useNavigate()
  const [openModal, setOpenModal] = useState(false)

  const closeModal = () => {
    setOpenModal(false)
  }

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (addresses) setLoading(false)
  }, [addresses])

  return (
    <Box>
      <Paper sx={{ padding: '25px 30px' }}>
        <Box
          sx={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}
        >
          <LocationOnIcon sx={{ color: blue[600] }} />
          <Typography variant="h6">Delivery Address</Typography>
        </Box>
        {loading ? (
          <Skeleton variant="text" width="100%" height={50} />
        ) : (
          <>
            {addresses?.length !== 0 ? (
              <Box sx={{ display: 'flex', gap: '20px' }}>
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
            ) : (
              <Box
                sx={{ display: 'flex', flexDirection: 'column', gap: '15px' }}
              >
                <Alert variant="filled" severity="error">
                  You don’t have a shipping address yet. Please add an address
                  to place your order.
                </Alert>
                <Button
                  variant="contained"
                  onClick={() => navigate('/my-account/addresses')}
                >
                  <AddIcon /> Add new address
                </Button>
              </Box>
            )}
          </>
        )}
      </Paper>
      <AddressOptionModal
        open={openModal}
        addresses={addresses}
        onClose={closeModal}
        handleAddAddress={handleAddAddress}
        addressSelected={addressSelected}
        setAddressSelected={setAddressSelected}
      />
    </Box>
  )
}
export default ShippingAddress
