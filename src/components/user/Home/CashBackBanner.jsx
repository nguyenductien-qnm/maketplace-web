import { Box, Button, Typography } from '@mui/material'
import { blue } from '@mui/material/colors'

function CashBackBanner() {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        backgroundColor: blue[50],
        height: '50px',
        borderRadius: '10px'
      }}
    >
      <Typography
        sx={{ fontSize: '18px', fontWeight: '700', color: blue[900] }}
      >
        RETURN CASH BACK
      </Typography>
      <Box sx={{ display: 'flex' }}>
        <Typography sx={{ fontWeight: '600', color: blue[900] }}>
          Earn 5% cash back on Bevesi.com.
        </Typography>
        <Typography sx={{ color: blue[900] }}>
          See if you’re pre-approved with no credit risk.
        </Typography>
      </Box>
      <Button
        sx={{
          textTransform: 'none',
          border: '1px solid',
          borderColor: blue[900],
          color: blue[900]
        }}
      >
        Discover More
      </Button>
    </Box>
  )
}

export default CashBackBanner
