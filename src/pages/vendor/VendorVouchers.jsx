import { useState } from 'react'
import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import Button from '@mui/material/Button'
import VoucherTable from '~/components/vendor/VendorVoucher/VoucherTable'
import TypographyTitle from '~/components/common/TypographyTitle'
import AddIcon from '@mui/icons-material/Add'
import { Link } from 'react-router-dom'
import VoucherFilter from '~/components/vendor/VendorVoucher/VoucherFilter'

const TAB_LABELS = {
  ALL: 'All',
  ACTIVE: 'Active',
  EXPIRED: 'Expired',
  PRIVATE: 'Private'
}

const TABS = Object.keys(TAB_LABELS)

function VendorVoucher() {
  const [status, setStatus] = useState('ALL')
  const [openModal, setOpenModal] = useState(false)
  const [action, setAction] = useState(null)
  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <TypographyTitle>My Vouchers</TypographyTitle>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <VoucherFilter />
          <Link to="/vendor/voucher/create">
            <Button variant="outlined">
              <AddIcon sx={{ pr: '5px' }} />
              Add New Voucher
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
export default VendorVoucher
