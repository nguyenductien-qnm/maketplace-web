import { Checkbox, TableCell, TableRow } from '@mui/material'
import CancelIcon from '@mui/icons-material/Cancel'
import QuantitySelector from '../../ProductDetail/ProductInfo/QuantitySelector'

function CartItemRow({
  handleSelectedProduct,
  removeProduct,
  product,
  setQuantitySelected
}) {
  const handleQuantityChange = (newQuantity) => {
    setQuantitySelected(product, newQuantity)
  }
  return (
    <TableRow>
      <TableCell>
        <Checkbox onClick={() => handleSelectedProduct(product)} />
      </TableCell>
      <TableCell sx={{ maxWidth: '70px', minWidth: '70px' }}>
        <img
          style={{ maxWidth: '100%', objectFit: 'cover' }}
          src={product?.product_thumb}
        />
      </TableCell>
      <TableCell sx={{ fontSize: '14px', fontWeight: '600' }}>
        {product?.product_name}
      </TableCell>
      <TableCell sx={{ fontSize: '14px' }}>${product?.product_price}</TableCell>
      <TableCell>
        <QuantitySelector
          disableAction={false}
          quantitySelected={product?.quantity}
          setQuantitySelected={handleQuantityChange}
        />
      </TableCell>
      <TableCell sx={{ fontSize: '14px', fontWeight: '600' }}>
        ${product?.product_price * product?.quantity}
      </TableCell>
      <TableCell>
        <CancelIcon
          sx={{ color: 'red', '&:hover': { cursor: 'pointer' } }}
          onClick={() => removeProduct(product)}
        />
      </TableCell>
    </TableRow>
  )
}
export default CartItemRow
