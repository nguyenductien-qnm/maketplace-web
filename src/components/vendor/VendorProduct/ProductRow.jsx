import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import Tooltip from '@mui/material/Tooltip'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import Typography from '@mui/material/Typography'
import ModeOutlinedIcon from '@mui/icons-material/ModeOutlined'
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined'
import PollOutlinedIcon from '@mui/icons-material/PollOutlined'
import formatCurrency from '~/utils/formatCurrency'
import { green, red } from '@mui/material/colors'
import { navigate } from '~/helpers/navigation'

function ProductRow({
  product,
  handleOpenConfirmDialog,
  handleOpenMetricsModal
}) {
  const { product_price_min, product_price_max } = product
  return (
    <TableRow>
      <TableCell sx={{ width: '100px' }}>
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
            mb: 1,
            color: product?.product_stock_total <= 5 ? 'red' : 'inherit',
            fontWeight: product?.product_stock_total <= 5 ? 'bold' : 'normal'
          }}
        >
          {product?.product_name}
        </Typography>
        <Typography variant="caption" sx={{ color: 'grey' }}>
          CODE: {product?.product_code}
        </Typography>
      </TableCell>
      <TableCell>{product.product_sku_count}</TableCell>
      <TableCell>
        {product_price_min === product_price_max
          ? formatCurrency(product_price_min)
          : `${formatCurrency(product_price_min)} - ${formatCurrency(
              product_price_max
            )}`}
      </TableCell>
      <TableCell>{product?.product_stock_total}</TableCell>

      <TableCell>
        <Tooltip title="View product metrics">
          <PollOutlinedIcon
            onClick={() => handleOpenMetricsModal(product._id)}
            sx={{
              fontSize: 24,
              color: '#1976d2',
              '&:hover': { cursor: 'pointer' }
            }}
          />
        </Tooltip>
      </TableCell>

      <TableCell sx={{ height: '100%' }}>
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
          <Tooltip title="Edit this product">
            <ModeOutlinedIcon
              onClick={() => navigate(`/vendor/product/update/${product._id}`)}
              sx={{
                fontSize: 24,
                color: green[600],
                '&:hover': { cursor: 'pointer' }
              }}
            />
          </Tooltip>

          <Tooltip title="Permanently delete this product">
            <DeleteForeverOutlinedIcon
              sx={{
                fontSize: 24,
                color: red[600],
                '&:hover': { cursor: 'pointer' }
              }}
              onClick={() => handleOpenConfirmDialog(product._id)}
            />
          </Tooltip>
        </Box>
      </TableCell>
    </TableRow>
  )
}

export default ProductRow
