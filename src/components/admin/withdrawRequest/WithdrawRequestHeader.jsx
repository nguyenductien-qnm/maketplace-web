import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import WithdrawRequestFilter from './WithdrawRequestFilter'
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined'

function WithdrawRequestHeader({
  type,
  shops,
  users,
  filters,
  setFilters,
  handleFilter,
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
        Withdraw request of {type == 'VENDOR' ? 'Vendor' : 'Customer'}
      </Typography>
      <Box sx={{ display: 'flex', gap: '10px' }}>
        <Tooltip title="Advantage filter">
          <Box>
            <WithdrawRequestFilter
              type={type}
              filters={filters}
              setFilters={setFilters}
              shops={shops}
              users={users}
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
export default WithdrawRequestHeader
