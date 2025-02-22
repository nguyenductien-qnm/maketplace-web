import { useState } from 'react'
import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import { styled } from '@mui/material'

import OrderItem from './OrderItem'

function TabOrder({ orders, setOrders }) {
  const [value, setValue] = useState('1')

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const CustomTab = styled(Tab)({
    '&.MuiTab-root': {
      textTransform: 'none'
    }
  })

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
            <CustomTab label="All" value="1" />
            <CustomTab label="To Pay" value="2" />
            <CustomTab label="To Ship" value="3" />
            <CustomTab label="To Receive" value="4" />
            <CustomTab label="Completed" value="5" />
            <CustomTab label="Cancelled" value="6" />
            <CustomTab label="Return Refund" value="7" />
          </TabList>
        </Box>
        <TabPanel value="1">
          {orders?.map((order) => (
            <OrderItem key={order?._id} order={order} setOrders={setOrders} />
          ))}
        </TabPanel>
        <TabPanel value="2">Pending Review</TabPanel>
        <TabPanel value="3">In stock</TabPanel>
      </TabContext>
    </Box>
  )
}
export default TabOrder
