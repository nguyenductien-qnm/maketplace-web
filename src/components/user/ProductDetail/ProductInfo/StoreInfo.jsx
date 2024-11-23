import { Box, Typography } from '@mui/material'
import Grid from '@mui/material/Grid2'
import StarIcon from '@mui/icons-material/Star'
import { grey, yellow } from '@mui/material/colors'

function StoreInfo() {
  return (
    <Grid
      sx={{
        marginTop: '30px',
        width: '100%',
        height: '80px',
        border: '1px solid',
        borderColor: grey[300],
        borderRadius: '5px',
        display: 'flex'
      }}
      container
      spacing={2}
    >
      <Grid size={2}>
        <img
          src="https://klbtheme.com/bevesi/wp-content/uploads/2024/05/cropped-style-3.png"
          style={{
            maxWidth: '100%',
            height: '50px',
            borderRadius: '9999px',
            marginLeft: '20px',
            marginTop: '15px'
          }}
        />
      </Grid>
      <Grid size={7} sx={{ marginTop: '15px' }}>
        <Typography sx={{ fontSize: '14px', color: grey[500] }}>
          Store
        </Typography>
        <Typography sx={{ fontWeight: '600' }}>Djewno</Typography>
      </Grid>
      <Grid size={3} sx={{ marginTop: '20px' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Box sx={{ display: 'flex', justifyContent: 'center', marginY: 1 }}>
            {[...Array(5)].map((_, index) => (
              <StarIcon
                sx={{ color: yellow[700], fontSize: '15px' }}
                key={index}
              />
            ))}
          </Box>
          <Typography sx={{ color: grey[400], fontSize: '12px' }}>
            5.0
          </Typography>
        </Box>
      </Grid>
    </Grid>
  )
}
export default StoreInfo
