import Checkbox from '@mui/material/Checkbox'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import LaunchIcon from '@mui/icons-material/Launch'

function CartShopRow({ shop, handler }) {
  const {
    handleSelectShop,
    isAllShopProductsSelected,
    isSomeShopProductSelected
  } = handler
  return (
    <TableRow>
      <TableCell>
        <Checkbox
          checked={isAllShopProductsSelected(shop._id)}
          indeterminate={
            !isAllShopProductsSelected(shop._id) &&
            isSomeShopProductSelected(shop._id)
          }
          onClick={() => handleSelectShop(shop)}
        />
      </TableCell>

      <TableCell colSpan={5}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: '20px'
          }}
        >
          <Typography sx={{ fontWeight: 'bold' }}>{shop.shop_name}</Typography>
          <LaunchIcon
            sx={{
              marginLeft: '-10px',
              backgroundColor: '#d7d6d6ff',
              padding: '5px',
              borderRadius: '999px',
              '&:hover': { cursor: 'pointer' }
            }}
          />
        </Box>
      </TableCell>
    </TableRow>
  )
}
export default CartShopRow
