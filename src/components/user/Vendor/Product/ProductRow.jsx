import { Box, Checkbox, TableCell, TableRow } from '@mui/material'
import formatDate from '~/utils/formatDate.js'
import ModeOutlinedIcon from '@mui/icons-material/ModeOutlined'
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined'
import { green, red } from '@mui/material/colors'
import { useNavigate } from 'react-router-dom'
function ProductRow({ productItem }) {
  const navigate = useNavigate()
  return (
    <TableRow>
      <TableCell>
        <Checkbox size="small" />
      </TableCell>
      <TableCell>
        <img style={{ height: '50px' }} src={productItem.product_thumb} />
      </TableCell>
      <TableCell sx={{ maxWidth: '200px' }}>
        {productItem.product_name}
      </TableCell>
      <TableCell>{productItem.product_status}</TableCell>
      <TableCell>
        {productItem.product_classifications.length > 0 ? 'YES' : 'NO'}
      </TableCell>
      <TableCell>{productItem.product_stock}</TableCell>
      <TableCell>{productItem.product_price}</TableCell>
      <TableCell>{formatDate(productItem.createdAt)}</TableCell>
      <TableCell sx={{ height: '100%' }}>
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
          <ModeOutlinedIcon
            onClick={() => {
              navigate(`/vendor/update-product/${productItem._id}`)
            }}
            sx={{
              fontSize: 24,
              color: green[600],
              '&:hover': {
                cursor: 'pointer'
              }
            }}
          />
          <HighlightOffOutlinedIcon sx={{ fontSize: 24, color: red[600] }} />
        </Box>
      </TableCell>
    </TableRow>
  )
}
export default ProductRow
