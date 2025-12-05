import { Box, Divider, Typography } from '@mui/material'
import { Table, TableBody, TableCell, TableRow, Paper } from '@mui/material'
import { blue, grey } from '@mui/material/colors'
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined'
import formatCurrency from '~/utils/formatCurrency'
import VoucherOverview from './VoucherOverview'
import OrderSummary from './OrderSummary'

function CheckoutItem({ shopProductGroup, vouchers, handleSelectedVouchers }) {
  const { shop_name, shop_avatar, products, summary, shop_id } =
    shopProductGroup

  return (
    <Paper sx={{ padding: '25px 10px' }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          paddingLeft: '16px'
        }}
      >
        <StorefrontOutlinedIcon sx={{ color: blue[600] }} />
        <Typography variant="h6">{shop_name || 'Unknow Shop Name'}</Typography>
      </Box>
      <Table sx={{ marginTop: '30px' }}>
        <TableBody>
          {products &&
            products.map((product) => (
              <TableRow
                key={product.product_id}
                sx={{
                  '& td': {
                    borderBottom: '20px solid transparent'
                  },
                  height: '100px'
                }}
              >
                <TableCell
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '20px'
                  }}
                >
                  <img
                    src={product?.product_image}
                    style={{ maxWidth: '70px' }}
                  />
                  <Typography>{product?.product_name}</Typography>
                  {product?.product_variation && (
                    <Typography variant="caption" sx={{ color: grey[600] }}>
                      Variation: {product.product_variation.map((v) => v)}
                    </Typography>
                  )}
                </TableCell>
                <TableCell sx={{ width: '13.33%', textAlign: 'start' }}>
                  <Typography>
                    {formatCurrency(product?.product_price)}
                  </Typography>
                </TableCell>
                <TableCell sx={{ width: '13.33%', textAlign: 'end' }}>
                  <Typography>{product?.product_quantity}</Typography>
                </TableCell>
                <TableCell sx={{ width: '13.33%', textAlign: 'end' }}>
                  <Typography>
                    <b>{formatCurrency(product?.total_price)}</b>
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>

      <OrderSummary summary={summary} />

      <Divider sx={{ mt: '20px' }} />

      {vouchers && (
        <VoucherOverview
          content="Shop Vouchers"
          info={{
            header: `${shop_name} Vouchers`,
            logo: shop_avatar,
            shop_id: shop_id
          }}
          vouchers={vouchers}
          handleSelectedVouchers={handleSelectedVouchers}
        />
      )}
    </Paper>
  )
}
export default CheckoutItem
