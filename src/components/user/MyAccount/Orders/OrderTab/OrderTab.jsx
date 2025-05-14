import { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import { styled } from '@mui/material'

import OrderItem from './OrderItem'
import CircularIndeterminate from '~/components/common/CircularIndeterminate'
import EmptyOrder from '../EmptyOrder'

function OrderTab({ orders, getOrders, setOrders }) {
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

  useEffect(() => {
    const fetchOrders = async () => {
      await getOrders({ status: value })
      setLoading(false)
    }
    fetchOrders()
  }, [value])

  const OrderTabContent = () => (
    <>
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: '50px' }}>
          <CircularIndeterminate />
        </Box>
      ) : orders?.length === 0 ? (
        <EmptyOrder />
      ) : (
        orders?.map((order) => (
          <OrderItem key={order?._id} order={order} setOrders={setOrders} />
        ))
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
            <CustomTab label="To Pay" value="PAY" />
            <CustomTab label="To Ship" value="SHIP" />
            <CustomTab label="Completed" value="COMPLETE" />
            <CustomTab label="Cancelled" value="CANCEL" />
          </TabList>
        </Box>
        <TabPanel value="ALL">
          <OrderTabContent />
        </TabPanel>
        <TabPanel value="PENDING">
          <OrderTabContent />
        </TabPanel>
        <TabPanel value="PAY">
          <OrderTabContent />
        </TabPanel>
        <TabPanel value="SHIP">
          <OrderTabContent />
        </TabPanel>
        <TabPanel value="COMPLETE">
          <OrderTabContent />
        </TabPanel>
        <TabPanel value="CANCEL">
          <OrderTabContent />
        </TabPanel>
        <TabPanel value="REFUND">
          <OrderTabContent />
        </TabPanel>
      </TabContext>
    </Box>
  )
}
export default OrderTab
