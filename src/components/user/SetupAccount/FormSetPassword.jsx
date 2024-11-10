import { Box, Typography } from '@mui/material'
import Logo from '~/layouts/user/Header/Logo'
import TextField from '@mui/material/TextField'
import { useForm } from 'react-hook-form'
import {
  PASSWORD_RULE_MESSAGE,
  PASSWORD_RULE,
  FIELD_REQUIRED_MESSAGE
} from '~/utils/validators'
import { forwardRef, useImperativeHandle } from 'react'
import FieldErrorAlert from '~/components/FieldErrorAlert'

const FormSetPassword = forwardRef((props, ref) => {
  const {
    watch,
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()

  const onSubmit = (data) => {
    props.handleSubmitPassword(data)
  }

  useImperativeHandle(ref, () => ({
    submitFormPassword: () => {
      handleSubmit(onSubmit)()
    }
  }))

  return (
    <form ref={ref} onSubmit={handleSubmit(onSubmit)}>
      <Box
        sx={{
          width: '100%',
          marginTop: '30px',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px'
        }}
      >
        <Logo />
        <Typography sx={{ fontSize: '30px', fontWeight: '600' }}>
          Change your password
        </Typography>
        <Typography variant="body2" color="grey">
          Enter new password after active your account
        </Typography>

        <Box>
          <TextField
            {...register('newPassword', {
              required: FIELD_REQUIRED_MESSAGE,
              pattern: { value: PASSWORD_RULE, message: PASSWORD_RULE_MESSAGE }
            })}
            error={!!errors['newPassword']}
            label="Enter new password"
            fullWidth
          />
          <FieldErrorAlert errors={errors} fieldName={'newPassword'} />
        </Box>

        <Box>
          <TextField
            {...register('repeatPassword', {
              required: FIELD_REQUIRED_MESSAGE,
              pattern: { value: PASSWORD_RULE, message: PASSWORD_RULE_MESSAGE },
              validate: (value) =>
                value === watch('newPassword') || 'Passwords do not match'
            })}
            error={!!errors['repeatPassword']}
            label="Confirm password"
            fullWidth
          />
          <FieldErrorAlert errors={errors} fieldName={'repeatPassword'} />
        </Box>
      </Box>
    </form>
  )
})
export default FormSetPassword
