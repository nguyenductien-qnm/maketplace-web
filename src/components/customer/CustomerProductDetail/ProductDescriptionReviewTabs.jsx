import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import ProductReview from './ProductReview/ProductReview'
import TypographyTitle from '~/components/common/TypographyTitle'
import { grey } from '@mui/material/colors'
import { styled } from '@mui/material/styles'

const UnderLine = styled(Box)({
  position: 'absolute',
  bottom: '-10px',
  left: '0',
  width: '100%',
  height: '3px',
  backgroundColor: grey[900]
})

function ProductDescriptionReviewTabs({ ui, product, handler }) {
  const { selectedTab } = ui
  const { handleChangeTab } = handler
  const renderTab = (label, value) => (
    <Box
      sx={{
        position: 'relative',
        '&:hover': {
          cursor: 'pointer'
        }
      }}
      onClick={() => handleChangeTab(value)}
    >
      <TypographyTitle
        sx={{
          color: selectedTab === value ? grey[900] : grey[400]
        }}
      >
        {label}
      </TypographyTitle>
      {selectedTab === value && <UnderLine />}
    </Box>
  )
  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'start',
          gap: '20px'
        }}
      >
        {renderTab('Description', 'description')}
        {renderTab('Review', 'review')}
      </Box>

      <Divider sx={{ marginTop: '10px', marginBottom: '20px' }} />

      {selectedTab === 'description' && (
        <div
          dangerouslySetInnerHTML={{
            __html: product?.product_description || ''
          }}
        />
      )}
      {selectedTab === 'review' && <ProductReview />}
    </Box>
  )
}

export default ProductDescriptionReviewTabs
