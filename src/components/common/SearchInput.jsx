import { Box, Button, TextField } from '@mui/material'

function SearchInput({ searchValue, setSearchValue, handleSearch }) {
  return (
    <Box sx={{ height: '40px', display: 'flex', gap: '7px', mb: '10px' }}>
      <TextField
        hiddenLabel
        size="small"
        sx={{ height: '100%', width: '90%' }}
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      <Button
        onClick={() => handleSearch()}
        variant="contained"
        sx={{ height: '100%', width: '10%' }}
      >
        Search
      </Button>
    </Box>
  )
}
export default SearchInput
