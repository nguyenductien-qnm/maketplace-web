import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import TypographyLabel from './TypographyLabel'
import FieldErrorAlert from './FieldErrorAlert'
import { Controller } from 'react-hook-form'
import { useAddressOptions } from '~/hooks/common/address.hook'
import { FIELD_REQUIRED_MESSAGE } from '~/utils/validators'
import { FormControl, FormHelperText, Typography } from '@mui/material'

function FormAddress({ address, control, errors, isLarge = false }) {
  const { provinces, districts, wards, loadDistricts, loadWards } =
    useAddressOptions({ address })

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: '15px'
      }}
    >
      <Box sx={{ mb: 1 }}>
        <TypographyLabel>Province</TypographyLabel>
        <Controller
          name="province"
          control={control}
          defaultValue={address?.province || null}
          rules={{
            required: FIELD_REQUIRED_MESSAGE
          }}
          render={({ field }) => (
            <FormControl fullWidth error={!!errors['province']}>
              <Select
                size={isLarge ? '' : 'small'}
                value={field?.value?.ProvinceID || ''}
                disabled={provinces?.length === 0}
                onChange={(e) => {
                  const selected = provinces.find(
                    (p) => p.ProvinceID === e.target.value
                  )
                  field.onChange(selected)
                  loadDistricts(selected.ProvinceID)
                }}
              >
                {provinces?.map((p) => (
                  <MenuItem key={p.ProvinceID} value={p.ProvinceID}>
                    {p.ProvinceName}
                  </MenuItem>
                ))}
              </Select>
              {errors?.province && (
                <FormHelperText>{errors.province.message}</FormHelperText>
              )}
            </FormControl>
          )}
        />
      </Box>

      <Box sx={{ mb: 1 }}>
        <TypographyLabel>District</TypographyLabel>
        <Controller
          name="district"
          control={control}
          defaultValue={address?.district || null}
          rules={{
            required: FIELD_REQUIRED_MESSAGE
          }}
          render={({ field }) => (
            <FormControl fullWidth error={!!errors['district']}>
              <Select
                size={isLarge ? '' : 'small'}
                value={field?.value?.DistrictID || ''}
                disabled={districts?.length === 0}
                onChange={(e) => {
                  const selected = districts.find(
                    (d) => d.DistrictID === e.target.value
                  )
                  field.onChange(selected)
                  loadWards(selected.DistrictID)
                }}
                sx={{
                  '&.Mui-disabled.Mui-error': {
                    color: 'error.main',
                    '.MuiOutlinedInput-notchedOutline': {
                      borderColor: 'error.main'
                    }
                  }
                }}
              >
                {districts?.map((d) => (
                  <MenuItem key={d.DistrictID} value={d.DistrictID}>
                    {d.DistrictName}
                  </MenuItem>
                ))}
              </Select>
              {errors?.district && (
                <FormHelperText>{errors.district.message}</FormHelperText>
              )}
            </FormControl>
          )}
        />
      </Box>

      <Box sx={{ mb: 1 }}>
        <TypographyLabel>Ward</TypographyLabel>
        <Controller
          name="ward"
          control={control}
          defaultValue={address?.ward || null}
          rules={{
            required: FIELD_REQUIRED_MESSAGE
          }}
          render={({ field }) => (
            <FormControl fullWidth error={!!errors['ward']}>
              <Select
                size={isLarge ? '' : 'small'}
                value={field?.value?.WardCode || ''}
                disabled={wards?.length === 0}
                onChange={(e) => {
                  const selected = wards.find(
                    (w) => w.WardCode === e.target.value
                  )
                  field.onChange(selected)
                }}
                sx={{
                  '&.Mui-disabled.Mui-error': {
                    color: 'error.main',
                    '.MuiOutlinedInput-notchedOutline': {
                      borderColor: 'error.main'
                    }
                  }
                }}
              >
                {wards?.map((w) => (
                  <MenuItem key={w.WardCode} value={w.WardCode}>
                    {w.WardName}
                  </MenuItem>
                ))}
              </Select>
              {errors?.ward && (
                <FormHelperText>{errors.ward.message}</FormHelperText>
              )}
            </FormControl>
          )}
        />
      </Box>

      <Box sx={{ mb: 1 }}>
        <TypographyLabel>Street</TypographyLabel>
        <Controller
          name="street"
          control={control}
          defaultValue={address?.street || ''}
          rules={{
            required: FIELD_REQUIRED_MESSAGE
          }}
          render={({ field }) => (
            <TextField
              error={!!errors['street']}
              size={isLarge ? '' : 'small'}
              helperText={errors?.street?.message}
              sx={{ width: '100%' }}
              {...field}
            />
          )}
        />
      </Box>
    </Box>
  )
}
export default FormAddress
