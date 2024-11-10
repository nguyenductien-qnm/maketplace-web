import { Button } from '@mui/material'
import { blue } from '@mui/material/colors'

function ReturnButton() {
  return (
    <Button
      sx={{
        backgroundColor: blue[600],
        color: 'white',
        fontWeight: '600',
        fontSize: '12px',
        padding: '10px 20px'
      }}
    >
      Return to shopping
    </Button>
  )
}
export default ReturnButton
