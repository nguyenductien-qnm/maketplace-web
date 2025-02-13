import { Checkbox, TableCell, TableRow, Typography } from '@mui/material'
import CancelIcon from '@mui/icons-material/Cancel'
import QuantitySelector from '../../ProductDetail/ProductInfo/QuantitySelector'
import formatCurrency from '~/utils/formatCurrency'
import { Link } from 'react-router-dom'

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
      <TableCell>
        <Link
          sx={{
            fontSize: '14px',
            fontWeight: '600',
            '&:hover': { textDecoration: true, cursor: 'pointer' }
          }}
          to={`/product/${
            product?.product_parent_id
              ? product.product_parent_id
              : product.product_id
          }`}
        >
          {product?.product_name}
        </Link>
      </TableCell>
      <TableCell>
        {product?.product_variation?.map((i, index) => (
          <Typography variant="body2" key={index}>
            {i}
          </Typography>
        ))}
      </TableCell>
      <TableCell sx={{ fontSize: '14px' }}>
        {formatCurrency(product?.product_price)}
      </TableCell>
      <TableCell>
        <QuantitySelector
          disableAction={false}
          quantitySelected={product?.quantity}
          setQuantitySelected={handleQuantityChange}
        />
      </TableCell>
      <TableCell sx={{ fontSize: '14px', fontWeight: '600' }}>
        {formatCurrency(product?.product_price * product?.quantity)}
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
