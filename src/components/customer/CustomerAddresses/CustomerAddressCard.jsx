import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import DividerVertical from '~/components/common/DividerVertical'
import { blue, grey } from '@mui/material/colors'
import CustomerAddressModal from './CustomerAddressModal'

function CustomerAddressCard({
  addressItem,
  handleSetDefaultAddress,
  handleDeleteAddress,
  handleUpdateAddress
}) {
  return (
    <Box
      sx={{
        marginTop: '15px',
        marginBottom: '15px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}
    >
      <Box>
        <Box sx={{ display: 'flex', gap: '10px', marginBottom: '5px' }}>
          <Typography>{addressItem?.full_name}</Typography>
          <DividerVertical />
          <Typography sx={{ color: grey[600] }}>
            {addressItem?.phone_number}
          </Typography>
        </Box>
        <Typography sx={{ fontSize: '14px', color: grey[600] }}>
          {addressItem?.street}
        </Typography>
        <Typography sx={{ fontSize: '14px', color: grey[600] }}>
          {addressItem?.ward?.WardName}, {addressItem?.district?.DistrictName},{' '}
          {addressItem?.province?.ProvinceName}
        </Typography>
        {addressItem?.default && (
          <Box
            sx={{
              marginTop: '10px',
              color: blue[600],
              fontSize: '12px',
              border: '1px solid',
              borderColor: blue[600],
              width: '50px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            Default
          </Box>
        )}
      </Box>
      <Box>
        <CustomerAddressModal
          actionType="update"
          addressItem={addressItem}
          handleDeleteAddress={handleDeleteAddress}
          handleUpdateAddress={handleUpdateAddress}
        />
        {!addressItem?.default && (
          <Button
            className="btn-user-set-default-address"
            onClick={() => {
              handleSetDefaultAddress(addressItem._id)
            }}
            sx={{
              backgroundColor: grey[200],
              color: 'black',
              fontSize: '12px',
              padding: '5px 10px'
            }}
          >
            Set as default
          </Button>
        )}
      </Box>
    </Box>
  )
}
export default CustomerAddressCard
