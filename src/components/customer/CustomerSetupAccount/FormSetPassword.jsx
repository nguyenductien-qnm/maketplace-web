import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Logo from '~/layouts/user/Header/Logo'
import {
  PASSWORD_RULE_MESSAGE,
  PASSWORD_RULE,
  FIELD_REQUIRED_MESSAGE
} from '~/utils/validators'
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
            helperText={errors?.new_password?.message}
          />
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
            helperText={errors?.confirm_password?.message}
            label="Confirm password"
            fullWidth
          />
        </Box>
      </Box>
    </form>
  )
})
export default FormSetPassword
