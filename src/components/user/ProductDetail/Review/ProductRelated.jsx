import { Box, Button, Typography } from '@mui/material'
import Product from '../../Common/Product'
import Grid from '@mui/material/Grid2'
import { blue } from '@mui/material/colors'

function ProductRelated() {
  return (
    <Box sx={{ marginTop: '40px' }}>
      <Typography sx={{ fontSize: '18px', fontWeight: '600' }}>
        Related product
      </Typography>
      <Grid container spacing={2}>
        {Array.from({ length: 12 }, (_, index) => (
          <Grid size={3} key={index}>
            <Product />
          </Grid>
        ))}
      </Grid>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        <Button
          sx={{
            textTransform: 'none',
            backgroundColor: blue[600],
            color: 'white',
            fontWeight: '600',
            marginTop: '30px',
            minWidth: '200px'
          }}
        >
          See More
        </Button>
      </Box>
    </Box>
  )
}
export default ProductRelated
