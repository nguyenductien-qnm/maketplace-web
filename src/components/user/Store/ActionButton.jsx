import { Box, Button } from '@mui/material'
import AddOutlinedIcon from '@mui/icons-material/AddOutlined'
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined'
import Grid from '@mui/material/Grid2'
import { blue } from '@mui/material/colors'
function ActionButton() {
  return (
    <Grid
      spacing={4}
      container
      sx={{ width: '100%', marginTop: '80px', padding: '40px' }}
    >
      <Grid item size={6}>
        <Button
          fullWidth
          sx={{
            textTransform: 'none',
            backgroundColor: blue[600],
            color: 'white'
          }}
        >
          <AddOutlinedIcon fontSize="small" sx={{ marginRight: '5px' }} />
          Follow
        </Button>
      </Grid>
      <Grid item size={6}>
        <Button fullWidth sx={{ textTransform: 'none', border: '1px solid' }}>
          <ChatBubbleOutlineOutlinedIcon
            fontSize="small"
            sx={{ marginRight: '5px' }}
          />
          Chat
        </Button>
      </Grid>
    </Grid>
  )
}
export default ActionButton
