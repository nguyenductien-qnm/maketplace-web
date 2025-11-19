import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import LockOpenIcon from '@mui/icons-material/LockOpen'
import BlockIcon from '@mui/icons-material/Block'
import DoneIcon from '@mui/icons-material/Done'
import DoDisturbOnOutlinedIcon from '@mui/icons-material/DoDisturbOnOutlined'
import formatCurrency from '~/utils/formatCurrency'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import Typography from '@mui/material/Typography'
import {
  renderDefault,
  renderCapitalizeFirstLetter
} from '~/components/common/common'

const formatFields = ['product_status', 'product_visibility', 'product_type']

function ProductRow({
  product,
  handleOpenModal,
  handleApproveProduct,
  PRODUCT_TABLE_MAP
}) {
  const renderProductImage = () => (
    <img loading="lazy" src={product.product_image} style={{ width: '50px' }} />
  )

  const renderPriceRange = () =>
    product.product_price_min === product.product_price_max
      ? formatCurrency(product.product_price_min)
      : `${formatCurrency(product.product_price_min)} - ${formatCurrency(
          product.product_price_max
        )}`

  const renderDetailButton = () => (
    <Tooltip title="View detail info">
      <Box
        sx={{ '&:hover': { cursor: 'pointer' } }}
        onClick={() => {
          handleOpenModal({ action: 'detail', product })
        }}
      >
        <InfoOutlinedIcon />
      </Box>
    </Tooltip>
  )

  const renderActionButton = () => {
    const { product_status: status } = product
    if (status === 'approved') {
      return (
        <Tooltip title="Ban product">
          <Button
            color="error"
            variant="outlined"
            onClick={() => handleOpenModal({ action: 'ban', product })}
          >
            <BlockIcon />
          </Button>
        </Tooltip>
      )
    }

    if (status === 'pending') {
      return (
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
      )
    }

    if (status === 'banned') {
      return (
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
      )
    }

    return null
  }

  const renderProductName = () => (
    <>
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
    </>
  )

  const RENDER_MAP = {
    product_name: renderProductName,
    product_image: renderProductImage,
    product_price_range: renderPriceRange,
    detail: renderDetailButton,
    action: renderActionButton
  }

  return (
    <TableRow
      key={product?._id}
      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    >
      {PRODUCT_TABLE_MAP?.map(({ key }) => (
        <TableCell align="left" sx={{ maxWidth: '400px' }} key={key}>
          {RENDER_MAP[key]
            ? RENDER_MAP[key](key)
            : formatFields.includes(key)
            ? renderCapitalizeFirstLetter(product, key)
            : renderDefault(product, key)}
        </TableCell>
      ))}
    </TableRow>
  )
}

export default ProductRow
