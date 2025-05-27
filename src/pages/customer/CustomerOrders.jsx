import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import OrderItem from '~/components/customer/CustomerOrders/OrderItem'
import CircularIndeterminate from '~/components/common/CircularIndeterminate'
import EmptyOrder from '~/components/customer/CustomerOrders/EmptyOrder'
import { useCustomerOrders } from '~/hooks/user/order.hook'

const TAB_LABELS = {
  ALL: 'All',
  PENDING: 'Pending',
  PAY: 'To Pay',
  SHIP: 'To Ship',
  COMPLETE: 'Completed',
  CANCEL: 'Cancelled'
}

const TABS = Object.keys(TAB_LABELS)

function CustomerOrders() {
  const { status, setStatus, orders, loading, setOrders } = useCustomerOrders()

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
            {loading ? (
              <Box
                sx={{ display: 'flex', justifyContent: 'center', mt: '50px' }}
              >
                <CircularIndeterminate />
              </Box>
            ) : orders?.length === 0 ? (
              <EmptyOrder />
            ) : (
              orders?.map((order) => (
                <OrderItem
                  key={order?._id}
                  order={order}
                  setOrders={setOrders}
                />
              ))
            )}
          </TabPanel>
        ))}
      </TabContext>
    </Box>
  )
}
export default CustomerOrders
