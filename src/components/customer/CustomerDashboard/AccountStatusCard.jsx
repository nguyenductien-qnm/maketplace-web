import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { grey } from '@mui/material/colors'

function AccountStatusCard({ title, description, button }) {
  return (
    <Box
      sx={{
        minWidth: '100%',
        border: '1px solid',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 20px',
        borderRadius: '5px',
        borderColor: grey[300]
      }}
    >
      <Box>
        <Typography sx={{ fontWeight: '600' }}>{title}</Typography>
        <Typography sx={{ fontSize: '14px' }}>{description}</Typography>
      </Box>
      {button}
    </Box>
  )
}
export default AccountStatusCard
