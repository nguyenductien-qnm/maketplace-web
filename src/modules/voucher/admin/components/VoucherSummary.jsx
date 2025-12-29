import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Grid2 from '@mui/material/Grid2'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import BlockIcon from '@mui/icons-material/Block'
import DashboardIcon from '@mui/icons-material/Dashboard'
import EventBusyIcon from '@mui/icons-material/EventBusy'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import PauseCircleIcon from '@mui/icons-material/PauseCircle'
import Skeleton from '@mui/material/Skeleton'
import CountUp from 'react-countup'
import { navigate } from '~/helpers/navigation'

const SummarySkeleton = () => (
  <Paper
    elevation={1}
    sx={{
      p: '24px 32px',
      height: '130px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}
  >
    <Box>
      <Skeleton variant="text" width={80} height={28} />
      <Skeleton variant="text" width={60} height={40} />
    </Box>

    <Skeleton variant="circular" width={60} height={60} />
  </Paper>
)

function VoucherSummary({ ui, summary }) {
  const { isLoading } = ui

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
      label: 'ACTIVE',
      value: summary?.ACTIVE,
      icon: <IconWrapper icon={CheckCircleIcon} bg="#E8F5E9" color="#2E7D32" />,
      color: '#E8F5E9'
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
      label: 'DISABLED',
      value: summary?.DISABLED,
      icon: <IconWrapper icon={PauseCircleIcon} bg="#E0E0E0" color="#616161" />,
      color: '#E0E0E0'
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
      {(isLoading ? Array.from({ length: items.length }) : items).map(
        (item, index) => (
          <Grid2 size={3} key={item?.label || index}>
            {isLoading ? (
              <SummarySkeleton />
            ) : (
              <Paper
                elevation={1}
                sx={{
                  p: '24px 32px',
                  transition: '0.2s',
                  cursor: 'pointer',
                  '&:hover': {
                    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                    transform: 'translateY(-2px)'
                  },
                  display: 'flex',
                  justifyContent: 'space-between'
                }}
                onClick={() =>
                  navigate(
                    `/admin/vouchers?status=${item.label}&page=1&limit=10&sort_by=newest`
                  )
                }
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
                    <CountUp end={item.value || 0} duration={1} separator="," />
                  </Typography>
                </Box>

                <Box>{item.icon}</Box>
              </Paper>
            )}
          </Grid2>
        )
      )}
    </Grid2>
  )
}
export default VoucherSummary
