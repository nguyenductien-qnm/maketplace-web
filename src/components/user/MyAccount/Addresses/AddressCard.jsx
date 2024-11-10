import { Box, Button, Typography } from '@mui/material'
import DividerVertical from '../../Common/DividerVertical'
import { blue, grey } from '@mui/material/colors'
function AddressCard() {
  return (
    <Box
      sx={{
        marginTop: '15px',
        marginBottom: '15px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}
    >
      <Box>
        <Box sx={{ display: 'flex', gap: '10px', marginBottom: '5px' }}>
          <Typography>Nguyễn Đức Tiến</Typography>
          <DividerVertical />
          <Typography sx={{ color: grey[600] }}>(+84) 905 494 082</Typography>
        </Box>
        <Typography sx={{ fontSize: '14px', color: grey[600] }}>
          K40/20, Nguyễn Như Hạnh
        </Typography>
        <Typography sx={{ fontSize: '14px', color: grey[600] }}>
          Phường Hòa Minh, Quận Liên Chiểu, Đà Nẵng
        </Typography>
      </Box>
      <Box>
        <Typography
          sx={{
            fontSize: '14px',
            color: blue[600],
            textAlign: 'end',
            marginBottom: '10px',
            '&:hover': {
              fontWeight: '600',
              cursor: 'pointer'
            }
          }}
        >
          Edit
        </Typography>
        <Button
          sx={{
            backgroundColor: grey[200],
            color: 'black',
            fontSize: '12px',
            padding: '5px 10px'
          }}
        >
          Set as default
        </Button>
      </Box>
    </Box>
  )
}
export default AddressCard
