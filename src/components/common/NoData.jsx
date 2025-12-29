import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import InboxOutlinedIcon from '@mui/icons-material/InboxOutlined'

function NoData({
  title = 'No data available',
  description = 'There is no data to display',
  icon
}) {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      py={8}
      sx={{ color: 'text.secondary' }}
    >
      {icon || <InboxOutlinedIcon sx={{ fontSize: 72, mb: 2 }} />}

      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>

      <Typography variant="body2" align="center">
        {description}
      </Typography>
    </Box>
  )
}

export default NoData
