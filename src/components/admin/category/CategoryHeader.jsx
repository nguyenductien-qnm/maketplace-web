import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import AddOutlinedIcon from '@mui/icons-material/AddOutlined'
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined'

function CategoryHeader({ handleOpenModal, handleExport }) {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
      <Box>
        <Typography
          variant="body2"
          sx={{ fontSize: '1.5rem', fontWeight: 'bold' }}
        >
          Categories
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', gap: 1 }}>
        <Button
          variant="contained"
          onClick={() => {
            handleOpenModal({ action: 'create-root' })
          }}
        >
          <AddOutlinedIcon />
          Add category root
        </Button>

        <Tooltip title="Export categories to Excel (.csv)">
          <Box>
            <Button
              className="btn-export-category"
              variant="contained"
              onClick={handleExport}
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
export default CategoryHeader
