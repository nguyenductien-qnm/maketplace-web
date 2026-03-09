import { Alert, Box, Button, Divider, Typography } from '@mui/material'
import ProductFormSkeleton from '../components/form/ProductFormSkeleton'
import { PRODUCT_UPDATE_REQUIRES_REAPPROVAL_WARNING_MESSAGE } from '../constants/product.constant'
import DetailInformation from '../components/form/detailInfo/DetailInformation'
import DeliveryInformation from '../components/form/deliveryInfo/DeliveryInformation'
import BasicInformation from '../components/form/basicInfo/BasicInformation'
import SaleInformation from '../components/form/saleInfo/SaleInformation'
import SaveIcon from '@mui/icons-material/Save'
import { useShopProductForm } from '../hook/form/useShopProductForm'

function ProductForm() {
  const { ui, form, data, handlers } = useShopProductForm()
  const { productStatus } = ui

  const { onSubmit } = handlers

  return (
    <form onSubmit={onSubmit}>
      <Box>
        <Typography variant="h4" sx={{ fontWeight: '600', mb: 1 }}>
          {ui.pageTitle}
        </Typography>
        <Divider />
      </Box>

      {ui.loading && <ProductFormSkeleton />}

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        {!ui.loading && (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {ui.isUpdate && (
              <Alert variant="outlined" severity="warning">
                {PRODUCT_UPDATE_REQUIRES_REAPPROVAL_WARNING_MESSAGE.map(
                  (line, index) => (
                    <div key={index}>{line}</div>
                  )
                )}
              </Alert>
            )}
          </Box>
        )}

        <BasicInformation form={form} categoriesTree={data.categoriesTree} />

        <DetailInformation form={form} />

        <SaleInformation
          form={form}
          data={data.safeInfo}
          handlers={handlers.saleInfo}
        />

        <DeliveryInformation form={form} />

        {productStatus != 'banned' && (
          <Button
            type="submit"
            variant="contained"
            fullWidth
            loading={ui.isSubmitting}
            loadingPosition="start"
            disabled={ui.isSubmitting}
          >
            Submit
          </Button>
        )}
      </Box>
    </form>
  )
}

export default ProductForm
