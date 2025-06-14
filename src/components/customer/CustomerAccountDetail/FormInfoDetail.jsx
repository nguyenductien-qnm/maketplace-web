import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import {
  Box,
  FormControl,
  FormLabel,
  MenuItem,
  Select,
  styled
} from '@mui/material'
import { grey } from '@mui/material/colors'
import { Controller } from 'react-hook-form'
import Avatar from '@mui/material/Avatar'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import { useUserInfoForm } from '~/hooks/user/user.hook'
import {
  NAME_RULE,
  NAME_RULE_MESSAGE,
  PHONE_RULE,
  PHONE_RULE_MESSAGE
} from '~/utils/validators'
function FormInfoDetail() {
  const BoxCustom = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    gap: '7px'
  })

  const FormLabelCustom = styled(FormLabel)({
    fontSize: '14px',
    color: 'black',
    fontWeight: '600'
  })

  const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1
  })

  const {
    register,
    control,
    formState: { errors },
    avatarUrl,
    handleUploadFileAvatar,
    onSubmit
  } = useUserInfoForm()

  return (
    <form onSubmit={onSubmit}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <Box
          sx={{
            display: 'flex',
            gap: '20px',
            alignItems: 'center',
            marginBottom: '20px'
          }}
        >
          <Avatar
            src={avatarUrl}
            sx={{ height: '80px', width: '80px' }}
          ></Avatar>
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

        <BoxCustom>
          <FormLabelCustom>Email address *</FormLabelCustom>
          <TextField
            {...register('user_email')}
            size="small"
            fullWidth
            disabled
          ></TextField>
        </BoxCustom>

        <BoxCustom>
          <FormLabelCustom>Full name</FormLabelCustom>
          <TextField
            {...register('user_name', {
              pattern: { value: NAME_RULE, message: NAME_RULE_MESSAGE }
            })}
            error={!!errors['user_name']}
            helperText={errors?.user_name?.message}
            size="small"
            fullWidth
          ></TextField>
        </BoxCustom>

        <BoxCustom>
          <FormLabelCustom>Phone number</FormLabelCustom>
          <TextField
            {...register('user_phone', {
              pattern: { value: PHONE_RULE, message: PHONE_RULE_MESSAGE }
            })}
            size="small"
            fullWidth
            error={!!errors['user_phone']}
            helperText={errors?.user_phone?.message}
          ></TextField>
        </BoxCustom>

        <BoxCustom>
          <FormControl fullWidth>
            <FormLabelCustom>Gender</FormLabelCustom>
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
        </BoxCustom>

        <BoxCustom>
          <FormLabelCustom>Intro</FormLabelCustom>
          <TextField
            multiline
            rows={3}
            {...register('user_intro')}
            size="small"
            fullWidth
          ></TextField>
        </BoxCustom>

        <BoxCustom>
          <FormLabelCustom>Date of birth</FormLabelCustom>
          <TextField
            type="date"
            {...register('user_date_of_birth')}
            size="small"
            fullWidth
          ></TextField>
        </BoxCustom>

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
    </form>
  )
}
export default FormInfoDetail
