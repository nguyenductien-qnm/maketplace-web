import { Button } from '@mui/material'
import { green } from '@mui/material/colors'

function FilterButton() {
  return (
    <Button
      size="small"
      sx={{
        backgroundColor: green[400],
        color: 'white',
        height: '40px',
        fontWeight: '600',
        fontSize: '14px'
      }}
    >
      Filter
    </Button>
  )
}
export default FilterButton
