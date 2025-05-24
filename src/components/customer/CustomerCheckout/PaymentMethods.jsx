import { Box, Paper, Typography } from '@mui/material'
import { blue, grey } from '@mui/material/colors'

function PaymentMethods({
  paymentMethods,
  paymentMethodSelected,
  setPaymentMethodSelected
}) {
  return (
    <Paper
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '20px 16px'
      }}
    >
      <Typography>Payment Method</Typography>
      <Box sx={{ display: 'flex', gap: '5px' }}>
        {paymentMethods?.map((i) => (
          <Box
            key={i.id}
            sx={{
              border: '2px solid',
              borderColor:
                paymentMethodSelected?.id === i.id ? blue[600] : grey[300],
              color: paymentMethodSelected?.id === i.id ? blue[600] : grey[300],
              padding: '0px 30px',
              borderRadius: '5px',
              '&:hover': {
                cursor: 'pointer',
                borderColor:
                  paymentMethodSelected?.id === i.id ? blue[700] : grey[400],
                color:
                  paymentMethodSelected?.id === i.id ? blue[700] : grey[400]
              },
              display: 'flex'
            }}
            onClick={() => {
              setPaymentMethodSelected({ id: i?.id })
            }}
          >
            <img style={{ maxWidth: '40px', minWidth: '40px' }} src={i.img} />
          </Box>
        ))}
      </Box>
    </Paper>
  )
}
export default PaymentMethods
