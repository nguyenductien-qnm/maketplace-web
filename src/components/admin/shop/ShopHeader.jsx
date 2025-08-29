import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Tooltip from '@mui/material/Tooltip'
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined'
import ShopFilter from './ShopFilter'

function ShopHeader({
  name,
  filters,
  provinces,
  status,
  setFilters,
  handleFilter,
  handleClearFilter,
  handleExportData
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
            <ShopFilter
              status={status}
              filters={filters}
              provinces={provinces}
              setFilters={setFilters}
              handleFilter={handleFilter}
              handleClearFilter={handleClearFilter}
            />
          </Box>
        </Tooltip>
        <Tooltip title="Export filtered shops(.csv)">
          <Box>
            <Button
              className="btn-export-shop"
              variant="contained"
              onClick={handleExportData}
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

export default ShopHeader
