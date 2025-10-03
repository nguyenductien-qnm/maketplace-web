import Box from '@mui/material/Box'
import Grid2 from '@mui/material/Grid2'
import useVendorMetrics from '~/hooks/vendor/metrics.hook'
import MetricsCard from '~/components/vendor/VendorMetrics/MetricsCard'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined'
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined'
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined'
import GradeOutlinedIcon from '@mui/icons-material/GradeOutlined'
import RateReviewOutlinedIcon from '@mui/icons-material/RateReviewOutlined'
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined'
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined'
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined'
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined'
import ReplayOutlinedIcon from '@mui/icons-material/ReplayOutlined'
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined'
import LoopOutlinedIcon from '@mui/icons-material/LoopOutlined'
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined'
import TypographyTitle from '~/components/common/TypographyTitle'
import VendorMetricsSkeleton from '~/components/vendor/VendorMetrics/VendorMetricsSkeleton'

function VendorMetrics() {
  const { loading, metrics } = useVendorMetrics()

  const mappingMetrics = [
    {
      label: 'Product Count',
      number: metrics?.shop_product_count,
      icon: <ShoppingCartOutlinedIcon />
    },
    {
      label: 'Order Count',
      number: metrics?.shop_order_count,
      icon: <AssignmentOutlinedIcon />
    },
    {
      label: 'Total Revenue',
      number: metrics?.shop_revenue,
      icon: <AttachMoneyOutlinedIcon />
    },
    {
      label: 'Average Order Value',
      number:
        metrics?.shop_order_count > 0
          ? (metrics?.shop_revenue / metrics?.shop_order_count).toFixed(2)
          : 0,
      icon: <MonetizationOnOutlinedIcon />
    },
    {
      label: 'Rating',
      number: metrics?.shop_rating,
      icon: <GradeOutlinedIcon />
    },
    {
      label: 'Review Count',
      number: metrics?.shop_review_count,
      icon: <RateReviewOutlinedIcon />
    },
    {
      label: 'Follower Count',
      number: metrics?.shop_follower_count,
      icon: <GroupOutlinedIcon />
    },
    {
      label: 'Complain Count',
      number: metrics?.shop_complaint_count,
      icon: <ErrorOutlineOutlinedIcon />
    },
    {
      label: 'Success Delivery Count',
      number: metrics?.shop_successful_delivery_count,
      icon: <CheckCircleOutlineOutlinedIcon />
    },
    {
      label: 'Cancel Order Count',
      number: metrics?.shop_cancel_order_count,
      icon: <CancelOutlinedIcon />
    },
    {
      label: 'Refund Order Count',
      number: metrics?.shop_refund_order_count,
      icon: <ReplayOutlinedIcon />
    },
    {
      label: 'Unique Customer Count',
      number: metrics?.shop_unique_customer_count,
      icon: <PeopleAltOutlinedIcon />
    },
    {
      label: 'Returning Customer Count',
      number: metrics?.shop_returning_customer_count,
      icon: <LoopOutlinedIcon />
    }
  ]

  return (
    <Box>
      {loading && <VendorMetricsSkeleton />}
      {!loading && (
        <Box>
          <TypographyTitle>Shop Metrics</TypographyTitle>
          <Grid2 container spacing={2} mt={2}>
            {mappingMetrics?.map((m, index) => (
              <Grid2 key={index} size={4}>
                <MetricsCard label={m.label} number={m.number} icon={m.icon} />
              </Grid2>
            ))}
          </Grid2>
        </Box>
      )}
    </Box>
  )
}
export default VendorMetrics
