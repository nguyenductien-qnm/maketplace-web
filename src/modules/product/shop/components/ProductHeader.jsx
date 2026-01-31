import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import TypographyTitle from '~/components/common/TypographyTitle'
import AddIcon from '@mui/icons-material/Add'
import RefreshOutlinedIcon from '@mui/icons-material/RefreshOutlined'
import ProductFilter from './ProductFilter'
import { Link } from 'react-router-dom'

function ProductHeader({ ui, data, handler }) {
  const { isRefreshing } = ui
  const { handleRefresh } = handler

  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
      <TypographyTitle>My Products</TypographyTitle>

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

        <ProductFilter data={data} handler={handler.filter} />

        <Link to="/vendor/product/create">
          <Button variant="outlined" sx={{ p: 1 }}>
            <AddIcon sx={{ mr: 1 }} />
            Create Product
          </Button>
        </Link>
      </Box>
    </Box>
  )
}

export default ProductHeader
