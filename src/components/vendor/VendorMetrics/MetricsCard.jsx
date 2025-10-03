import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { grey } from '@mui/material/colors'

function MetricsCard({ label, number, icon }) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'start',
        border: '1px solid #e5e5e5',
        borderRadius: '7px',
        padding: '20px',
        width: '100%'
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: grey[200],
          padding: '10px',
          borderRadius: '9999px'
        }}
      >
        {icon}
      </Box>
      <Typography sx={{ color: grey[600], mt: '10px' }}> {label}</Typography>
      <Typography sx={{ fontSize: '30px' }}> {number}</Typography>
    </Box>
  )
}
export default MetricsCard
