import { Button } from '@mui/material'
import { red } from '@mui/material/colors'

function ResetButton() {
  return (
    <Button
      size="small"
      sx={{
        backgroundColor: red[400],
        color: 'white',
        height: '40px',
        fontWeight: '600',
        fontSize: '14px'
      }}
    >
      Reset
    </Button>
  )
}
export default ResetButton
