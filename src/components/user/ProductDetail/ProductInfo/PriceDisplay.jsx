import { Box, Typography } from '@mui/material'
import { green, grey } from '@mui/material/colors'

function PriceDisplay() {
  return (
    <Box sx={{ display: 'flex', gap: '5px', alignItems: 'end' }}>
      <Typography
        sx={{ color: green[700], fontSize: '28px', fontWeight: '700' }}
      >
        $71.15
      </Typography>
      <Typography
        sx={{
          fontSize: '20px',
          fontWeight: '700',
          paddingBottom: '3px',
          textDecoration: 'line-through',
          color: grey[400]
        }}
      >
        $87.98
      </Typography>
    </Box>
  )
}
export default PriceDisplay
