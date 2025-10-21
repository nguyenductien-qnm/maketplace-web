import Box from '@mui/material/Box'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import Typography from '@mui/material/Typography'
import ModeOutlinedIcon from '@mui/icons-material/ModeOutlined'
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined'
import RestoreOutlinedIcon from '@mui/icons-material/RestoreOutlined'
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined'
import formatCurrency from '~/utils/formatCurrency'
import { green, red } from '@mui/material/colors'
import { navigate } from '~/helpers/navigation'
import { Chip } from '@mui/material'

function ProductRow({ product, onOpenModal }) {
  const { product_price_min, product_price_max } = product
  return (
    <TableRow>
      <TableCell>
        <img
          style={{ height: '50px' }}
          src={product.product_images}
          alt="Product"
        />
      </TableCell>
      <TableCell
        sx={{ minWidth: '100px', maxWidth: '200px', overflow: 'hidden' }}
      >
        {product?.product_visibility === 'private' && (
          <Chip
            label="Private"
            sx={{ mb: 1, borderRadius: '5px', height: '25px' }}
          />
        )}
        <Typography
          variant="body2"
          sx={{
            display: '-webkit-box',
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: 3,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            wordBreak: 'break-word',
            mb: 1
          }}
        >
          {product?.product_name}
        </Typography>
        <Typography variant="caption" sx={{ color: 'grey' }}>
          CODE: {product?.product_code}
        </Typography>
      </TableCell>
      <TableCell>{product.product_sku_count}</TableCell>
      <TableCell>{product.product_revenue}</TableCell>
      <TableCell>
        {product_price_min === product_price_max
          ? formatCurrency(product_price_min)
          : `${formatCurrency(product_price_min)}-${formatCurrency(
              product_price_max
            )}`}
      </TableCell>
      <TableCell>{product?.product_stock_total}</TableCell>

      <TableCell sx={{ height: '100%' }}>
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
          {product.deletedAt ? (
            <>
              <RestoreOutlinedIcon
                sx={{
                  fontSize: 24,
                  color: '#1976d2',
                  '&:hover': { cursor: 'pointer' }
                }}
                onClick={() => onOpenModal(product._id, 'restore')}
              />

              <DeleteForeverOutlinedIcon
                sx={{
                  fontSize: 24,
                  color: red[600],
                  '&:hover': { cursor: 'pointer' }
                }}
                onClick={() => onOpenModal(product._id, 'permanentDelete')}
              />
            </>
          ) : (
            <>
              <ModeOutlinedIcon
                onClick={() =>
                  navigate(`/vendor/product/update/${product._id}`)
                }
                sx={{
                  fontSize: 24,
                  color: green[600],
                  '&:hover': { cursor: 'pointer' }
                }}
              />

              <HighlightOffOutlinedIcon
                sx={{
                  fontSize: 24,
                  color: red[600],
                  '&:hover': { cursor: 'pointer' }
                }}
                onClick={() => onOpenModal(product._id, 'softDelete')}
              />
            </>
          )}
        </Box>
      </TableCell>
    </TableRow>
  )
}

export default ProductRow
