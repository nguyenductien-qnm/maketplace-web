import { Box, Button, Typography } from '@mui/material'
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined'
import ShopFilter from './ShopFilter'
import Tooltip from '@mui/material/Tooltip'

function ShopHeader({
  name,
  filters,
  handleFilter,
  handleExportData,
  handleClearFilter
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
              filters={filters}
              handleFilter={handleFilter}
              handleClearFilter={handleClearFilter}
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

export default ShopHeader
