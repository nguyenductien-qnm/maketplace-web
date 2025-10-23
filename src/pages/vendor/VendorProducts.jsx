import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import Button from '@mui/material/Button'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import ProductTable from '~/components/vendor/VendorProduct/ProductTable'
import TypographyTitle from '~/components/common/TypographyTitle'
import FilterListIcon from '@mui/icons-material/FilterList'
import AddIcon from '@mui/icons-material/Add'
import { Link } from 'react-router-dom'
import ConfirmModal from '~/components/common/ConfirmModal'
import { useVendorProductList } from '~/hooks/vendor/product.hook'
import ProductMetricsModal from '~/components/vendor/VendorProduct/ProductMetricsModal'

function VendorProducts() {
  const { ui, data, handler } = useVendorProductList()
  const {
    loadingModal,
    status,
    TAB_LABELS,
    openConfirmDialog,
    openMetricsModal
  } = ui
  const { metrics } = data
  const {
    handleOpenConfirmDialog,
    handleCloseConfirmDialog,
    handleCloseMetricsModal,
    handleDeleteProduct
  } = handler
  const TABS = Object.keys(TAB_LABELS)

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
            {status === tab && (
              <ProductTable ui={ui} data={data} handler={handler} />
            )}
          </TabPanel>
        ))}
      </TabContext>

      <ConfirmModal
        open={openConfirmDialog}
        header="Confirm Permanent Deletion"
        content="This action cannot be undone! Are you sure you want to permanently delete this product?"
        confirmText="Delete Permanently"
        confirmColor="error"
        onClose={handleCloseConfirmDialog}
        onConfirm={handleDeleteProduct}
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
