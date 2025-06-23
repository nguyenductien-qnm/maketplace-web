import { Box, Button, Tooltip, Typography } from '@mui/material'
import OrderFilter from './OrderFilter'
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined'

function OrderHeader({
  name,
  filters,
  setFilters,
  handleFilter,
  handleClearFilter,
  handleExportData,
  provinces,
  shops
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
              setFilters={setFilters}
              handleFilter={handleFilter}
              handleClearFilter={handleClearFilter}
              provinces={provinces}
              shops={shops}
            />
          </Box>
        </Tooltip>
        <Tooltip title="Download with advantage filter">
          <Box>
            <Button variant="contained" onClick={handleExportData}>
              <FileDownloadOutlinedIcon />
              Download
            </Button>
          </Box>
        </Tooltip>
      </Box>
    </Box>
  )
}
export default OrderHeader
