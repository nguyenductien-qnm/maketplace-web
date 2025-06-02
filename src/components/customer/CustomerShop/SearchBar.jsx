import { Box, Button, TextField } from '@mui/material'
import { blue } from '@mui/material/colors'

function SearchBar() {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
      <TextField
        size="small"
        placeholder="Enter product name"
        sx={{ width: '250px' }}
      />
      <Button
        sx={{
          backgroundColor: blue[600],
          color: 'white',
          textTransform: 'none',
          padding: '8px 16px'
        }}
      >
        Search
      </Button>
    </Box>
  )
}
export default SearchBar
