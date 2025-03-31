import { Box, TableCell, TableRow, Typography } from '@mui/material'
import { formatDate } from '~/utils/formatDate'
import ModeOutlinedIcon from '@mui/icons-material/ModeOutlined'
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined'
import { green, red } from '@mui/material/colors'
import { useNavigate } from 'react-router-dom'
import RestoreOutlinedIcon from '@mui/icons-material/RestoreOutlined'
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined'
import formatCurrency from '~/utils/formatCurrency'

function ProductRow({ productItem, onOpenModal }) {
  const navigate = useNavigate()

  return (
    <TableRow>
      <TableCell>
        <img
          style={{ height: '50px' }}
          src={productItem.product_thumb}
          alt="Product"
        />
      </TableCell>
      <TableCell sx={{ minWidth: '100px', overflow: 'hidden' }}>
        <Typography
          variant="body2"
          sx={{
            display: '-webkit-box',
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: 3,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            wordBreak: 'break-word'
          }}
        >
          {productItem.product_name}
        </Typography>
      </TableCell>
      <TableCell>
        {productItem.product_status === 'public_pending' && 'Pending'}
        {productItem.product_status === 'public_approved' && 'Approved'}
        {productItem.product_status === 'draft' && 'Draft'}
        {productItem.product_status === 'reject' && 'Reject'}
      </TableCell>
      <TableCell>
        {productItem.product_classifications.length > 0 ? 'YES' : 'NO'}
      </TableCell>
      <TableCell>{productItem.product_stock}</TableCell>
      <TableCell>{formatCurrency(productItem.product_min_price)}</TableCell>
      <TableCell>{formatCurrency(productItem.product_max_price)}</TableCell>
      <TableCell
        sx={{
          whiteSpace: 'nowrap',
          overflow: 'hidden'
        }}
      >
        {formatDate(productItem.createdAt)}
      </TableCell>
      <TableCell sx={{ height: '100%' }}>
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
          {productItem.deletedAt ? (
            <>
              <RestoreOutlinedIcon
                sx={{
                  fontSize: 24,
                  color: '#1976d2',
                  '&:hover': { cursor: 'pointer' }
                }}
                onClick={() => onOpenModal(productItem._id, 'restore')}
              />

              <DeleteForeverOutlinedIcon
                sx={{
                  fontSize: 24,
                  color: red[600],
                  '&:hover': { cursor: 'pointer' }
                }}
                onClick={() => onOpenModal(productItem._id, 'permanentDelete')}
              />
            </>
          ) : (
            <>
              <ModeOutlinedIcon
                onClick={() =>
                  navigate(`/vendor/update-product/${productItem._id}`)
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
                onClick={() => onOpenModal(productItem._id, 'softDelete')}
              />
            </>
          )}
        </Box>
      </TableCell>
    </TableRow>
  )
}

export default ProductRow
