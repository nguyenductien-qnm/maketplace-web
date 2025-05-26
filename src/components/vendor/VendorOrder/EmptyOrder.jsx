import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined'
import { Typography } from '@mui/material'
import Box from '@mui/material/Box'
function EmptyOrder() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '40px',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100%'
      }}
    >
      <Inventory2OutlinedIcon sx={{ fontSize: '100px' }} />
      <Typography sx={{ fontSize: '14px' }}>
        The order table is empty.
      </Typography>
    </Box>
  )
}
export default EmptyOrder
