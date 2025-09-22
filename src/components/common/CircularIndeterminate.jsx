import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'

function CircularIndeterminate({ size }) {
  return (
    <Box sx={{ display: 'flex' }}>
      <CircularProgress {...(size ? { size } : {})} />
    </Box>
  )
}

export default CircularIndeterminate
