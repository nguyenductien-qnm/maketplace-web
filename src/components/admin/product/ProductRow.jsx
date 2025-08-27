import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import Tooltip from '@mui/material/Tooltip'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import LockOpenIcon from '@mui/icons-material/LockOpen'
import BlockIcon from '@mui/icons-material/Block'
import DoneIcon from '@mui/icons-material/Done'
import DoDisturbOnOutlinedIcon from '@mui/icons-material/DoDisturbOnOutlined'
import formatCurrency from '~/utils/formatCurrency'
import capitalizeFirstLetter from '~/utils/capitalizeFirstLetter'
import { TableCell, TableRow } from '@mui/material'

function ProductRow({ product, handleOpenModal, handleApproveProduct }) {
  return (
    <TableRow
      key={product?._id}
      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    >
      <TableCell component="th" scope="row">
        <img
          loading="lazy"
          src={product?.product_thumb}
          style={{ width: '50px' }}
        />
      </TableCell>
      <TableCell align="left" sx={{ maxWidth: '400px' }}>
        {product?.product_name}
      </TableCell>
      <TableCell align="left">
        {product.product_min_price === product.product_max_price
          ? formatCurrency(product.product_min_price)
          : `${formatCurrency(product.product_min_price)} - ${formatCurrency(
              product.product_max_price
            )}`}
      </TableCell>
      <TableCell align="left">{product?.product_stock}</TableCell>
      <TableCell align="left">
        <Chip
          label={capitalizeFirstLetter(product.product_status)}
          color={
            product.product_status === 'approved'
              ? 'success'
              : product.product_status === 'rejected'
              ? 'error'
              : product.product_status === 'banned'
              ? 'warning'
              : product.product_status === 'pending'
              ? 'info'
              : 'default'
          }
          variant="outlined"
          size="small"
        />
      </TableCell>

      <TableCell align="left">
        <Chip
          label={capitalizeFirstLetter(product.product_visibility)}
          color={
            product.product_visibility === 'public' ? 'success' : 'default'
          }
          variant="contained"
          size="small"
          sx={{ width: '60px' }}
        />
      </TableCell>
      <TableCell align="left">{product.product_rating_average}</TableCell>
      <TableCell align="left">{product.product_review_count}</TableCell>
      <TableCell align="left">
        <Tooltip title="View detail info">
          <Box
            sx={{
              '&:hover': {
                cursor: 'pointer'
              }
            }}
            onClick={() => {
              handleOpenModal({ action: 'detail', product })
            }}
          >
            <InfoOutlinedIcon />
          </Box>
        </Tooltip>
      </TableCell>

      <TableCell align="left">
        {product?.product_status == 'approved' &&
          product?.product_visibility == 'public' && (
            <Tooltip title="Ban product">
              <Button
                color="error"
                variant="outlined"
                onClick={() => handleOpenModal({ action: 'ban', product })}
              >
                <BlockIcon />
              </Button>
            </Tooltip>
          )}

        {product?.product_status == 'pending' &&
          product?.product_visibility == 'public' && (
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Tooltip title="Approve product">
                <Button
                  className="btn-admin-product-action"
                  variant="outlined"
                  onClick={() => handleApproveProduct({ product })}
                >
                  <DoneIcon />
                </Button>
              </Tooltip>
              <Tooltip title="Reject product">
                <Button
                  color="error"
                  variant="outlined"
                  onClick={() =>
                    handleOpenModal({
                      action: 'reject',
                      product
                    })
                  }
                >
                  <DoDisturbOnOutlinedIcon />
                </Button>
              </Tooltip>
            </Box>
          )}

        {product?.product_status == 'banned' && (
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'nowrap' }}>
            <Tooltip title="Unban product">
              <Button
                color="success"
                variant="outlined"
                onClick={() => handleOpenModal({ action: 'unban', product })}
              >
                <LockOpenIcon />
              </Button>
            </Tooltip>
          </Box>
        )}
      </TableCell>
    </TableRow>
  )
}

export default ProductRow
