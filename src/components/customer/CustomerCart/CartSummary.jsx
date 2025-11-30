import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import formatCurrency from '~/utils/formatCurrency'
import { grey, blue } from '@mui/material/colors'
import { useEffect, useState } from 'react'

function CartSummary({ selectedProducts, handleCheckOut }) {
  const [total, setTotal] = useState(0)

  useEffect(() => {
    let totalTmp = 0
    selectedProducts.forEach(
      (p) => (totalTmp += p.product_price * p.product_quantity)
    )
    setTotal(totalTmp)
  }, [selectedProducts])

  return (
    <Card
      sx={{
        minWidth: '100%',
        maxHeight: '1000px',
        overflow: 'hidden',
        overflowY: 'auto'
      }}
    >
      <CardContent>
        <Typography sx={{ fontSize: '16px', fontWeight: '600', mb: 2 }}>
          CART TOTALS
        </Typography>

        {selectedProducts?.map((p) => (
          <Box key={p.product_id}>
            <Typography
              sx={{ fontSize: '14px', overflow: 'hidden', color: 'gray' }}
            >
              {p.product_info.product_name}
            </Typography>
            <Typography sx={{ fontSize: '15px', color: 'gray' }}>
              x {p.product_quantity}
            </Typography>
            <Typography sx={{ fontSize: '14px', overflow: 'hidden', mt: 1 }}>
              <Box component="span" sx={{ fontWeight: 'bold' }}>
                Price:
              </Box>{' '}
              <Box component="span" sx={{ color: 'gray' }}>
                {formatCurrency(p.product_price * p.product_quantity)}
              </Box>
            </Typography>
            <Divider sx={{ mt: 2, mb: 2 }} />
          </Box>
        ))}

        <Typography
          sx={{
            fontSize: '12px',
            color: grey[500],
            marginTop: '15px',
            display: 'flex',
            justifyContent: 'space-between'
          }}
        >
          Total
          <span style={{ fontWeight: 'bold', color: 'black' }}>
            {formatCurrency(total)}
          </span>
        </Typography>
      </CardContent>
    </Card>
  )
}

export default CartSummary
