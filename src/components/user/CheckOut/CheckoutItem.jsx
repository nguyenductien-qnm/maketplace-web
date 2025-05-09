import { Box, Typography } from '@mui/material'
import { Table, TableBody, TableCell, TableRow, Paper } from '@mui/material'
import { blue, grey } from '@mui/material/colors'
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined'
import formatCurrency from '~/utils/formatCurrency'
import VoucherOverview from '~/components/user/CheckOut/VoucherOverview'

function CheckoutItem({ products, vouchers, handleSelectedVouchers }) {
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
        <Typography variant="h6">{products?.shop_name}</Typography>
      </Box>
      <Table>
        <TableBody>
          {products?.products &&
            products?.products.map((product) => (
              <TableRow
                key={product.product_id}
                sx={{
                  '& td': {
                    borderBottom: '20px solid transparent'
                  }
                }}
              >
                <TableCell
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px'
                  }}
                >
                  <img
                    src={product?.product_thumb}
                    style={{ maxWidth: '50px' }}
                  />
                  <Typography>{product?.product_name}</Typography>
                  {product?.product_variation && (
                    <Typography variant="caption" sx={{ color: grey[600] }}>
                      Variation: {product.product_variation.map((v) => v)}
                    </Typography>
                  )}
                </TableCell>
                <TableCell sx={{ width: '13.33%', textAlign: 'start' }}>
                  {formatCurrency(product?.product_price)}
                </TableCell>
                <TableCell sx={{ width: '13.33%', textAlign: 'end' }}>
                  {product?.quantity}
                </TableCell>
                <TableCell sx={{ width: '13.33%', textAlign: 'end' }}>
                  {formatCurrency(product?.product_price * product?.quantity)}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <Box
        sx={{
          display: 'flex',
          marginTop: '25px',
          justifyContent: 'end',
          alignItems: 'center',
          padding: '10px 16px 30px 16px'
        }}
      >
        <Box
          sx={{
            display: 'flex',
            gap: '20px'
          }}
        >
          <Typography>
            Order Total (
            {products?.products.reduce((acc, curr) => {
              return acc + curr.quantity
            }, 0)}
            &nbsp;Item):
          </Typography>
          <Typography sx={{ color: blue[600] }} fontWeight="bold">
            {formatCurrency(
              products?.total_price_product - products?.discount_value
            )}
          </Typography>
        </Box>
      </Box>
      <VoucherOverview
        content={'Voucher shop'}
        vouchers={vouchers}
        handleSelectedVouchers={handleSelectedVouchers}
      />
    </Paper>
  )
}
export default CheckoutItem
