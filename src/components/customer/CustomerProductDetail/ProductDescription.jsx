import { Box, Typography } from '@mui/material'

function ProductDescription({ productDescription }) {
  return (
    <Box>
      <Typography fontSize="h1">{productDescription}</Typography>
    </Box>
  )
}

export default ProductDescription
