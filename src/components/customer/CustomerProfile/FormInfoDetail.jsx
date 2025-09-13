import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Avatar from '@mui/material/Avatar'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import { Controller } from 'react-hook-form'
import { grey } from '@mui/material/colors'
import { useUserProfileForm } from '~/hooks/user/user.hook'
import {
  NAME_RULE,
  NAME_RULE_MESSAGE,
  PHONE_RULE,
  PHONE_RULE_MESSAGE
} from '~/utils/validators'
import VisuallyHiddenInput from '~/components/common/VisuallyHiddenInput'
import TypographyLabel from '~/components/common/TypographyLabel'
import CustomerProfileSkeleton from './CustomerProfileSkeleton'
function FormInfoDetail() {
  const {
    loading,
    register,
    control,
    errors,
    avatarUrl,
    handleUploadFileAvatar,
    handleUpdateProfile
  } = useUserProfileForm()

  return (
    <form onSubmit={handleUpdateProfile}>
      {loading && <CustomerProfileSkeleton />}
      {!loading && (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <Box
            sx={{
              display: 'flex',
              gap: '20px',
              alignItems: 'center',
              marginBottom: '20px'
            }}
          >
            <Avatar src={avatarUrl} sx={{ height: '80px', width: '80px' }} />
            <Button
              className="btn-user-upload-avatar"
              component="label"
              role={undefined}
              variant="contained"
              tabIndex={-1}
              startIcon={<CloudUploadIcon />}
              sx={{ height: '40px' }}
            >
              Upload avatar
              <VisuallyHiddenInput
                type="file"
                {...register('user_avatar')}
                onChange={(e) => {
                  handleUploadFileAvatar(e)
                }}
                multiple
              />
            </Button>
          </Box>

          <Box>
            <TypographyLabel>User CODE *</TypographyLabel>
            <TextField
              {...register('user_code')}
              size="small"
              fullWidth
              disabled
            />
          </Box>

          <Box>
            <TypographyLabel>Email address *</TypographyLabel>
            <TextField
              {...register('user_email')}
              size="small"
              fullWidth
              disabled
            />
          </Box>

          <Box>
            <TypographyLabel>Full name</TypographyLabel>
            <TextField
              {...register('user_name', {
                pattern: { value: NAME_RULE, message: NAME_RULE_MESSAGE }
              })}
              error={!!errors['user_name']}
              helperText={errors?.user_name?.message}
              size="small"
              fullWidth
            />
          </Box>

          <Box>
            <TypographyLabel>Phone number</TypographyLabel>
            <TextField
              {...register('user_phone', {
                pattern: { value: PHONE_RULE, message: PHONE_RULE_MESSAGE }
              })}
              size="small"
              fullWidth
              error={!!errors['user_phone']}
              helperText={errors?.user_phone?.message}
            />
          </Box>

          <Box>
            <FormControl fullWidth>
              <TypographyLabel>Gender</TypographyLabel>
              <Controller
                name="user_gender"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <Select {...field} labelId="gender-label" size="small">
                    <MenuItem value="male">Male</MenuItem>
                    <MenuItem value="female">Female</MenuItem>
                  </Select>
                )}
              />
            </FormControl>
          </Box>

          <Box>
            <TypographyLabel>Intro</TypographyLabel>
            <TextField
              multiline
              rows={3}
              {...register('user_intro')}
              size="small"
              fullWidth
            />
          </Box>

          <Box>
            <TypographyLabel>Date of birth</TypographyLabel>
            <TextField
              type="date"
              {...register('user_date_of_birth')}
              size="small"
              fullWidth
            />
          </Box>

          <Box>
            <TypographyLabel>Created at</TypographyLabel>
            <TextField
              {...register('createdAt')}
              size="small"
              fullWidth
              disabled
            />
          </Box>

          <Button
            className="btn-user-update-info"
            type="submit"
            sx={{
              textTransform: 'none',
              backgroundColor: grey[200],
              color: 'black',
              fontWeight: '600',
              padding: '10px 20px',
              alignSelf: 'flex-start'
            }}
          >
            Submit
          </Button>
        </Box>
      )}
    </form>
  )
}
export default FormInfoDetail
