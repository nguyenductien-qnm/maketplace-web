import Grid from '@mui/material/Grid2'
import StarIcon from '@mui/icons-material/Star'
import { grey, yellow } from '@mui/material/colors'
import { Box, Typography } from '@mui/material'
function Comment() {
  return (
    <Grid container sx={{ height: '150px', alignItems: 'center' }}>
      <Grid item size={1}>
        <img
          style={{ maxWidth: '50%', borderRadius: '9999px' }}
          src="https://secure.gravatar.com/avatar/3384f98a21c5dce2051e8f5a20928b05?s=120&d=mm&r=g"
        />
      </Grid>
      <Grid item size={11}>
        {[...Array(5)].map((_, index) => (
          <StarIcon sx={{ color: yellow[700], fontSize: '18px' }} key={index} />
        ))}
        <Box sx={{ display: 'flex', gap: '5px', marginTop: '-5px' }}>
          <Typography sx={{ color: grey[400], fontWeight: '600' }}>
            Admin
          </Typography>
          <Typography sx={{ color: grey[400] }}> - April 24, 2024</Typography>
        </Box>
        <Typography sx={{ marginTop: '10px' }}>
          Sed perspiciatis unde omnis iste natus aliquam sit voluptatem
          exercitationem doloremque laudantium.
        </Typography>
      </Grid>
    </Grid>
  )
}
export default Comment
