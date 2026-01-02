import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import TypographyTitle from '~/components/common/TypographyTitle'
import AddIcon from '@mui/icons-material/Add'
import VoucherFilter from './VoucherFilter'
import RefreshOutlinedIcon from '@mui/icons-material/RefreshOutlined'
import { Link } from 'react-router-dom'

function VoucherHeader({ ui, data, handler }) {
  const { isRefreshing } = ui
  const { handleRefresh } = handler

  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
      <TypographyTitle>My Vouchers</TypographyTitle>

      <Box sx={{ display: 'flex', gap: 1 }}>
        <Tooltip title="Fetch the latest data">
          <Button
            disabled={isRefreshing}
            variant="outlined"
            onClick={handleRefresh}
            sx={{ p: 1 }}
          >
            <RefreshOutlinedIcon sx={{ mr: 1 }} />
            Refresh
          </Button>
        </Tooltip>

        <VoucherFilter ui={ui} data={data} handler={handler} />

        <Link to="/vendor/voucher/create">
          <Button variant="outlined" sx={{ p: 1 }}>
            <AddIcon sx={{ pr: '5px' }} />
            Create Voucher
          </Button>
        </Link>
      </Box>
    </Box>
  )
}

export default VoucherHeader
