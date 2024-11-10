import Box from '@mui/material/Box'
import InputAdornment from '@mui/material/InputAdornment'
import TextField from '@mui/material/TextField'
import SearchIcon from '@mui/icons-material/Search'
import { blue } from '@mui/material/colors'
function SearchBar() {
  return (
    <TextField
      fullWidth
      label="Search..."
      size="small"
      sx={{
        '& .MuiOutlinedInput-root': {
          '& fieldset': {
            border: '2px solid',
            borderColor: blue[600]
          },
          '&:hover fieldset': {
            border: '2px solid',
            borderColor: blue[600]
          },
          '&.Mui-focused fieldset': {
            border: '2px solid',
            borderColor: blue[600]
          }
        }
      }}
      slotProps={{
        input: {
          endAdornment: (
            <InputAdornment
              position="end"
              sx={{
                backgroundColor: blue[600],
                borderRadius: '5px',
                padding: '2px',
                '& :hover': {
                  cursor: 'pointer'
                }
              }}
            >
              <SearchIcon sx={{ color: 'white' }} />
            </InputAdornment>
          )
        }
      }}
    />
  )
}

export default SearchBar
