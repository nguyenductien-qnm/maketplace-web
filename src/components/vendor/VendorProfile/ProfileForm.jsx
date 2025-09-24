import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import TypographyLabel from '~/components/common/TypographyLabel'
import BannerAndAvatarDisplay from '~/components/vendor/VendorProfile/BannerAndAvatarDisplay'
import InputUploadButton from '~/components/vendor/VendorProfile/ImageUploadButtons'
import CircularIndeterminate from '~/components/common/CircularIndeterminate'
import { grey } from '@mui/material/colors'
import {
  FIELD_REQUIRED_MESSAGE,
  NAME_RULE,
  NAME_RULE_MESSAGE
} from '~/utils/validators'

function ProfileForm({
  shop,
  shopBanner,
  shopAvatar,
  register,
  control,
  errors,
  submitting,
  handleFormSubmit
}) {
  return (
    <form onSubmit={handleFormSubmit}>
      <BannerAndAvatarDisplay shopBanner={shopBanner} shopAvatar={shopAvatar} />
      <InputUploadButton control={control} />
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
            <TypographyLabel>Shop Email *</TypographyLabel>
            <TextField
              value={shop?.shop_email}
              size="small"
              fullWidth
              disabled
            />
          </Box>

          <Box flex={1}>
            <TypographyLabel>Shop Phone *</TypographyLabel>
            <TextField
              value={shop?.shop_phone}
              size="small"
              fullWidth
              disabled
            />
          </Box>

          <Box flex={1}>
            <TypographyLabel>Shop Name</TypographyLabel>
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
              value={shop?.shop_code}
              size="small"
              fullWidth
              disabled
            />
          </Box>

          <Box flex={1}>
            <TypographyLabel>Created At *</TypographyLabel>
            <TextField
              value={shop?.createdAt}
              size="small"
              fullWidth
              disabled
            />
          </Box>
        </Box>

        <Box>
          <TypographyLabel>Shop URL *</TypographyLabel>
          <TextField value={shop?.shop_slug} size="small" fullWidth disabled />
        </Box>

        <Box>
          <TypographyLabel>Shop Address</TypographyLabel>
          <TextField
            value={shop?.shop_address}
            size="small"
            fullWidth
            disabled
          />
        </Box>

        <Box>
          <TypographyLabel>Shop Intro</TypographyLabel>
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
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            backgroundColor: grey[200],
            color: 'black',
            fontWeight: '600',
            padding: '10px 20px',
            alignSelf: 'flex-start',
            mt: '15px'
          }}
        >
          {submitting && <CircularIndeterminate size="20px" />} Submit
        </Button>
      </Box>
    </form>
  )
}
export default ProfileForm
