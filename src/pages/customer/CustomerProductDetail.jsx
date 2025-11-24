import Grid from '@mui/material/Grid2'
import UserLayout from '~/layouts/user/UserLayout'
import ProductDetailPanel from '~/components/customer/CustomerProductDetail/ProductDetailPanel'
import ProductGallery from '~/components/customer/CustomerProductDetail/ProductGallery'
import ProductRelated from '~/components/customer/CustomerProductDetail/ProductRelated'
import CustomBreadcrumbs from '~/components/common/CustomBreadcrumbs'
import ShopCard from '~/components/user/Home/ShopCard'
import ProductSpecifications from '~/components/customer/CustomerProductDetail/ProductSpecifications'
import ProductDescriptionReviewTabs from '~/components/customer/CustomerProductDetail/ProductDescriptionReviewTabs'
import ReportProductModal from '~/components/customer/CustomerProductDetail/ReportProductModal'
import ProductDetailSkeleton from './ProductDetailSkeleton'
import { useCustomerProduct } from '~/hooks/user/product.hook'
import { Alert } from '@mui/material'

function CustomerProductDetails() {
  const { ui, data, handler } = useCustomerProduct()
  const { loading, openReportModal } = ui
  const { breakCrumbs, product, shop } = data
  const { handleSubmitReportProduct, handleCloseReportModal } = handler

  return (
    <UserLayout>
      {loading && <ProductDetailSkeleton />}
      {!loading && (
        <>
          <CustomBreadcrumbs breakCrumbs={breakCrumbs} />

          {shop.shop_status == 'paused' && (
            <Alert severity="warning" sx={{ mt: 1 }}>
              This shop is currently paused and temporarily unavailable. Please
              check back later.
            </Alert>
          )}

          <Grid container spacing={3} sx={{ marginTop: '15px' }}>
            <Grid size={6} sx={{ minHeight: '635px' }}>
              <ProductGallery
                images={product.product_images}
                visibility={product.product_visibility}
              />
            </Grid>
            <Grid size={6} sx={{ minHeight: '635px' }}>
              <ProductDetailPanel
                data={{ shop: { ...shop }, product: { ...product } }}
                ui={ui}
                handler={handler}
              />
            </Grid>

            <Grid size={12} sx={{ mt: 5 }}>
              <ShopCard shop={shop} />
            </Grid>

            <Grid size={12} sx={{ mt: 5 }}>
              <ProductSpecifications
                specifications={product?.product_attributes}
              />
            </Grid>

            <Grid size={12} sx={{ mt: 10 }}>
              <ProductDescriptionReviewTabs
                ui={ui}
                product={product}
                handler={handler}
              />
            </Grid>
          </Grid>

          <ProductRelated />

          <ReportProductModal
            open={openReportModal}
            onClose={handleCloseReportModal}
            handleSubmitReportProduct={handleSubmitReportProduct}
          />
        </>
      )}
    </UserLayout>
  )
}

export default CustomerProductDetails
