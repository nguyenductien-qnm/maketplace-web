import { Box, Typography } from '@mui/material'
import { styled } from '@mui/material'

function StoreProductCategory() {
  const CustomTypography = styled(Typography)({
    fontSize: '14px',
    '&:hover': {
      cursor: 'pointer'
    }
  })
  return (
    <Box sx={{ marginTop: '60px' }}>
      <Typography sx={{ fontWeight: '600' }}>Store Product Category</Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '7px',
          marginTop: '15px'
        }}
      >
        <CustomTypography>Furniture</CustomTypography>
        <CustomTypography>Furniture</CustomTypography>
        <CustomTypography>Furniture</CustomTypography>
        <CustomTypography>Furniture</CustomTypography>
        <CustomTypography>Furniture</CustomTypography>
        <CustomTypography>Furniture</CustomTypography>
      </Box>
    </Box>
  )
}
export default StoreProductCategory
