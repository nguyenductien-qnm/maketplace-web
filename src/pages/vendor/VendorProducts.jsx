import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import Button from '@mui/material/Button'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import BusinessCenterOutlinedIcon from '@mui/icons-material/BusinessCenterOutlined'
import ProductTable from '~/components/vendor/VendorProduct/ProductTable'
import { Link } from 'react-router-dom'
import { useState } from 'react'

const TAB_LABELS = {
  ALL: 'All',
  PUBLIC: 'Published',
  PENDING_REVIEW: 'Pending',
  OUT_OF_STOCK: 'Out of Stock',
  DRAFT: 'Draft',
  RECYCLE_BIN: 'Recycle Bin'
}

const TABS = Object.keys(TAB_LABELS)

function VendorProducts() {
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

          <Link to="/vendor/create-product">
            <Button variant="contained" color="primary" sx={{ height: '30px' }}>
              <BusinessCenterOutlinedIcon />
              Add new product
            </Button>
          </Link>
        </Box>

        {TABS.map((tab) => (
          <TabPanel key={tab} value={tab}>
            {status === tab && <ProductTable status={tab} />}
          </TabPanel>
        ))}
      </TabContext>
    </Box>
  )
}

export default VendorProducts
