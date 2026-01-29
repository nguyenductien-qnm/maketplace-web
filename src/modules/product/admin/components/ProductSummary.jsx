import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Grid2 from '@mui/material/Grid2'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import BlockIcon from '@mui/icons-material/Block'
import DashboardIcon from '@mui/icons-material/Dashboard'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import Skeleton from '@mui/material/Skeleton'
import CountUp from 'react-countup'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import CancelIcon from '@mui/icons-material/Cancel'
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

function ProductSummary({ ui, summary }) {
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
      icon: <IconWrapper icon={DashboardIcon} bg="#ECEFF1" color="#455A64" />,
      color: '#ECEFF1'
    },
    {
      label: 'PENDING',
      value: summary?.PENDING,
      icon: <IconWrapper icon={AccessTimeIcon} bg="#FFF8E1" color="#F9A825" />,
      color: '#FFF8E1'
    },
    {
      label: 'APPROVED PUBLIC',
      key: 'APPROVED_PUBLIC',
      value: summary?.APPROVED_PUBLIC,
      icon: <IconWrapper icon={CheckCircleIcon} bg="#E8F5E9" color="#2E7D32" />,
      color: '#E8F5E9'
    },
    {
      label: 'APPROVED PRIVATE',
      key: 'APPROVED_PRIVATE',
      value: summary?.APPROVED_PRIVATE,
      icon: (
        <IconWrapper icon={VisibilityOffIcon} bg="#E3F2FD" color="#1565C0" />
      ),
      color: '#E3F2FD'
    },
    {
      label: 'BANNED',
      value: summary?.BANNED,
      icon: <IconWrapper icon={BlockIcon} bg="#FDECEA" color="#C62828" />,
      color: '#FDECEA'
    },
    {
      label: 'REJECTED',
      value: summary?.REJECTED,
      icon: <IconWrapper icon={CancelIcon} bg="#EEEEEE" color="#616161" />,
      color: '#EEEEEE'
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
                    `/admin/products?status=${item?.key || item.label}&page=1&limit=10&sort_by=newest`
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
export default ProductSummary
