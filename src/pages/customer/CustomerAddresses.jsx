import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import CustomerAddressCard from '~/components/customer/CustomerAddresses/CustomerAddressCard'
import CustomerAddressModal from '~/components/customer/CustomerAddresses/CustomerAddressModal'
import CircularIndeterminate from '~/components/common/CircularIndeterminate'
import CustomerEmptyAddress from '~/components/customer/CustomerAddresses/CustomerEmptyAddress'
import { useAddressList } from '~/hooks/user/user.hook'
function CustomerAddresses() {
  const {
    userAddressList,
    loading,
    addAddress,
    setDefaultAddress,
    updateAddress,
    deleteAddress
  } = useAddressList()

  return (
    <Box sx={{ display: loading ? 'flex' : 'block', justifyContent: 'center' }}>
      {loading && <CircularIndeterminate />}

      {!loading && userAddressList?.length === 0 && (
        <Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '20px'
            }}
          >
            <Typography sx={{ fontSize: '20px' }}>My Addresses</Typography>
            <CustomerAddressModal
              actionType="create"
              handleAddAddress={addAddress}
              addressItem={null}
            />
          </Box>
          <Divider />
          <CustomerEmptyAddress />
        </Box>
      )}

      {!loading && userAddressList?.length > 0 && (
        <Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '20px'
            }}
          >
            <Typography sx={{ fontSize: '20px' }}>My Addresses</Typography>
            <CustomerAddressModal
              actionType="create"
              handleAddAddress={addAddress}
              addressItem={null}
            />
          </Box>
          <Divider />
          {userAddressList.map((item) => (
            <Box key={item._id}>
              <CustomerAddressCard
                addressItem={item}
                handleSetDefaultAddress={setDefaultAddress}
                handleDeleteAddress={deleteAddress}
                handleUpdateAddress={updateAddress}
              />
              <Divider />
            </Box>
          ))}
        </Box>
      )}
    </Box>
  )
}

export default CustomerAddresses
