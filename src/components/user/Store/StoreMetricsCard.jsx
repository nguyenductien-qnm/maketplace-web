import { Box, styled, Typography } from '@mui/material'
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined'
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined'
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined'
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined'
import Grid from '@mui/material/Grid2'
import { blue, grey } from '@mui/material/colors'
function StoreMetricsCard() {
  const CustomBox = styled(Box)({
    display: 'flex',
    gap: '10px',
    color: grey[600]
  })

  const CustomTypography = styled(Typography)({
    color: blue[600],
    fontWeight: '600'
  })
  return (
    <Grid sx={{ width: '100%', paddingTop: '80px' }} container>
      <Grid
        item
        size={6}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '40px'
        }}
      >
        <CustomBox>
          <Inventory2OutlinedIcon fontSize="small" />
          <Typography>Product:</Typography>
          <CustomTypography>247</CustomTypography>
        </CustomBox>
        <CustomBox>
          <PeopleAltOutlinedIcon fontSize="small" />
          <Typography>Followers:</Typography>
          <CustomTypography>1879</CustomTypography>
        </CustomBox>
      </Grid>
      <Grid
        item
        size={6}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '40px'
        }}
      >
        <CustomBox sx={{}}>
          <StarBorderOutlinedIcon fontSize="small" />
          <Typography>Rating:</Typography>
          <CustomTypography>4.6</CustomTypography>
        </CustomBox>
        <CustomBox sx={{}}>
          <CheckCircleOutlinedIcon fontSize="small" />
          <Typography>Joined:</Typography>
          <CustomTypography>10-31-2018</CustomTypography>
        </CustomBox>
      </Grid>
    </Grid>
  )
}
export default StoreMetricsCard
