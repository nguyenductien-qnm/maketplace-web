import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import Button from '@mui/material/Button'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import ProductTable from '~/components/vendor/VendorProduct/ProductTable'
import TypographyTitle from '~/components/common/TypographyTitle'
import AddIcon from '@mui/icons-material/Add'
import ConfirmModal from '~/components/common/ConfirmModal'
import ProductMetricsModal from '~/components/vendor/VendorProduct/ProductMetricsModal'
import ProductFilter from '~/components/vendor/VendorProduct/ProductFilter'
import { Link } from 'react-router-dom'
import { useVendorProductList } from '~/hooks/vendor/product.hook'
import NotificationDialog from '~/components/common/NotificationDialog'

function VendorProducts() {
  const { ui, data, handler } = useVendorProductList()
  const { metrics, categories, filters, summary, auditLog, setFilters } = data
  const {
    loadingModal,
    TAB_LABELS,
    openConfirmDialog,
    openMetricsModal,
    openAuditLogModal
  } = ui
  const {
    handleCloseConfirmDialog,
    handleCloseMetricsModal,
    handleChangeTab,
    handleClearFilter,
    handleFilter,
    handleDeleteProduct,
    handleCloseAuditLogModal
  } = handler
  const TABS = Object.keys(TAB_LABELS)

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <TypographyTitle>My Products</TypographyTitle>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <ProductFilter
            filters={filters}
            setFilters={setFilters}
            categories={categories}
            handleFilter={handleFilter}
            handleClearFilter={handleClearFilter}
          />
          <Link to="/vendor/product/create">
            <Button variant="outlined">
              <AddIcon sx={{ pr: '5px' }} />
              Add New Product
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
                label={`${TAB_LABELS[tab]} ${
                  summary != null ? `(${summary[tab]})` : ''
                }`}
                value={tab}
              />
            ))}
          </TabList>
        </Box>

        {TABS.map((tab) => (
          <TabPanel key={tab} value={tab} sx={{ padding: '24px 0' }}>
            <ProductTable ui={ui} data={data} handler={handler} />
          </TabPanel>
        ))}
      </TabContext>

      <ConfirmModal
        open={openConfirmDialog}
        header="Confirm Deletion"
        content="This action cannot be undone! Are you sure you want to permanently delete this product?"
        confirmText="Confirm"
        confirmColor="error"
        onClose={handleCloseConfirmDialog}
        onConfirm={handleDeleteProduct}
      />

      <NotificationDialog
        loading={loadingModal}
        header="Audit Log For This Action"
        content={auditLog}
        open={openAuditLogModal}
        onClose={handleCloseAuditLogModal}
      />

      {openMetricsModal && (
        <ProductMetricsModal
          loading={loadingModal}
          open={openMetricsModal}
          onClose={handleCloseMetricsModal}
          data={metrics}
        />
      )}
    </Box>
  )
}

export default VendorProducts
