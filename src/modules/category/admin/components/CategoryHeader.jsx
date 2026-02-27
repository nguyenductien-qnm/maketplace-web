import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import AddIcon from '@mui/icons-material/Add'
import RefreshOutlinedIcon from '@mui/icons-material/RefreshOutlined'
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined'

function CategoryHeader({ ui, handler }) {
  const { isRefreshing } = ui
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
        Categories List
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
            onClick={() => handleOpenForm({ action: 'createRoot' })}
            sx={{ p: 1, width: '200px' }}
          >
            <AddIcon />
            Create Category Root
          </Button>
        </Tooltip>
        <Box>
          <Button variant="outlined" sx={{ p: 1, width: '100px' }}>
            <FileDownloadOutlinedIcon />
            Export
          </Button>
        </Box>
      </Box>
    </Box>
  )
}
export default CategoryHeader
