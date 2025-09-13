import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import CustomerAddressCard from '~/components/customer/CustomerAddresses/CustomerAddressCard'
import CustomerAddressForm from '~/components/customer/CustomerAddresses/CustomerAddressForm'
import CircularIndeterminate from '~/components/common/CircularIndeterminate'
import CustomerEmptyAddress from '~/components/customer/CustomerAddresses/CustomerEmptyAddress'
import AddIcon from '@mui/icons-material/Add'
import { useUserAddresses } from '~/hooks/user/user.hook'

function CustomerAddresses() {
  const {
    addresses,
    openModal,
    action,
    loading,
    selectAddress,
    handleOpenModal,
    handleCloseModal,
    handleSubmit,
    handleSetDefaultAddress,
    handleDeleteAddress
  } = useUserAddresses()

  const ContentHeader = (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '20px'
      }}
    >
      <Typography sx={{ fontSize: '20px' }}>My Addresses</Typography>
      <Button
        variant="contained"
        onClick={() => handleOpenModal({ action: 'create' })}
      >
        <AddIcon />
        Add address
      </Button>
    </Box>
  )

  return (
    <Box sx={{ display: loading ? 'flex' : 'block', justifyContent: 'center' }}>
      {loading && <CircularIndeterminate />}
      {!loading && addresses?.length === 0 && (
        <Box>
          {ContentHeader}
          <Divider />
          <CustomerEmptyAddress />
        </Box>
      )}

      {!loading && addresses?.length > 0 && (
        <Box>
          {ContentHeader}
          <Divider />
          {addresses?.map((add) => (
            <Box key={add?._id}>
              <CustomerAddressCard
                address={add}
                handleOpenModal={handleOpenModal}
                handleSetDefaultAddress={handleSetDefaultAddress}
              />
              <Divider />
            </Box>
          ))}

          <CustomerAddressForm
            action={action}
            open={openModal}
            onSubmit={handleSubmit}
            onClose={handleCloseModal}
            address={selectAddress}
            handleDeleteAddress={handleDeleteAddress}
          />
        </Box>
      )}
    </Box>
  )
}

export default CustomerAddresses
