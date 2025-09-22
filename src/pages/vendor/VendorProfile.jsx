import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import FormAddress from '~/components/common/FormAddress'
import TypographyLabel from '~/components/common/TypographyLabel'
import VendorProfileSkeleton from '~/components/vendor/VendorProfile/VendorProfileSkeleton'
import BannerAndAvatarDisplay from '~/components/vendor/VendorProfile/BannerAndAvatarDisplay'
import InputUploadButton from '~/components/vendor/VendorProfile/ImageUploadButtons'
import { useVendorProfileForm } from '~/hooks/vendor/profile.hook'
import { grey } from '@mui/material/colors'
import {
  FIELD_REQUIRED_MESSAGE,
  NAME_RULE,
  NAME_RULE_MESSAGE
} from '~/utils/validators'

function VendorProfile() {
  const {
    address,
    loading,
    register,
    control,
    errors,
    avatarUrl,
    bannerUrl,
    handleUploadImage,
    handleFormSubmit
  } = useVendorProfileForm()
  return (
    <Box>
      {loading && <VendorProfileSkeleton />}
      {!loading && (
        <form onSubmit={handleFormSubmit}>
          <BannerAndAvatarDisplay
            shopBanner={bannerUrl}
            shopAvatar={avatarUrl}
          />
          <InputUploadButton handleUploadImage={handleUploadImage} />
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '15px',
              mt: '20px'
            }}
          >
            <Box sx={{ display: 'flex', gap: '15px' }}>
              <Box flex={1}>
                <TypographyLabel>Shop email *</TypographyLabel>
                <TextField
                  {...register('shop_email')}
                  size="small"
                  fullWidth
                  disabled
                />
              </Box>

              <Box flex={1}>
                <TypographyLabel>Shop phone *</TypographyLabel>
                <TextField
                  {...register('shop_phone')}
                  size="small"
                  fullWidth
                  disabled
                />
              </Box>

              <Box flex={1}>
                <TypographyLabel>Shop name</TypographyLabel>
                <TextField
                  {...register('shop_name', {
                    required: FIELD_REQUIRED_MESSAGE,
                    pattern: {
                      value: NAME_RULE,
                      message: NAME_RULE_MESSAGE
                    }
                  })}
                  size="small"
                  fullWidth
                  error={!!errors['shop_name']}
                  helperText={errors?.shop_name?.message}
                />
              </Box>
            </Box>

            <Box sx={{ display: 'flex', gap: '15px' }}>
              <Box flex={1}>
                <TypographyLabel>Shop CODE *</TypographyLabel>
                <TextField
                  {...register('shop_code')}
                  size="small"
                  fullWidth
                  disabled
                />
              </Box>

              <Box flex={1}>
                <TypographyLabel>Created at *</TypographyLabel>
                <TextField
                  {...register('createdAt')}
                  size="small"
                  fullWidth
                  disabled
                />
              </Box>
            </Box>

            <Box>
              <TypographyLabel>Shop URL *</TypographyLabel>
              <TextField
                {...register('shop_slug')}
                size="small"
                fullWidth
                disabled
              />
            </Box>

            <FormAddress address={address} control={control} errors={errors} />

            <Box>
              <TypographyLabel>Shop intro</TypographyLabel>
              <TextField
                multiline
                rows={6}
                {...register('shop_intro')}
                size="small"
                fullWidth
              />
            </Box>

            <Button
              className="btn-shop-update-profile"
              type="submit"
              sx={{
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
          </Box>
        </form>
      )}
    </Box>
  )
}
export default VendorProfile
