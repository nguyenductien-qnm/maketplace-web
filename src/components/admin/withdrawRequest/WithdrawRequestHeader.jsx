import { Box, Button, Tooltip, Typography } from '@mui/material'
import WithdrawRequestFilter from './WithdrawRequestFilter'
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined'

function WithdrawRequestHeader({ type }) {
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
          <Box></Box>
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
