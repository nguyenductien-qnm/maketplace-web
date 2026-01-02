import { TabContext, TabList, TabPanel } from '@mui/lab'
import {
  VOUCHER_TAB_LABELS,
  VOUCHER_TAB_KEYS
} from '../../constants/voucher.constant'
import { Box, Tab } from '@mui/material'
import VoucherTable from './VoucherTable'

function VoucherTab({ ui, data, handler }) {
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
          {VOUCHER_TAB_KEYS.map((tab) => (
            <Tab
              sx={{ textTransform: 'none' }}
              key={tab}
              label={`${VOUCHER_TAB_LABELS[tab]} ${
                summary != null ? `(${summary[tab]})` : ''
              }`}
              value={tab}
            />
          ))}
        </TabList>
      </Box>

      {VOUCHER_TAB_KEYS.map((tab) => (
        <TabPanel key={tab} value={tab} sx={{ padding: '24px 0', mt: -2 }}>
          <VoucherTable
            ui={ui.table}
            data={data.table}
            handler={handler.table}
          />
        </TabPanel>
      ))}
    </TabContext>
  )
}
export default VoucherTab
