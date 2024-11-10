import { Button } from '@mui/material'
import { blue } from '@mui/material/colors'

function VendorDashboardButton() {
  return (
    <Button
      sx={{
        fontSize: '14px',
        padding: '10px 20px',
        fontWeight: '600',
        color: 'white',
        backgroundColor: blue[600]
      }}
    >
      Go to vendor dashboard
    </Button>
  )
}
export default VendorDashboardButton
