import { Box, Typography } from '@mui/material'
import TextField from '@mui/material/TextField'
import {
  PASSWORD_RULE_MESSAGE,
  PASSWORD_RULE,
  FIELD_REQUIRED_MESSAGE
} from '~/utils/validators'
import Logo from '~/layouts/user/Header/Logo'
import FieldErrorAlert from '~/components/common/FieldErrorAlert'
import { forwardRef, useImperativeHandle } from 'react'
import { useForm } from 'react-hook-form'

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
            type="password"
            {...register('new_password', {
              required: FIELD_REQUIRED_MESSAGE,
              pattern: { value: PASSWORD_RULE, message: PASSWORD_RULE_MESSAGE }
            })}
            error={!!errors['new_password']}
            label="Enter new password"
            fullWidth
          />
          <FieldErrorAlert errors={errors} fieldName={'new_password'} />
        </Box>

        <Box>
          <TextField
            type="password"
            {...register('confirm_password', {
              required: FIELD_REQUIRED_MESSAGE,
              pattern: { value: PASSWORD_RULE, message: PASSWORD_RULE_MESSAGE },
              validate: (value) =>
                value === watch('new_password') || 'Passwords do not match'
            })}
            error={!!errors['confirm_password']}
            label="Confirm password"
            fullWidth
          />
          <FieldErrorAlert errors={errors} fieldName={'confirm_password'} />
        </Box>
      </Box>
    </form>
  )
})
export default FormSetPassword
