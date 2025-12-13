import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'

function CircularIndeterminate({ size, height }) {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height
      }}
    >
      <CircularProgress {...(size ? { size } : {})} />
    </Box>
  )
}

export default CircularIndeterminate
