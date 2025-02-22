import { Box, Divider, Typography } from '@mui/material'
import AddressCard from './AddressCard'
import AddressModal from './AddressModal'
import { useEffect, useState } from 'react'
import { getAddressListAPI } from '~/api/user.api'
import sortAddressByDefault from '~/helpers/sortAddressByDefault'
import CircularIndeterminate from '~/components/CircularIndeterminate'
function Addresses() {
  const [userAddressList, setUserAddressList] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getAndSetAddressList = async () => {
      const res = await getAddressListAPI()
      let data = res.data?.metadata
      data = sortAddressByDefault(data)
      setUserAddressList(data)
      setLoading(false)
    }
    getAndSetAddressList()
  }, [])

  const handleAddAddress = (data) => {
    if (data.default === true) {
      let updateAddresList = userAddressList.map((item) => {
        return { ...item, default: false }
      })
      updateAddresList.push(data)
      setUserAddressList(sortAddressByDefault(updateAddresList))
      return
    }
    setUserAddressList((prevList) => [...prevList, data])
  }

  const handleSetDefaultAddress = (_id) => {
    let updateAddresList = userAddressList.map((item) => ({
      ...item,
      default: item._id === _id
    }))

    setUserAddressList(sortAddressByDefault(updateAddresList))
  }

  const handleUpdateAddress = (data) => {
    setUserAddressList((prev) => {
      return prev.map((item) =>
        item._id === data._id ? { ...item, ...data } : item
      )
    })
  }

  const handleDeleteAddress = async (_id) => {
    setUserAddressList((prev) => {
      return prev.filter((item) => item._id !== _id)
    })
  }

  return (
    <Box
      sx={{
        display: loading ? 'flex' : 'block',
        justifyContent: 'center'
      }}
    >
      {loading ? (
        <CircularIndeterminate />
      ) : (
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
            <AddressModal
              handleAddAddress={handleAddAddress}
              actionType="create"
              address={null}
            />
          </Box>
          <Divider />
          <Box>
            {userAddressList &&
              userAddressList.map((item, index) => (
                <Box key={index}>
                  <AddressCard
                    addressItem={item}
                    handleSetDefaultAddress={handleSetDefaultAddress}
                    handleDeleteAddress={handleDeleteAddress}
                    handleUpdateAddress={handleUpdateAddress}
                  />
                  <Divider />
                </Box>
              ))}
          </Box>
        </Box>
      )}
    </Box>
  )
}
export default Addresses
