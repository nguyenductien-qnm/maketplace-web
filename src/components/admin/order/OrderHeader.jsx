import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import OrderFilter from './OrderFilter'
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined'

function OrderHeader({
  name,
  filters,
  provinces,
  shops,
  setFilters,
  handleFilter,
  handleClearFilter,
  handleExportOrders
}) {
  return (
    <Box
      sx={{
        height: '70px',
        padding: '15px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}
    >
      <Typography
        variant="body2"
        sx={{ fontSize: '1.5rem', fontWeight: 'bold' }}
      >
        {name}
      </Typography>
      <Box sx={{ display: 'flex', gap: '10px' }}>
        <Tooltip title="Advantage filter">
          <Box>
            <OrderFilter
              filters={filters}
              provinces={provinces}
              shops={shops}
              setFilters={setFilters}
              handleFilter={handleFilter}
              handleClearFilter={handleClearFilter}
            />
          </Box>
        </Tooltip>
        <Tooltip title="Export filtered orders(.csv)">
          <Box>
            <Button
              className="btn-export-orders"
              variant="contained"
              onClick={handleExportOrders}
            >
              <FileDownloadOutlinedIcon />
              Export
            </Button>
          </Box>
        </Tooltip>
      </Box>
    </Box>
  )
}
export default OrderHeader
