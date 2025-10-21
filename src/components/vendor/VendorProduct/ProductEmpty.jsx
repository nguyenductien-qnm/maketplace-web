import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import noProductFound from '~/assets/user/svgIcon/no-product-found.svg'
import BusinessCenterOutlinedIcon from '@mui/icons-material/BusinessCenterOutlined'
import AddIcon from '@mui/icons-material/Add'
import { blue } from '@mui/material/colors'
import { Link } from 'react-router-dom'
function ProductEmpty() {
  return (
    <Box
      sx={{
        mt: 10,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '10px',
        minHeight: '100%'
      }}
    >
      <img src={noProductFound} />
      <Typography sx={{ fontSize: '20px', fontWeight: '600' }}>
        No Products Found!
      </Typography>
      <Typography sx={{ fontSize: '20px', fontWeight: '600' }}>
        Ready to start selling something awesome?
      </Typography>
      <Link to="/vendor/product/create">
        <Button
          sx={{
            mt: '20px',
            fontSize: '14px',
            padding: '5px 20px',
            color: 'white',
            backgroundColor: blue[600],
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px'
          }}
        >
          <AddIcon />
          Add new product
        </Button>
      </Link>
    </Box>
  )
}
export default ProductEmpty
