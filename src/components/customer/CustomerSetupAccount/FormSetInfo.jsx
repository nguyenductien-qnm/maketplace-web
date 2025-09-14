import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Logo from '~/layouts/user/Header/Logo'
import {
  FIELD_REQUIRED_MESSAGE,
  NAME_RULE,
  NAME_RULE_MESSAGE,
  PHONE_RULE,
  PHONE_RULE_MESSAGE
} from '~/utils/validators'

function FormSetInfoUser({ register, errors }) {
  return (
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
          {...register('user_name', {
            required: FIELD_REQUIRED_MESSAGE,
            pattern: { value: NAME_RULE, message: NAME_RULE_MESSAGE }
          })}
          type="text"
          label="Full name"
          fullWidth
          error={!!errors['user_name']}
          helperText={errors?.user_name?.message}
        />
        <TextField
          {...register('user_phone', {
            required: FIELD_REQUIRED_MESSAGE,
            pattern: { value: PHONE_RULE, message: PHONE_RULE_MESSAGE }
          })}
          type="text"
          label="Phone number"
          fullWidth
          error={!!errors['user_phone']}
          helperText={errors?.user_phone?.message}
          onInput={(e) => {
            e.target.value = e.target.value.replace(/[^0-9]/g, '')
          }}
        />
      </Box>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Gender</InputLabel>
        <Select
          label="Gender"
          labelId="demo-simple-select-label"
          {...register('user_gender')}
          defaultValue=""
        >
          <MenuItem value="male">Male</MenuItem>
          <MenuItem value="female">Female</MenuItem>
        </Select>
      </FormControl>

      <TextField
        {...register('user_date_of_birth')}
        type="date"
        label="Day of birth"
        fullWidth
        InputLabelProps={{ shrink: true }}
      />
    </Box>
  )
}

export default FormSetInfoUser
