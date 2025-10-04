import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import FormAddress from '~/components/common/FormAddress'
import TypographyTitle from '~/components/common/TypographyTitle'
import AlertsForm from '~/components/vendor/VendorSetting/AlertsForm'
import OperationForm from '~/components/vendor/VendorSetting/OperationForm'
import VendorSettingSkeleton from '~/components/vendor/VendorSetting/VendorSettingSkeleton'
import CustomCategories from '~/components/vendor/VendorSetting/CustomCategories'
import { grey } from '@mui/material/colors'
import { useVendorSetting } from '~/hooks/vendor/setting.hook'

function VendorSetting() {
  const {
    loading,
    address,
    shopCategories,
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
    handleCustomCategoriesFormSubmit
  } = useVendorSetting()

  return (
    <Box>
      {loading && <VendorSettingSkeleton />}
      {!loading && (
        <Box>
          <Box
            sx={{
              border: '2px dashed',
              borderColor: grey[400],
              borderRadius: 1,
              p: 4,
              mt: 3
            }}
          >
            <form onSubmit={handleAddressFormSubmit}>
              <TypographyTitle sx={{ mb: 2 }}>Address</TypographyTitle>
              <FormAddress
                address={address}
                control={control}
                errors={errors}
                setValue={setValue}
              />
              <Button
                className="btn-action-setting-owner"
                type="submit"
                sx={{ mt: 5 }}
                variant="contained"
                fullWidth
              >
                Submit
              </Button>
            </form>
          </Box>

          <AlertsForm
            register={register}
            control={control}
            errors={errors}
            handleFormSubmit={handleAlertFormSubmit}
          />

          <OperationForm
            control={control}
            errors={errors}
            handleFormSubmit={handleOperationFormSubmit}
          />

          <CustomCategories
            shopCategories={shopCategories}
            open={open}
            setOpen={setOpen}
            categoriesTree={categoriesTree}
            handleFormSubmit={handleCustomCategoriesFormSubmit}
          />
        </Box>
      )}
    </Box>
  )
}
export default VendorSetting
