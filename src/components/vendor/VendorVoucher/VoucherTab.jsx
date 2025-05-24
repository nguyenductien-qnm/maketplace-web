import { useState } from 'react'
import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import { Button } from '@mui/material'
import VoucherTable from './VoucherTable'
import LoyaltyOutlinedIcon from '@mui/icons-material/LoyaltyOutlined'

const TAB_LABELS = {
  ALL: 'All',
  ACTIVE: 'Active',
  EXPIRED: 'Expired',
  PRIVATE: 'Private'
}
const TABS = Object.keys(TAB_LABELS)
function VoucherTab() {
  const [status, setStatus] = useState('ALL')
  const [openModal, setOpenModal] = useState(false)
  const [action, setAction] = useState(null)
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

          <Button
            onClick={() => {
              setAction('CREATE'), setOpenModal(true)
            }}
            variant="contained"
            color="primary"
            sx={{ height: '30px' }}
          >
            <LoyaltyOutlinedIcon />
            Add new voucher
          </Button>
        </Box>

        {TABS.map((tab) => (
          <TabPanel key={tab} value={tab}>
            {status === tab && (
              <VoucherTable
                action={action}
                setAction={setAction}
                openModal={openModal}
                setOpenModal={setOpenModal}
                status={tab}
              />
            )}
          </TabPanel>
        ))}
      </TabContext>
    </Box>
  )
}
export default VoucherTab
