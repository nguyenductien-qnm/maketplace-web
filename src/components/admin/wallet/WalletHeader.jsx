import { Box, Button, Tooltip, Typography } from '@mui/material'
import WalletFilter from './WalletFilter'
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined'

function WalletHeader({
  type,
  users,
  shops,
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
        Wallet of {type == 'VENDOR' ? 'Vendor' : 'Customer'}
      </Typography>
      <Box sx={{ display: 'flex', gap: '10px' }}>
        <Tooltip title="Advantage filter">
          <Box>
            <WalletFilter
              type={type}
              users={users}
              shops={shops}
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
export default WalletHeader
