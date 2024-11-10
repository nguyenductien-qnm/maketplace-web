import { Button } from '@mui/material'
import { blue } from '@mui/material/colors'

function SearchButton() {
  return (
    <Button
      size="small"
      sx={{
        backgroundColor: blue[600],
        color: 'white',
        height: '40px',
        fontWeight: '600',
        fontSize: '14px'
      }}
    >
      Search
    </Button>
  )
}
export default SearchButton
