import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import ProductTable from './ProductTable'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import {
  PRODUCT_TAB_LABELS,
  PRODUCT_TAB_KEYS
} from '../constants/product.constant'

function ProductTab({ ui, data, handler }) {
  const { summary } = data
  const { handleChangeTab } = handler

  return (
    <TabContext value={ui.value}>
      <Box
        sx={{
          borderColor: 'divider',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <TabList onChange={(e, newValue) => handleChangeTab(newValue)}>
          {PRODUCT_TAB_KEYS.map((tab) => (
            <Tab
              sx={{ textTransform: 'none' }}
              key={tab}
              label={`${PRODUCT_TAB_LABELS[tab]} ${
                summary != null ? `(${summary[tab]})` : ''
              }`}
              value={tab}
            />
          ))}
        </TabList>
      </Box>

      {PRODUCT_TAB_KEYS.map((tab) => (
        <TabPanel key={tab} value={tab} sx={{ padding: '24px 0', mt: -2 }}>
          <ProductTable
            ui={ui.table}
            data={data.table}
            handler={handler.table}
          />
        </TabPanel>
      ))}
    </TabContext>
  )
}

export default ProductTab
