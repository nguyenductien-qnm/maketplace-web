import { Box } from '@mui/material'
import noDataImg from '~/assets/admin/no_data.jpg'
function NoData() {
  return (
    <Box
      sx={{
        width: '50%',
        mx: 'auto'
      }}
    >
      <img src={noDataImg} style={{ width: '100%', objectFit: 'cover' }} />
    </Box>
  )
}
export default NoData
