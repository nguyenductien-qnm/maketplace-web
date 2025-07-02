import CircularProgress from '@mui/material/CircularProgress'

function SpinnerIcon({ size = 20, color = 'white' }) {
  return <CircularProgress size={size} sx={{ color }} />
}

export default SpinnerIcon
