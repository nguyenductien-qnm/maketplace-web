import { Box, Skeleton, Typography } from '@mui/material'
import { green, grey } from '@mui/material/colors'
import formatCurrency from '~/utils/formatCurrency'

function PriceDisplay({ price }) {
  return (
    <Box>
      {price ? (
        <Box sx={{ display: 'flex', gap: '5px', alignItems: 'end' }}>
          <Typography
            sx={{ color: green[700], fontSize: '28px', fontWeight: '700' }}
          >
            {formatCurrency(price)}
          </Typography>
          {/* <Typography
        sx={{
          fontSize: '20px',
          fontWeight: '700',
          paddingBottom: '3px',
          textDecoration: 'line-through',
          color: grey[400]
        }}
      >
        $87.98
      </Typography> */}
        </Box>
      ) : (
        <Skeleton variant="text" sx={{ fontSize: '28px', width: '300px' }} />
      )}
    </Box>
  )
}
export default PriceDisplay
