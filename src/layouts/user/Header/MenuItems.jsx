import GridViewIcon from '@mui/icons-material/GridView'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import { Box, Typography } from '@mui/material'
import { useDispatch } from 'react-redux'
import { handleCategories } from '~/redux/categories.slice'
import Grid from '@mui/material/Grid2'
function MenuItem() {
  const dispatch = useDispatch()
  return (
    <Grid
      spacing={2}
      container
      sx={{
        display: 'flex',
        alignItems: 'center',
        height: '50px'
      }}
    >
      <Grid size={3}>
        <Box
          onClick={() => dispatch(handleCategories())}
          sx={{
            display: 'flex',
            gap: '20px',
            userSelect: 'none',
            '&:hover': {
              cursor: 'pointer'
            }
          }}
        >
          <Box sx={{ display: 'flex', gap: '5px' }}>
            <GridViewIcon fontSize="small" />
            <Typography sx={{ fontSize: '16px', fontWeight: '600' }}>
              All Categories
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <Typography sx={{ fontSize: '10px' }}>More than 100K</Typography>
            <KeyboardArrowDownIcon fontSize="small" />
          </Box>
        </Box>
      </Grid>

      <Grid size={7} display="flex" justifyContent="start">
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: '40px'
          }}
        >
          <Typography>Home</Typography>
          <Typography>Shop</Typography>
          <Typography>Electronics</Typography>
          <Typography>Furniture</Typography>
          <Typography>Contact</Typography>
          <Typography>Blog</Typography>
        </Box>
      </Grid>

      <Grid size={2} display="flex" justifyContent="end">
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            marginLeft: 'auto'
          }}
        >
          <Typography sx={{ fontSize: '14px', fontWeight: '600' }}>
            ToDay Deal
          </Typography>
          <KeyboardArrowDownIcon fontSize="small" />
        </Box>
      </Grid>
    </Grid>
  )
}

export default MenuItem
