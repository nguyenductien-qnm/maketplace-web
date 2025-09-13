import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined'
function CustomerEmptyAddress() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '40px',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100%',
        mt: '50px'
      }}
    >
      <LocationOnOutlinedIcon sx={{ fontSize: '100px' }} />
      <Typography sx={{ fontSize: '14px' }}>
        You have no saved addresses!
      </Typography>
    </Box>
  )
}
export default CustomerEmptyAddress
