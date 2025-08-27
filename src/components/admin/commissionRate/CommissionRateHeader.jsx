import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Tooltip from '@mui/material/Tooltip'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import AddIcon from '@mui/icons-material/Add'
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined'

function CommissionRateHeader({
  sortBy,
  setSortBy,
  handleOpenModal,
  handleExportCommissionRates
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
        Commission Rate
      </Typography>
      <Box sx={{ display: 'flex', gap: '10px' }}>
        <FormControl sx={{ minWidth: 250 }} size="small">
          <InputLabel id="demo-select-small-label">Sort by</InputLabel>
          <Select
            labelId="demo-select-small-label"
            id="demo-select-small"
            label="Sort by"
            onChange={(e) => setSortBy(e?.target?.value)}
            value={sortBy}
          >
            <MenuItem value="createdAt">Created (Newest)</MenuItem>
            <MenuItem value="updatedAt">Update (Newest)</MenuItem>
            <MenuItem value="highest">Rate (Highest)</MenuItem>
            <MenuItem value="lowest">Rate (Lowest)</MenuItem>
          </Select>
        </FormControl>

        <Tooltip title="Create new commission rate">
          <Box>
            <Button
              sx={{ height: '40px' }}
              variant="contained"
              onClick={() => {
                handleOpenModal({ action: 'create' })
              }}
            >
              <AddIcon />
              Add commission rate
            </Button>
          </Box>
        </Tooltip>

        <Tooltip title="Export sorted commission rates(.csv)">
          <Box>
            <Button
              className="btn-export-commission"
              sx={{ height: '40px' }}
              variant="outlined"
              onClick={handleExportCommissionRates}
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

export default CommissionRateHeader
