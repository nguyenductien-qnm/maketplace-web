import { Box, TextField, Typography } from '@mui/material'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper
} from '@mui/material'
import { blue, grey } from '@mui/material/colors'
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined'
function OrderItem() {
  return (
    <Paper sx={{ padding: '25px 0' }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          paddingLeft: '16px'
        }}
      >
        <StorefrontOutlinedIcon sx={{ color: blue[600] }} />
        <Typography variant="h6">LAMINO OFFICIAL STORE</Typography>
      </Box>
      <Table>
        <TableRow>
          <TableCell
            sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}
          >
            <img src="https://down-vn.img.susercontent.com/file/97183342b884f3448ebc5a00a5fb93de@resize_w80_nl.webp" />
            <Typography>Sạc Anker 1 cổng PowerPort III Pod Lite 65w</Typography>
            <Typography variant="body2" sx={{ color: grey[600] }}>
              Variation: Trắng
            </Typography>
          </TableCell>
          <TableCell sx={{ width: '13.33%', textAlign: 'start' }}>
            ₫305,500
          </TableCell>
          <TableCell sx={{ width: '13.33%', textAlign: 'end' }}>1</TableCell>
          <TableCell sx={{ width: '13.33%', textAlign: 'end' }}>
            ₫305,500
          </TableCell>
        </TableRow>
      </Table>
      <Box
        sx={{
          display: 'flex',
          marginTop: '25px',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '0 16px'
        }}
      >
        <Box
          sx={{
            display: 'flex',
            gap: '10px',
            alignItems: 'center'
          }}
        >
          <Typography>Message for Sellers</Typography>
          <TextField size="small"></TextField>
        </Box>
        <Box
          sx={{
            display: 'flex',
            gap: '20px'
          }}
        >
          <Typography>Order Total (1 Item): </Typography>
          <Typography sx={{ color: blue[600] }} fontWeight="bold">
            ₫313.000
          </Typography>
        </Box>
      </Box>
    </Paper>
  )
}
export default OrderItem
