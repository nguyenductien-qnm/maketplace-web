import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography
} from '@mui/material'
import TextField from '@mui/material/TextField'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import Logo from '~/layouts/user/Header/Logo'
import { Controller, useForm } from 'react-hook-form'
import { forwardRef, useImperativeHandle } from 'react'

const FormSetInfoUser = forwardRef((props, ref) => {
  const { register, handleSubmit, control } = useForm()

  const onSubmit = (data) => {
    props.handleSubmitInfo(data)
  }

  useImperativeHandle(ref, () => ({
    submitFormInfo: () => {
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
          Information
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <TextField
            {...register('user_name')}
            type="text"
            label="Full name"
            fullWidth
          />
          <TextField
            {...register('user_phone')}
            type="text"
            label="Phone number"
            fullWidth
          />
        </Box>

        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Gender</InputLabel>
          <Controller
            name="user_gender"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Select {...field} labelId="gender-label" label="Gender">
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
              </Select>
            )}
          />
        </FormControl>

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Controller
            name="user_day_of_birth"
            control={control}
            defaultValue={null}
            render={({ field }) => (
              <DatePicker
                {...field}
                label="Day of birth"
                renderInput={(params) => <TextField {...params} />}
                onChange={(date) => field.onChange(date)}
              />
            )}
          />
        </LocalizationProvider>
      </Box>
    </form>
  )
})
export default FormSetInfoUser
