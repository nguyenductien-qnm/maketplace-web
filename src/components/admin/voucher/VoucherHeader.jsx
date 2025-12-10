import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined'
import Tooltip from '@mui/material/Tooltip'
import AddIcon from '@mui/icons-material/Add'

function VoucherHeader({ ui, handler }) {
  const { pageTitle } = ui
  const { handleOpenForm, handleExportVouchers } = handler
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
      <Typography variant="body2" sx={{ fontSize: '2rem', fontWeight: 'bold' }}>
        {pageTitle}
      </Typography>
      <Box sx={{ display: 'flex', gap: '10px' }}>
        <Tooltip>
          <Button
            variant="contained"
            onClick={() => handleOpenForm({ action: 'create' })}
            sx={{ p: 1, width: '170px' }}
          >
            <AddIcon />
            Create Voucher
          </Button>
        </Tooltip>
        <Tooltip title="Export filtered voucher(.csv)">
          <Box>
            <Button
              className="btn-export-voucher"
              variant="outlined"
              onClick={handleExportVouchers}
              sx={{ p: 1, width: '100px' }}
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
