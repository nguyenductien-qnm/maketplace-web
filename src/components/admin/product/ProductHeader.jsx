import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined'
import ProductFilter from './ProductFilter'

function ProductHeader({ ui, data, handler }) {
  const { pageTitle } = ui
  const { handleExportProducts } = handler

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
        {pageTitle}
      </Typography>
      <Box sx={{ display: 'flex', gap: '10px' }}>
        <Tooltip title="Advantage filter">
          <Box>
            <ProductFilter data={data} handler={handler} />
          </Box>
        </Tooltip>
        <Tooltip title="Export filtered products(.csv)">
          <Box>
            <Button
              className="btn-export-product"
              variant="outlined"
              onClick={handleExportProducts}
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

export default ProductHeader
