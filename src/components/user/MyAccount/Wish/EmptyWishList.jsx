import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined'
import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import ReturnButton from '../ReturnButton'
function EmptyWishList() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '40px',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100%'
      }}
    >
      <FavoriteBorderOutlinedIcon sx={{ fontSize: '100px' }} />
      <Typography sx={{ fontSize: '14px' }}>
        The wishlist table is empty.
      </Typography>
      <ReturnButton />
    </Box>
  )
}
export default EmptyWishList
