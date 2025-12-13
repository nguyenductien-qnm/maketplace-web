import { Grid2, Paper, Typography, Box } from '@mui/material'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import BlockIcon from '@mui/icons-material/Block'
import DashboardIcon from '@mui/icons-material/Dashboard'
import EventBusyIcon from '@mui/icons-material/EventBusy'
import { navigate } from '~/helpers/navigation'
import { blue } from '@mui/material/colors'

function VoucherSummary({ summary }) {
  const IconWrapper = ({ icon: Icon, bg, color, size = 60 }) => (
    <Box
      sx={{
        width: size,
        height: size,
        bgcolor: bg,
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <Icon sx={{ fontSize: size * 0.6, color }} />
    </Box>
  )

  const items = [
    {
      label: 'ALL',
      value: summary?.ALL,
      icon: <IconWrapper icon={DashboardIcon} bg="#ECEFF1" color="#607D8B" />,
      color: '#ECEFF1'
    },
    {
      label: 'ONGOING',
      value: summary?.ONGOING,
      icon: <IconWrapper icon={TrendingUpIcon} bg="#C8E6C9" color="#4CAF50" />,
      color: '#C8E6C9'
    },
    {
      label: 'UPCOMING',
      value: summary?.UPCOMING,
      icon: <IconWrapper icon={AccessTimeIcon} bg="#BBDEFB" color="#2196F3" />,
      color: '#BBDEFB'
    },
    {
      label: 'EXPIRED',
      value: summary?.EXPIRED,
      icon: <IconWrapper icon={EventBusyIcon} bg="#FFF9C4" color="#F57F17" />,
      color: '#FFF9C4'
    },
    {
      label: 'BANNED',
      value: summary?.BANNED,
      icon: <IconWrapper icon={BlockIcon} bg="#FFCDD2" color="#D32F2F" />,
      color: '#FFCDD2'
    }
  ]

  return (
    <Grid2 container spacing={2} sx={{ mb: 2 }}>
      {items.map((item) => (
        <Grid2
          size={2.4}
          key={item.label}
          onClick={() =>
            navigate(
              `/admin/vouchers?status=${item.label}&page=1&limit=10&sort_by=newest`
            )
          }
        >
          <Paper
            elevation={1}
            sx={{
              p: '24px 32px',
              transition: '0.2s',
              cursor: 'default',
              '&:hover': {
                boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                transform: 'translateY(-2px)'
              },
              display: 'flex',
              justifyContent: 'space-between'
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'start',
                justifyContent: 'center',
                gap: 1
              }}
            >
              <Typography variant="h6" color="text.secondary">
                {item.label}
              </Typography>
              <Typography variant="h4" fontWeight={600}>
                {item.value}
              </Typography>
            </Box>

            <Box>{item.icon}</Box>
          </Paper>
        </Grid2>
      ))}
    </Grid2>
  )
}
export default VoucherSummary
