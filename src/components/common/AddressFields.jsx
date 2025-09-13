import { Box, Select, MenuItem, TextField } from '@mui/material'
import TypographyLabel from './TypographyLabel'
import { useAddressOptions } from '~/hooks/common/address.hook'

export default function AddressField({ value, onChange, errors }) {
  const { province, district, ward, street } = value || {}
  const { provinces, districts, wards } = useAddressOptions(province, district)

  const handleChange = (field, val) => {
    const newValue = { ...value, [field]: val }

    if (field === 'province') {
      newValue.district = null
      newValue.ward = null
    }
    if (field === 'district') {
      newValue.ward = null
    }

    onChange(newValue)
  }

  return (
    <Box display="flex" flexDirection="column" gap="15px">
      <Box>
        <TypographyLabel>Province</TypographyLabel>
        <Select
          size="small"
          fullWidth
          value={province || ''}
          onChange={(e) => handleChange('province', e.target.value)}
          error={!!errors?.province}
        >
          {provinces.map((p) => (
            <MenuItem key={p.ProvinceID} value={p.ProvinceID}>
              {p.ProvinceName}
            </MenuItem>
          ))}
        </Select>
      </Box>

      <Box>
        <TypographyLabel>District</TypographyLabel>
        <Select
          size="small"
          fullWidth
          value={district || ''}
          onChange={(e) => handleChange('district', e.target.value)}
          error={!!errors?.district}
          disabled={!province}
        >
          {districts.map((d) => (
            <MenuItem key={d.DistrictID} value={d.DistrictID}>
              {d.DistrictName}
            </MenuItem>
          ))}
        </Select>
      </Box>

      <Box>
        <TypographyLabel>Ward</TypographyLabel>
        <Select
          size="small"
          fullWidth
          value={ward || ''}
          onChange={(e) => handleChange('ward', e.target.value)}
          error={!!errors?.ward}
          disabled={!district}
        >
          {wards.map((w) => (
            <MenuItem key={w.WardCode} value={w.WardCode}>
              {w.WardName}
            </MenuItem>
          ))}
        </Select>
      </Box>

      <Box>
        <TypographyLabel>Street</TypographyLabel>
        <TextField
          size="small"
          fullWidth
          value={street || ''}
          onChange={(e) => handleChange('street', e.target.value)}
          error={!!errors?.street}
        />
      </Box>
    </Box>
  )
}
