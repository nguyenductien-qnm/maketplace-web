import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import promotionImg from '~/assets/user/img/promotion.png'
import Button from '@mui/material/Button'
import styled from '@mui/material/styles/styled'

const CustomButton = styled(Button)({
  backgroundColor: 'black',
  color: '#fff',
  textTransform: 'none',
  fontSize: '12px',
  fontWeight: '800'
})

function Promotion() {
  return (
    <Box
      sx={{
        backgroundColor: '#0D6EFD',
        height: '50px',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative'
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '30px',
          position: 'absolute'
        }}
      >
        <Typography variant="h8" sx={{ color: 'white', fontWeight: '700' }}>
          FREE delivery & 40% Discount for next 3 orders! Place your 1st order
          in.
        </Typography>
        <CustomButton>Shop Now</CustomButton>
      </Box>

      <img src={promotionImg} style={{ width: '100%', height: '50px' }} />
    </Box>
  )
}

export default Promotion
