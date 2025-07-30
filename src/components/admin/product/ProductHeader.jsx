import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined'
import Tooltip from '@mui/material/Tooltip'
import ProductFilter from './ProductFilter'

function ProductHeader({
  name,
  shops,
  categories,
  filters,
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
            <ProductFilter
              shops={shops}
              categories={categories}
              filters={filters}
              setFilters={setFilters}
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

export default ProductHeader
