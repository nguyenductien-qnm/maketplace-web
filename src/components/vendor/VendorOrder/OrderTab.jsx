import { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import { styled } from '@mui/material'
import SearchInput from './SearchInput'
import CircularIndeterminate from '~/components/common/CircularIndeterminate'
import OrderTable from './OrderTable'
import EmptyOrder from './EmptyOrder'
function OrderTab({ orders, getOrders, updateOrderStatus }) {
  const [value, setValue] = useState('ALL')
  const [loading, setLoading] = useState(true)
  const handleChange = (event, newValue) => {
    setLoading(true)
    setValue(newValue)
  }

  const CustomTab = styled(Tab)({
    '&.MuiTab-root': {
      textTransform: 'none'
    }
  })

  const customHandleSearch = async (searchData) => {
    setLoading(true)
    const data = {
      status: value,
      search: searchData?.search
    }
    if (searchData.startDate) {
      data.startDate = searchData.startDate
    }
    if (searchData.endDate) {
      data.endDate = searchData.endDate
    }
    await getOrders(data)
    setLoading(false)
  }

  useEffect(() => {
    const fetchOrders = async () => {
      await getOrders({ status: value })
      setLoading(false)
    }
    fetchOrders()
  }, [value])

  const OrderTabContent = () => (
    <>
      <SearchInput customHandleSearch={customHandleSearch} />
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: '50px' }}>
          <CircularIndeterminate />
        </Box>
      ) : orders?.length === 0 ? (
        <EmptyOrder />
      ) : (
        <OrderTable orders={orders} updateOrderStatus={updateOrderStatus} />
      )}
    </>
  )

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box
          sx={{
            borderBottom: 1,
            borderColor: 'divider',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <CustomTab label="All" value="ALL" />
            <CustomTab label="Pending" value="PENDING" />
            <CustomTab label="Confirm" value="CONFIRM" />
            <CustomTab label="Shipped" value="SHIPPED" />
            <CustomTab label="Cancelled" value="CANCELLED" />
            <CustomTab label="Delivered" value="DELIVERED" />
          </TabList>
        </Box>
        <TabPanel value="ALL">
          <OrderTabContent />
        </TabPanel>
        <TabPanel value="PENDING">
          <OrderTabContent />
        </TabPanel>
        <TabPanel value="CONFIRM">
          <OrderTabContent />
        </TabPanel>
        <TabPanel value="SHIPPED">
          <OrderTabContent />
        </TabPanel>
        <TabPanel value="CANCELLED">
          <OrderTabContent />
        </TabPanel>
        <TabPanel value="DELIVERED">
          <OrderTabContent />
        </TabPanel>
      </TabContext>
    </Box>
  )
}
export default OrderTab
