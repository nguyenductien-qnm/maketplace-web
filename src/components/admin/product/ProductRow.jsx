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
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import { renderDefault } from '~/components/common/common'

const STATUS_COLOR_MAPPING = {
  approved: 'success',
  rejected: 'error',
  banned: 'warning',
  pending: 'info'
}

function ProductRow({
  product,
  handleOpenModal,
  handleApproveProduct,
  PRODUCT_TABLE_MAP
}) {
  const renderProductThumb = (key) => (
    <img loading="lazy" src={product?.[key]} style={{ width: '50px' }} />
  )

  const renderProductStatus = (key) => {
    const value = product?.[key]
    return (
      <Chip
        label={capitalizeFirstLetter(value)}
        color={STATUS_COLOR_MAPPING?.[value]}
        variant="outlined"
        size="small"
      />
    )
  }

  const renderProductVisibility = (key) => {
    const value = product?.[key]
    return (
      <Chip
        label={capitalizeFirstLetter(value)}
        color={value === 'public' ? 'success' : 'default'}
        variant="contained"
        size="small"
        sx={{ width: '60px' }}
      />
    )
  }

  const renderPriceRange = () =>
    product.product_min_price === product.product_max_price
      ? formatCurrency(product.product_min_price)
      : `${formatCurrency(product.product_min_price)} - ${formatCurrency(
          product.product_max_price
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
    const { product_status: status, product_visibility: visibility } = product
    if (status === 'approved' && visibility === 'public') {
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

    if (status === 'pending' && visibility === 'public') {
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

  const RENDER_MAP = {
    product_thumb: renderProductThumb,
    price_range: renderPriceRange,
    product_status: renderProductStatus,
    product_visibility: renderProductVisibility,
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
            ? RENDER_MAP[key]?.(key)
            : renderDefault(product, key)}
        </TableCell>
      ))}
    </TableRow>
  )
}

export default ProductRow
