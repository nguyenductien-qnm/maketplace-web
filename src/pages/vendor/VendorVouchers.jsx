import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import Button from '@mui/material/Button'
import VoucherTable from '~/components/vendor/VendorVoucher/VoucherTable'
import TypographyTitle from '~/components/common/TypographyTitle'
import AddIcon from '@mui/icons-material/Add'
import VoucherFilter from '~/components/vendor/VendorVoucher/VoucherFilter'
import ConfirmModal from '~/components/common/ConfirmModal'
import { Link } from 'react-router-dom'
import { useVendorVoucher } from '~/hooks/vendor/voucher.hook'

function VendorVoucher() {
  const { ui, data, handler } = useVendorVoucher()
  const { openConfirmDialog, TAB_LABELS } = ui
  const { filters } = data

  const {
    setFilters,
    handleFilter,
    handleClearFilter,
    handleDeleteVoucher,
    handleCloseConfirmDialog,
    handleChangeTab
  } = handler

  const TABS = Object.keys(TAB_LABELS)

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <TypographyTitle>My Vouchers</TypographyTitle>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <VoucherFilter
            filters={filters}
            setFilters={setFilters}
            handleFilter={handleFilter}
            handleClearFilter={handleClearFilter}
          />
          <Link to="/vendor/voucher/create">
            <Button variant="outlined">
              <AddIcon sx={{ pr: '5px' }} />
              Add New Voucher
            </Button>
          </Link>
        </Box>
      </Box>
      <TabContext value={filters.status}>
        <Box
          sx={{
            borderBottom: 1,
            borderColor: 'divider',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <TabList onChange={(e, newValue) => handleChangeTab(newValue)}>
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
            <VoucherTable ui={ui} data={data} handler={handler} />
          </TabPanel>
        ))}
      </TabContext>

      <ConfirmModal
        open={openConfirmDialog}
        header="Confirm Deletion"
        content="This action cannot be undone! Are you sure you want to permanently delete this voucher?"
        confirmText="Confirm"
        confirmColor="error"
        onClose={handleCloseConfirmDialog}
        onConfirm={handleDeleteVoucher}
      />
    </Box>
  )
}
export default VendorVoucher
