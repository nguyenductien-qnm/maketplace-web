import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import VendorProfileSkeleton from '~/components/vendor/VendorProfile/VendorProfileSkeleton'
import BannerAndAvatarDisplay from '~/components/vendor/VendorProfile/BannerAndAvatarDisplay'
import InputUploadButton from '~/components/vendor/VendorProfile/ImageUploadButtons'
import FormFields from '~/components/vendor/VendorProfile/FormFields'
import { grey } from '@mui/material/colors'
import { useVendorProfile } from '~/hooks/vendor/profile.hook'

function VendorProfile() {
  const {
    loading,
    register,
    errors,
    onSubmit,
    provinces,
    districts,
    wards,
    selectedProvince,
    selectedDistrict,
    selectedWard,
    handleChangeProvince,
    handleChangeDistrict,
    handleChangeWard,
    handleChangeShopName,
    handleUploadImage,
    shopAvatar,
    shopBanner,
    shopStatus,
    checkShopURL
  } = useVendorProfile()

  return (
    <Box>
      {loading && <VendorProfileSkeleton />}
      {!loading && (
        <form onSubmit={onSubmit}>
          <BannerAndAvatarDisplay
            shopBanner={shopBanner}
            shopAvatar={shopAvatar}
          />
          <InputUploadButton handleUploadImage={handleUploadImage} />
          <FormFields
            checkShopURL={checkShopURL}
            shopStatus={shopStatus}
            register={register}
            errors={errors}
            handleChangeShopName={handleChangeShopName}
            provinces={provinces}
            districts={districts}
            wards={wards}
            selectedProvince={selectedProvince}
            selectedDistrict={selectedDistrict}
            selectedWard={selectedWard}
            handleChangeProvince={handleChangeProvince}
            handleChangeDistrict={handleChangeDistrict}
            handleChangeWard={handleChangeWard}
          />
          <Button
            className="btn-shop-update-profile"
            type="submit"
            sx={{
              textTransform: 'none',
              backgroundColor: grey[200],
              color: 'black',
              fontWeight: '600',
              padding: '10px 20px',
              alignSelf: 'flex-start',
              mt: '15px'
            }}
          >
            Submit
          </Button>
        </form>
      )}
    </Box>
  )
}
export default VendorProfile
