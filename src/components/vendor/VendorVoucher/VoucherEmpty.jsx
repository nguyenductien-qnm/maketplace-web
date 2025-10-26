import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import voucherIcon from '~/assets/discountCode.svg'
import AddIcon from '@mui/icons-material/Add'
import { blue } from '@mui/material/colors'
import { Link } from 'react-router-dom'

function VoucherEmpty() {
  return (
    <Box
      sx={{
        mt: 10,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '10px',
        height: '600px'
      }}
    >
      <img src={voucherIcon} style={{ maxHeight: '120px' }} />
      <Typography sx={{ fontSize: '20px', fontWeight: '600' }}>
        No Vouchers Found!
      </Typography>
      <Typography sx={{ fontSize: '20px', fontWeight: '600' }}>
        Start adding vouchers to attract more customers!
      </Typography>
      <Link to="/vendor/voucher/create">
        <Button
          sx={{
            mt: '10px',
            fontSize: '14px',
            padding: '5px 20px',
            color: 'white',
            backgroundColor: blue[600],
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px'
          }}
        >
          <AddIcon />
          Add New Voucher
        </Button>
      </Link>
    </Box>
  )
}
export default VoucherEmpty
