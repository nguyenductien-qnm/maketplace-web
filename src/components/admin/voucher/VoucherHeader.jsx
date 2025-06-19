import { Box, Button, Typography } from '@mui/material'
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined'
import Tooltip from '@mui/material/Tooltip'
import VoucherFilter from './VoucherFilter'

function VoucherHeader({
  name,
  status,
  filters,
  setFilters,
  handleFilter,
  handleClearFilter,
  handleOpenForm
  //   handleExportData
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
          <Button
            color="success"
            variant="contained"
            onClick={() => handleOpenForm({ action: 'create' })}
          >
            Add new voucher
          </Button>
        </Tooltip>
        <Tooltip title="Advantage filter">
          <Box>
            <VoucherFilter
              status={status}
              filters={filters}
              setFilters={setFilters}
              handleFilter={handleFilter}
              handleClearFilter={handleClearFilter}
            />
          </Box>
        </Tooltip>
        <Tooltip title="Download with advantage filter">
          <Box>
            <Button variant="contained">
              <FileDownloadOutlinedIcon />
              Download
            </Button>
          </Box>
        </Tooltip>
      </Box>
    </Box>
  )
}

export default VoucherHeader
