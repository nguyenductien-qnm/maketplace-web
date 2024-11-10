import { Box, Button, TextField, Typography } from '@mui/material'
import { blue, yellow } from '@mui/material/colors'
import discountIcon from '~/assets/user/img/discountFooter.png'

function NewsletterSignup() {
  return (
    <Box
      sx={{
        paddingTop: '20px',
        display: 'flex',
        justifyContent: 'space-around'
      }}
    >
      <Box sx={{ display: 'flex' }}>
        <img src={discountIcon} />
        <Box>
          <Typography
            sx={{
              fontSize: '20px',
              fontWeight: '700',
              color: 'white'
            }}
          >
            Learn first about discounts
          </Typography>
          <Typography sx={{ color: 'white', fontSize: '14px' }}>
            As well as news, special offers and promotions
          </Typography>
        </Box>
      </Box>
      <Box sx={{ display: 'flex', gap: '10px' }}>
        <TextField
          placeholder="Enter your email address"
          sx={{
            backgroundColor: 'white',
            borderRadius: '4px',
            border: 'none',
            height: '50px',
            width: '300px',
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                border: 'none'
              },
              '&:hover fieldset': {
                border: 'none'
              },
              '&.Mui-focused fieldset': {
                border: 'none'
              }
            }
          }}
        ></TextField>
        <Button
          sx={{
            backgroundColor: yellow[600],
            color: 'black',
            fontWeight: '700',
            padding: '10px 30px',
            height: '50px'
          }}
        >
          SEND
        </Button>
      </Box>
    </Box>
  )
}
export default NewsletterSignup
