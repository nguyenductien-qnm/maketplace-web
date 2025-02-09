import {
  Card,
  CardContent,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material'
import { grey, blue } from '@mui/material/colors'
import { useEffect, useState } from 'react'
import formatCurrency from '~/utils/formatCurrency'

function CartSummary({ selectedProducts }) {
  const [total, setTotal] = useState(0)
  useEffect(() => {
    let totalTmp = 0
    selectedProducts.forEach((p) => (totalTmp += p.product_price * p.quantity))
    setTotal(totalTmp)
  }, [selectedProducts])
  return (
    <Card sx={{ minWidth: '100%' }}>
      <CardContent>
        <Typography
          sx={{ fontSize: '14px', fontWeight: '600', paddingLeft: '16px' }}
        >
          CART TOTALS
        </Typography>

        <TableContainer
          sx={{ maxHeight: 250, overflow: 'auto', marginTop: '15px' }}
        >
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontSize: '12px', fontWeight: 'bold' }}>
                  Product
                </TableCell>
                <TableCell
                  sx={{
                    fontSize: '12px',
                    fontWeight: 'bold',
                    textAlign: 'right'
                  }}
                >
                  Price
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {selectedProducts?.map((p, index) => (
                <TableRow key={index}>
                  {/* Product Name */}
                  <TableCell
                    sx={{
                      fontSize: '12px',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      maxWidth: 150
                    }}
                  >
                    {p.product_name}
                  </TableCell>

                  {/* Product Price */}
                  <TableCell sx={{ fontSize: '12px', textAlign: 'right' }}>
                    {formatCurrency(p.product_price * p.quantity)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Typography
          sx={{
            fontSize: '12px',
            color: grey[500],
            marginTop: '15px',
            display: 'flex',
            justifyContent: 'space-between',
            padding: '0px 16px 0px 16px'
          }}
        >
          Total
          <span style={{ fontWeight: 'bold', color: 'black' }}>
            {formatCurrency(total)}
          </span>
        </Typography>

        <Button
          sx={{
            marginTop: '20px',
            minWidth: '100%',
            backgroundColor: blue[600],
            fontSize: '14px',
            textTransform: 'none',
            fontWeight: '600',
            color: 'white',
            padding: '10px 0'
          }}
        >
          Proceed to checkout
        </Button>
      </CardContent>
    </Card>
  )
}

export default CartSummary
