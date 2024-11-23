import { blue } from '@mui/material/colors'
import { Link } from 'react-router-dom'

function VendorDashboardButton() {
  return (
    <Link
      style={{
        fontSize: '14px',
        padding: '10px 20px',
        fontWeight: '600',
        color: 'white',
        backgroundColor: blue[600],
        borderRadius: '5px',
      }}
    >
      Go to vendor dashboard
    </Link>
  )
}
export default VendorDashboardButton
