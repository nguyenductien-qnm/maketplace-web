import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import Typography from '@mui/material/Typography'
import Tooltip from '@mui/material/Tooltip'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import capitalizeFirstLetter from '~/utils/capitalizeFirstLetter'
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined'
import BlockOutlinedIcon from '@mui/icons-material/BlockOutlined'
import ReplayOutlinedIcon from '@mui/icons-material/ReplayOutlined'
import formatCurrency from '~/utils/formatCurrency'
import { grey, orange } from '@mui/material/colors'
import {
  PRODUCT_STATUS_CHIP_CONFIG,
  PRODUCT_VISIBILITY_CHIP_CONFIG
} from '../../_shared/constant/product.constant'

function ProductRow({ ui, product, handler }) {
  const { handleOpenDetailModal, handleOpenReasonModal } = handler
  const { shop_creator } = product
  return (
    <TableRow
      key={product._id}
      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    >
      <TableCell>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <Box
            component="img"
            loading="lazy"
            src={product.product_image}
            style={{ width: '50px' }}
          />
          <Box sx={{ maxWidth: '350px' }}>
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
                fontWeight: 'bold'
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
        <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
          {shop_creator.shop_name}
        </Typography>
        <Typography variant="caption" sx={{ color: 'grey' }}>
          {shop_creator.shop_code}
        </Typography>
      </TableCell>

      <TableCell>{formatCurrency(200)}</TableCell>

      <TableCell>{product?.product_stock_total}</TableCell>
      <TableCell>{capitalizeFirstLetter(product?.product_type)}</TableCell>
      <TableCell>
        <Chip
          label={PRODUCT_STATUS_CHIP_CONFIG[product?.product_status].label}
          sx={{
            color: 'white',
            backgroundColor:
              PRODUCT_STATUS_CHIP_CONFIG[product?.product_status].color
          }}
        />
      </TableCell>

      <TableCell>
        <Chip
          label={
            PRODUCT_VISIBILITY_CHIP_CONFIG[product?.product_visibility].label
          }
          sx={{
            color:
              PRODUCT_VISIBILITY_CHIP_CONFIG[product?.product_visibility].sx
                .color,
            backgroundColor:
              PRODUCT_VISIBILITY_CHIP_CONFIG[product?.product_visibility].sx
                .bgcolor
          }}
        />
      </TableCell>

      <TableCell>
        <Box
          sx={{
            display: 'flex',
            gap: 1
          }}
        >
          <Tooltip title="View detail this product">
            <RemoveRedEyeOutlinedIcon
              onClick={() => {
                handleOpenDetailModal({ product })
              }}
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

          {product?.product_status == 'approved' && (
            <Tooltip title="Ban this product">
              <BlockOutlinedIcon
                onClick={() =>
                  handleOpenReasonModal({ action: 'ban', product })
                }
                sx={{
                  fontSize: 24,
                  color: orange[500],
                  '&:hover': {
                    cursor: 'pointer',
                    color: orange[900]
                  }
                }}
              />
            </Tooltip>
          )}

          {product?.product_status == 'banned' && (
            <Tooltip title="Unban this product">
              <ReplayOutlinedIcon
                sx={{ '&:hover': { cursor: 'pointer' } }}
                color="success"
                onClick={() =>
                  handleOpenReasonModal({ action: 'unban', product })
                }
              />
            </Tooltip>
          )}
        </Box>
      </TableCell>
    </TableRow>
  )
}
export default ProductRow
