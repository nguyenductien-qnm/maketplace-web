import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import VendorProfileSkeleton from '~/components/vendor/VendorProfile/VendorProfileSkeleton'
import LightboxImage from '~/components/common/LightboxImage'
import ProfileForm from '~/components/vendor/VendorProfile/ProfileForm'
import BusinessInfo from '~/components/vendor/VendorProfile/BusinessInfo'
import PersonalInfo from '~/components/vendor/VendorProfile/PersonalInfo'
import { useVendorProfileForm } from '~/hooks/vendor/profile.hook'

function VendorProfile() {
  const {
    loading,
    submitting,
    openLightBox,
    setOpenLightBox,
    shop,
    shopAvatar,
    shopBanner,
    register,
    control,
    errors,
    handleFormSubmit,
    setSelectImg,
    selectImg
  } = useVendorProfileForm()

  return (
    <Box>
      {loading && <VendorProfileSkeleton />}
      {!loading && (
        <Box>
          <ProfileForm
            shop={shop}
            shopBanner={shopBanner}
            shopAvatar={shopAvatar}
            register={register}
            control={control}
            errors={errors}
            submitting={submitting}
            handleFormSubmit={handleFormSubmit}
          />

          <Divider sx={{ mt: 4, mb: 4 }} />

          {shop?.business_info && (
            <BusinessInfo
              shop={shop}
              setSelectImg={setSelectImg}
              setOpenLightBox={setOpenLightBox}
            />
          )}

          {shop?.personal_info && (
            <PersonalInfo
              shop={shop}
              setSelectImg={setSelectImg}
              setOpenLightBox={setOpenLightBox}
            />
          )}

          {openLightBox && (
            <LightboxImage
              src={selectImg}
              onClose={() => setOpenLightBox(false)}
            />
          )}
        </Box>
      )}
    </Box>
  )
}
export default VendorProfile
