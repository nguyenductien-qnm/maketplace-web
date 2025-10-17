import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import Button from '@mui/material/Button'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import ProductTable from '~/components/vendor/VendorProduct/ProductTable'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import TypographyTitle from '~/components/common/TypographyTitle'
import FilterListIcon from '@mui/icons-material/FilterList'
import AddIcon from '@mui/icons-material/Add'

const TAB_LABELS = {
  ALL: 'All',
  PUBLIC: 'Published',
  OUT_OF_STOCK: 'Out of Stock',
  PENDING_REVIEW: 'Pending',
  VIOLATE: 'Violate',
  DRAFT: 'Draft',
  RECYCLE_BIN: 'Recycle Bin'
}

const TABS = Object.keys(TAB_LABELS)

function VendorProducts() {
  const [status, setStatus] = useState('ALL')

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <TypographyTitle>My Products</TypographyTitle>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button variant="outlined">
            <FilterListIcon sx={{ pr: '5px' }} />
            Filter
          </Button>
          <Link to="/vendor/product/create">
            <Button variant="outlined">
              <AddIcon sx={{ pr: '5px' }} />
              Add New Product
            </Button>
          </Link>
        </Box>
      </Box>
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
          <TabPanel key={tab} value={tab} sx={{ padding: '24px 0' }}>
            {status === tab && <ProductTable status={tab} />}
          </TabPanel>
        ))}
      </TabContext>
    </Box>
  )
}

export default VendorProducts
