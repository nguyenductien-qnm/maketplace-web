import { Box, Typography } from '@mui/material'

function Description({ productDescription }) {
  return (
    <Box>
      <Typography fontSize="h1">{productDescription}</Typography>
    </Box>
  )
}

export default Description
