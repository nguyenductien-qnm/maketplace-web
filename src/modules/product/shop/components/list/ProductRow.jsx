import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import Tooltip from '@mui/material/Tooltip'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import Typography from '@mui/material/Typography'
import ModeOutlinedIcon from '@mui/icons-material/ModeOutlined'
import formatCurrency from '~/utils/formatCurrency'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined'
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined'
import { navigate } from '~/helpers/navigation'
import { blue, grey, orange, red } from '@mui/material/colors'

function ProductRow({ product, handler }) {
  const { product_price_min, product_price_max } = product
  const {
    handleOpenDetailModal,
    handleOpenReasonDialog,
    handleOpenConfirmDialog
  } = handler
  return (
    <TableRow>
      <TableCell sx={{ width: '450px' }}>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <img
            style={{ height: '70px', width: '70px', objectFit: 'cover' }}
            src={product.product_image}
            alt="Product"
          />
          <Box>
            {product?.product_visibility === 'private' && (
              <Chip
                label="Private"
                sx={{ mb: 0.5, borderRadius: '5px', height: '25px' }}
              />
            )}
            <Typography
              variant="body2"
              sx={{
                display: '-webkit-box',
                WebkitBoxOrient: 'vertical',
                WebkitLineClamp: 2,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                wordBreak: 'break-word',
                fontWeight: 550,
                color: product?.product_stock_total <= 5 ? 'red' : 'inherit'
              }}
            >
              {product?.product_name}
            </Typography>
            <Typography variant="caption" sx={{ color: 'grey' }}>
              CODE: {product?.product_code}
            </Typography>
          </Box>
        </Box>
      </TableCell>

      <TableCell>
        <Typography variant="body2">
          {product_price_min === product_price_max
            ? formatCurrency(product_price_min)
            : `${formatCurrency(product_price_min)} - ${formatCurrency(
                product_price_max
              )}`}
        </Typography>
      </TableCell>

      <TableCell>
        <Typography variant="body2">{product?.product_stock_total}</Typography>
      </TableCell>

      <TableCell>
        <Typography variant="body2">
          {formatCurrency(product.product_revenue)}
        </Typography>
      </TableCell>

      <TableCell>
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
          <Tooltip title="View detail this product">
            <RemoveRedEyeOutlinedIcon
              onClick={() => handleOpenDetailModal({ product })}
              sx={{
                color: grey[500],
                fontSize: 24,
                '&:hover': {
                  cursor: 'pointer',
                  color: grey[800]
                }
              }}
            />
          </Tooltip>

          {product.product_status !== 'banned' && (
            <Tooltip title="Edit this product">
              <ModeOutlinedIcon
                onClick={() =>
                  navigate(`/vendor/product/update/${product._id}`)
                }
                sx={{
                  fontSize: 24,
                  color: blue[300],
                  '&:hover': {
                    cursor: 'pointer',
                    color: blue[700]
                  }
                }}
              />
            </Tooltip>
          )}

          <Tooltip title="Permanently delete this product">
            <HighlightOffOutlinedIcon
              onClick={() => {
                handleOpenConfirmDialog({ product })
              }}
              sx={{
                fontSize: 24,
                color: red[400],
                '&:hover': {
                  cursor: 'pointer',
                  color: red[700]
                }
              }}
            />
          </Tooltip>

          {(product.product_status == 'banned' ||
            product.product_status == 'rejected') && (
            <Tooltip title="View reason">
              <InfoOutlinedIcon
                sx={{
                  fontSize: 24,
                  color: orange[600],
                  '&:hover': { cursor: 'pointer' }
                }}
                onClick={() => handleOpenReasonDialog({ product })}
              />
            </Tooltip>
          )}
        </Box>
      </TableCell>
    </TableRow>
  )
}
export default ProductRow
