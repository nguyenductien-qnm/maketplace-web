import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Tooltip from '@mui/material/Tooltip'
import AddIcon from '@mui/icons-material/Add'

function CommissionRateHeader({ handleOpenModal }) {
  return (
    <Box
      sx={{
        height: '70px',
        padding: '15px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}
    >
      <Typography
        variant="body2"
        sx={{ fontSize: '1.5rem', fontWeight: 'bold' }}
      >
        Commission Rate
      </Typography>
      <Box sx={{ display: 'flex', gap: '10px' }}>
        <Tooltip title="Create new commission rate">
          <Box>
            <Button
              variant="contained"
              onClick={() => {
                handleOpenModal({ action: 'create' })
              }}
            >
              <AddIcon />
              Create
            </Button>
          </Box>
        </Tooltip>
      </Box>
    </Box>
  )
}

export default CommissionRateHeader
