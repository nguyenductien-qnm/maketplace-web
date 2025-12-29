import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined'
import Tooltip from '@mui/material/Tooltip'
import AddIcon from '@mui/icons-material/Add'
import RefreshOutlinedIcon from '@mui/icons-material/RefreshOutlined'

function VoucherHeader({ ui, handler }) {
  const { pageTitle, isRefreshing } = ui
  const { handleOpenForm, handleRefresh } = handler
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
        <Tooltip title="Fetch the latest data">
          <Button
            disabled={isRefreshing}
            variant="outlined"
            onClick={handleRefresh}
            sx={{ p: 1 }}
          >
            <RefreshOutlinedIcon sx={{ mr: 1 }} />
            Refresh
          </Button>
        </Tooltip>
        <Tooltip>
          <Button
            variant="contained"
            onClick={handleOpenForm}
            sx={{ p: 1, width: '170px' }}
          >
            <AddIcon />
            Create Voucher
          </Button>
        </Tooltip>
        <Tooltip title="Export filtered voucher(.csv)">
          <Box>
            <Button variant="outlined" sx={{ p: 1, width: '100px' }}>
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
