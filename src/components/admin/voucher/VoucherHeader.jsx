import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined'
import Tooltip from '@mui/material/Tooltip'
import VoucherFilter from './VoucherFilter'

function VoucherHeader({
  shops,
  staffs,
  name,
  filters,
  setFilters,
  handleFilter,
  handleClearFilter,
  handleOpenForm,
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
        <Tooltip>
          <Button
            color="success"
            variant="outlined"
            onClick={() => handleOpenForm({ action: 'create' })}
          >
            Add voucher
          </Button>
        </Tooltip>
        <Tooltip title="Advantage filter">
          <Box>
            <VoucherFilter
              shops={shops}
              staffs={staffs}
              filters={filters}
              setFilters={setFilters}
              handleFilter={handleFilter}
              handleClearFilter={handleClearFilter}
            />
          </Box>
        </Tooltip>
        <Tooltip title="Export filtered voucher(.csv)">
          <Box>
            <Button
              className="btn-export-voucher"
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

export default VoucherHeader
