import Box from '@mui/material/Box'
import AlertsForm from '~/components/vendor/VendorSetting/AlertsForm'
import OperationForm from '~/components/vendor/VendorSetting/OperationForm'
import VendorSettingSkeleton from '~/components/vendor/VendorSetting/VendorSettingSkeleton'
import CustomCategories from '~/components/vendor/VendorSetting/CustomCategories'
import NotificationDialog from '~/components/common/NotificationDialog'
import ShopAddressForm from '~/components/vendor/VendorSetting/ShopAddressForm'
import { useVendorSetting } from '~/hooks/vendor/setting.hook'

function VendorSetting() {
  const {
    loading,
    address,
    openDialog,
    dialogType,
    handleOpenDialog,
    shopCategoriesTree,
    shopCategoriesCode,
    register,
    setValue,
    errors,
    control,
    categoriesTree,
    open,
    setOpen,
    handleAddressFormSubmit,
    handleAlertFormSubmit,
    handleOperationFormSubmit,
    handleCustomCategoriesFormSubmit,
    DIALOG_CONTENT
  } = useVendorSetting()

  return (
    <Box>
      {loading && <VendorSettingSkeleton />}
      {!loading && (
        <Box
          component="section"
          sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}
        >
          <ShopAddressForm
            address={address}
            control={control}
            errors={errors}
            setValue={setValue}
            handleAddressFormSubmit={handleAddressFormSubmit}
          />

          <AlertsForm
            register={register}
            control={control}
            errors={errors}
            handleOpenDialog={handleOpenDialog}
            handleFormSubmit={handleAlertFormSubmit}
          />

          <OperationForm
            control={control}
            errors={errors}
            handleOpenDialog={handleOpenDialog}
            handleFormSubmit={handleOperationFormSubmit}
          />

          <CustomCategories
            shopCategoriesTree={shopCategoriesTree}
            shopCategoriesCode={shopCategoriesCode}
            open={open}
            setOpen={setOpen}
            categoriesTree={categoriesTree}
            handleOpenDialog={handleOpenDialog}
            handleFormSubmit={handleCustomCategoriesFormSubmit}
          />

          {openDialog && <NotificationDialog {...DIALOG_CONTENT[dialogType]} />}
        </Box>
      )}
    </Box>
  )
}
export default VendorSetting
