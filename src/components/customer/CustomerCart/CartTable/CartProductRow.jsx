import Checkbox from '@mui/material/Checkbox'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import Typography from '@mui/material/Typography'
import CancelIcon from '@mui/icons-material/Cancel'
import QuantitySelector from '~/components/customer/CustomerProductDetail/QuantitySelector'
import formatCurrency from '~/utils/formatCurrency'
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'

function CartProductRow({ ui, data, handler }) {
  const { selectedProducts } = ui
  const { shop, product } = data
  const { handleSelectProduct, handleAdjustQuantity } = handler
  return (
    <TableRow
      key={product?.product_id}
      sx={{ opacity: product.is_active ? 1 : 0.5, height: '160px' }}
    >
      <TableCell>
        {product.is_active && (
          <Checkbox
            checked={selectedProducts?.some(
              (p) => p.product_id === product.product_id
            )}
            onChange={() => handleSelectProduct(product)}
          />
        )}
        {!product.is_active && (
          <Chip
            sx={{ height: '30px' }}
            size="small"
            label={product.inactive_reason == 'UNAVAILABLE' && 'Unavailable'}
          />
        )}
      </TableCell>

      <TableCell
        sx={{
          maxWidth: '550px',
          width: selectedProducts?.length > 0 ? '350px' : '100%'
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <img
            style={{
              width: '80px',
              height: '80px',
              objectFit: 'cover',
              borderRadius: '4px'
            }}
            src={product?.product_info?.product_image}
            alt={product?.product_info?.product_name}
          />
          <Box>
            <Typography variant="body2">
              {product?.product_info?.product_name}
            </Typography>
            <Typography sx={{ mt: 0.5 }} variant="caption" color="grey">
              {(() => {
                const tier = product.sku_tier_indices
                const variations = product.product_info.product_variations

                if (variations.length == 0) return

                if (tier.length == 1) {
                  return `Variation: ${variations[0].options[tier[0]]}`
                }

                if (tier.length == 2) {
                  return `Variation: ${variations[0].options[tier[0]]}, ${
                    variations[1].options[tier[1]]
                  }`
                }
              })()}
            </Typography>
          </Box>
        </Box>
      </TableCell>

      <TableCell sx={{ fontSize: '14px' }}>
        {formatCurrency(product?.product_price)}
      </TableCell>

      <TableCell>
        <QuantitySelector
          disableAction={false}
          quantitySelected={product.product_quantity}
          setQuantitySelected={(newQuantity) => {
            handleAdjustQuantity({
              product,
              shop_id: shop._id,
              new_quantity: newQuantity
            })
          }}
        />
      </TableCell>

      <TableCell sx={{ fontSize: '14px', fontWeight: '600' }}>
        {formatCurrency(product?.product_price * product?.product_quantity)}
      </TableCell>

      <TableCell>
        <CancelIcon
          className="btn-user-remove-product"
          sx={{
            color: 'red',
            '&:hover': {
              cursor: 'pointer',
              opacity: 0.7
            }
          }}
          onClick={() => handleRemoveProduct(product)}
        />
      </TableCell>
    </TableRow>
  )
}
export default CartProductRow
