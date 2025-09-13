import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import DividerVertical from '~/components/common/DividerVertical'
import { blue, grey } from '@mui/material/colors'

function CustomerAddressCard({
  address,
  handleOpenModal,
  handleSetDefaultAddress
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
          <Typography>{address?.full_name}</Typography>
          <DividerVertical />
          <Typography sx={{ color: grey[600] }}>
            {address?.phone_number}
          </Typography>
        </Box>
        <Typography sx={{ fontSize: '14px', color: grey[600] }}>
          {address?.street}
        </Typography>
        <Typography sx={{ fontSize: '14px', color: grey[600] }}>
          {address?.ward?.WardName}, {address?.district?.DistrictName},{' '}
          {address?.province?.ProvinceName}
        </Typography>
        {address?.default && (
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
        <Typography
          onClick={() => handleOpenModal({ action: 'update', address })}
          sx={{
            fontSize: '14px',
            color: blue[600],
            textAlign: 'end',
            marginBottom: '10px',
            '&:hover': { fontWeight: '600', cursor: 'pointer' }
          }}
        >
          Edit
        </Typography>

        {!address?.default && (
          <Button
            className="btn-user-set-default-address"
            onClick={() => {
              handleSetDefaultAddress({ _id: address?._id })
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
