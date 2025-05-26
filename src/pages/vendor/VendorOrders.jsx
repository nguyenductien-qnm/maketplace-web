import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import OrderTable from '~/components/vendor/VendorOrder/OrderTable'
import { useState } from 'react'

const TAB_LABELS = {
  ALL: 'All',
  PENDING: 'Pending',
  CONFIRM: 'Confirm',
  SHIPPED: 'Shipped',
  CANCELLED: 'Cancelled',
  DELIVERED: 'Delivered'
}
const TABS = Object.keys(TAB_LABELS)

function VendorOrders() {
  const [status, setStatus] = useState('ALL')

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={status}>
        <Box
          sx={{
            borderBottom: 1,
            borderColor: 'divider',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <TabList onChange={(e, newValue) => setStatus(newValue)}>
            {TABS.map((tab) => (
              <Tab
                sx={{ textTransform: 'none' }}
                key={tab}
                label={TAB_LABELS[tab]}
                value={tab}
              />
            ))}
          </TabList>
        </Box>

        {TABS.map((tab) => (
          <TabPanel key={tab} value={tab}>
            {status === tab && <OrderTable status={tab} />}
          </TabPanel>
        ))}
      </TabContext>
    </Box>
  )
}
export default VendorOrders
