import Typography from '@mui/material/Typography'

function ProductName({ productName }) {
  return (
    <Typography sx={{ fontSize: '28px', fontWeight: '700', marginTop: '10px' }}>
      {productName}
    </Typography>
  )
}
export default ProductName
