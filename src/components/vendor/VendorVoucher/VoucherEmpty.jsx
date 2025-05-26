import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import voucherIcon from '~/assets/discountCode.svg'
import LoyaltyOutlinedIcon from '@mui/icons-material/LoyaltyOutlined'
import { blue } from '@mui/material/colors'
function VoucherEmpty({ setOpenModal, setAction }) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '10px',
        minHeight: '100%'
      }}
    >
      <img src={voucherIcon} style={{ maxHeight: '120px' }} />
      <Typography sx={{ fontSize: '20px', fontWeight: '600' }}>
        No Vouchers Found!
      </Typography>
      <Typography sx={{ fontSize: '20px', fontWeight: '600' }}>
        Start adding vouchers to attract more customers!
      </Typography>
      <Button
        onClick={() => {
          setAction(), setOpenModal()
        }}
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
        <LoyaltyOutlinedIcon />
        Add new voucher
      </Button>
    </Box>
  )
}
export default VoucherEmpty
