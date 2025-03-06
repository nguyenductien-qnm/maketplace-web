import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined'
import { Box, Typography } from '@mui/material'
function EmptyAddress() {
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
      <LocationOnOutlinedIcon sx={{ fontSize: '100px' }} />
      <Typography sx={{ fontSize: '14px' }}>
        You have no saved addresses!
      </Typography>
    </Box>
  )
}
export default EmptyAddress
