import { Box, Typography, Divider } from '@mui/material'
import { blue, grey } from '@mui/material/colors'
import formatCurrency from '~/utils/formatCurrency'
import { useNavigate } from 'react-router-dom'

function OrderProductList({ products = [], orderId }) {
  const navigate = useNavigate()

  return (
    <>
      {products.map((p) => (
        <Box
          key={p?.product_id}
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '20px',
            mb: '10px',
            '&:hover': { cursor: 'pointer' }
          }}
          onClick={() => {
            navigate(`/my-account/order-detail?_id=${orderId}`)
          }}
        >
          <Box sx={{ display: 'flex', gap: '20px' }}>
            <img src={p?.product_thumb} style={{ maxWidth: '70px' }} />
            <Box>
              <Typography variant="body2">{p?.product_name}</Typography>
              {p?.product_variation?.length > 0 && (
                <Box sx={{ display: 'flex' }}>
                  <Typography variant="caption" sx={{ color: grey[600] }}>
                    Variation:{' '}
                  </Typography>
                  {p.product_variation.map((v, idx) => (
                    <Typography
                      key={idx}
                      variant="caption"
                      sx={{ color: grey[600] }}
                    >
                      {v}
                    </Typography>
                  ))}
                </Box>
              )}
              <Typography variant="caption">x{p?.quantity}</Typography>
            </Box>
          </Box>
          <Typography sx={{ color: blue[600] }}>
            {formatCurrency(p?.price)}
          </Typography>
        </Box>
      ))}
      <Divider />
    </>
  )
}

export default OrderProductList
