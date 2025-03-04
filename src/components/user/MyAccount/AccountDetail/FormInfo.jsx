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
import { Controller, useForm } from 'react-hook-form'
import Avatar from '@mui/material/Avatar'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import { useEffect, useState } from 'react'
import { getUserInfoAPI } from '~/api/user.api'
import { updateUserInfoAPI } from '~/redux/user.slice'
import { useDispatch } from 'react-redux'
import { uploadImageToCloudinary } from '~/helpers/apiSendImage'
import formatDateTimeForInput from '~/utils/formatDateTimeForInput'
import formatDateForInput from '~/utils/formatDateForInput'
import interceptorLoadingElements from '~/utils/interceptorLoading'
function FormInfo() {
  const BoxCustom = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    gap: '7px'
  })

  const dispatch = useDispatch()

  const FormLabelCustom = styled(FormLabel)({
    fontSize: '14px',
    color: 'black',
    fontWeight: '600'
  })

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    control,
    getValues
  } = useForm()

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

  useEffect(() => {
    const getUserInfo = async () => {
      const res = await getUserInfoAPI()
      const userInfo = res.data.metadata
      setFieldData(userInfo)
      setAvatarUrl(userInfo.user_avatar)
    }
    getUserInfo()
  }, [])

  const [avatarUrl, setAvatarUrl] = useState(null)

  const updateUserInfo = async (data) => {
    const res = await dispatch(
      updateUserInfoAPI({ data, loadingClass: '.btn-user-update-info' })
    )
    setFieldData(res.payload.data.metadata)
  }

  const setFieldData = (userInfo) => {
    reset({
      user_avatar: userInfo.user_avatar,
      user_email: userInfo.user_email,
      user_name: userInfo.user_name,
      user_phone: userInfo.user_phone,
      user_gender: userInfo.user_gender,
      user_intro: userInfo.user_intro,
      user_date_of_birth: formatDateForInput(userInfo.user_date_of_birth)
    })
  }

  const handleUploadFileAvatar = async (event) => {
    interceptorLoadingElements(true, '.btn-user-upload-avatar')
    interceptorLoadingElements(true, '.btn-user-update-info')
    const url = await uploadImageToCloudinary(event.target.files[0])
    if (url) setAvatarUrl(url)

    const currentValue = getValues()
    reset({
      ...currentValue,
      user_avatar: url
    })
    interceptorLoadingElements(false, '.btn-user-upload-avatar')
    interceptorLoadingElements(false, '.btn-user-update-info')
  }

  return (
    <form onSubmit={handleSubmit(updateUserInfo)}>
      <FormControl
        sx={{ display: 'flex', flexDirection: 'column', gap: '15px' }}
      >
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
          <FormLabelCustom>Full name *</FormLabelCustom>
          <TextField
            {...register('user_name')}
            size="small"
            fullWidth
          ></TextField>
        </BoxCustom>

        <BoxCustom>
          <FormLabelCustom>Phone number</FormLabelCustom>
          <TextField
            {...register('user_phone')}
            size="small"
            fullWidth
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
                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
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
      </FormControl>
    </form>
  )
}
export default FormInfo
