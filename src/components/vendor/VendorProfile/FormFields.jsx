import Box from '@mui/material/Box'
import FormLabel from '@mui/material/FormLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import TextField from '@mui/material/TextField'
import FieldErrorAlert from '~/components/common/FieldErrorAlert'
import {
  FIELD_REQUIRED_MESSAGE,
  NAME_RULE,
  NAME_RULE_MESSAGE,
  PHONE_RULE,
  PHONE_RULE_MESSAGE
} from '~/utils/validators'
import { styled } from '@mui/material/styles'

const BoxCustom = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '7px',
  flex: 1
})
const FormLabelCustom = styled(FormLabel)({
  fontSize: '14px',
  color: 'black',
  fontWeight: '600'
})

function FormFields({
  checkShopURL,
  register,
  errors,
  handleChangeShopName,
  provinces,
  districts,
  wards,
  selectedProvince,
  selectedDistrict,
  selectedWard,
  shopStatus,
  handleChangeProvince,
  handleChangeDistrict,
  handleChangeWard
}) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
        mt: '20px'
      }}
    >
      <Box sx={{ display: 'flex', gap: '15px' }}>
        <BoxCustom>
          <FormLabelCustom>Shop email *</FormLabelCustom>
          <TextField
            {...register('shop_email')}
            size="small"
            fullWidth
            InputProps={{ readOnly: true }}
          ></TextField>
        </BoxCustom>

        <BoxCustom>
          <FormLabelCustom>Shop phone</FormLabelCustom>
          <TextField
            {...register('shop_phone', {
              required: FIELD_REQUIRED_MESSAGE,
              pattern: {
                value: PHONE_RULE,
                message: PHONE_RULE_MESSAGE
              }
            })}
            error={!!errors['shop_phone']}
            size="small"
            fullWidth
            helperText={errors?.shop_phone?.message}
          ></TextField>
        </BoxCustom>

        <BoxCustom>
          <FormLabelCustom>Shop name *</FormLabelCustom>
          <TextField
            {...register('shop_name', {
              required: FIELD_REQUIRED_MESSAGE,
              pattern: {
                value: NAME_RULE,
                message: NAME_RULE_MESSAGE
              }
            })}
            size="small"
            fullWidth
            error={!!errors['shop_name']}
            onBlur={(e) => {
              handleChangeShopName(e)
            }}
            helperText={errors?.shop_name?.message}
          ></TextField>
        </BoxCustom>
      </Box>

      <BoxCustom>
        <FormLabelCustom>Shop URL *</FormLabelCustom>
        <TextField
          {...register('shop_slug', {
            required: FIELD_REQUIRED_MESSAGE
          })}
          error={!!errors['shop_slug']}
          size="small"
          fullWidth
          onBlur={() => {
            checkShopURL()
          }}
          helperText={errors?.shop_slug?.message}
        ></TextField>
      </BoxCustom>

      <BoxCustom>
        <FormLabelCustom>Shop status</FormLabelCustom>
        <Select
          size="small"
          fullWidth
          {...register('shop_status')}
          error={!!errors['shop_status']}
          value={shopStatus}
        >
          <MenuItem value="active">Active</MenuItem>
          <MenuItem value="paused">Paused</MenuItem>
        </Select>
      </BoxCustom>

      <Box sx={{ display: 'flex', gap: '15px' }}>
        <BoxCustom>
          <FormLabelCustom>Province/city</FormLabelCustom>
          <Select
            {...register('province', {
              required: FIELD_REQUIRED_MESSAGE
            })}
            sx={{ minWidth: '100%' }}
            size="small"
            error={!!errors['province']}
            value={selectedProvince?.ProvinceID || ''}
            onChange={(e) => handleChangeProvince(e)}
            disabled={provinces?.length === 0}
          >
            {provinces &&
              provinces.map((item, index) => (
                <MenuItem key={index} value={item.ProvinceID}>
                  {item.ProvinceName}
                </MenuItem>
              ))}
          </Select>
          <FieldErrorAlert errors={errors} fieldName="province" />
        </BoxCustom>

        <BoxCustom>
          <FormLabelCustom>District</FormLabelCustom>
          <Select
            {...register('district', {
              required: FIELD_REQUIRED_MESSAGE
            })}
            size="small"
            sx={{ minWidth: '100%' }}
            value={selectedDistrict?.DistrictID || ''}
            onChange={(e) => handleChangeDistrict(e)}
            disabled={districts?.length === 0}
          >
            {districts &&
              districts.map((item, index) => (
                <MenuItem key={index} value={item.DistrictID}>
                  {item.DistrictName}
                </MenuItem>
              ))}
          </Select>
          <FieldErrorAlert errors={errors} fieldName="district" />
        </BoxCustom>

        <BoxCustom>
          <FormLabelCustom>Ward</FormLabelCustom>
          <Select
            size="small"
            sx={{ minWidth: '100%' }}
            {...register('ward', {
              required: FIELD_REQUIRED_MESSAGE
            })}
            value={selectedWard?.WardCode || ''}
            onChange={(e) => handleChangeWard(e)}
            disabled={wards?.length === 0}
          >
            {wards &&
              wards.map((item, index) => (
                <MenuItem key={index} value={item.WardCode}>
                  {item.WardName}
                </MenuItem>
              ))}
          </Select>
          <FieldErrorAlert errors={errors} fieldName="ward" />
        </BoxCustom>

        <BoxCustom>
          <FormLabelCustom>Street</FormLabelCustom>
          <TextField
            size="small"
            sx={{ minWidth: '100%' }}
            {...register('street', {
              required: FIELD_REQUIRED_MESSAGE
            })}
          />
          <FieldErrorAlert errors={errors} fieldName="street" />
        </BoxCustom>
      </Box>

      <BoxCustom>
        <FormLabelCustom>Shop intro</FormLabelCustom>
        <TextField
          multiline
          rows={6}
          {...register('shop_intro')}
          size="small"
          fullWidth
        ></TextField>
      </BoxCustom>
    </Box>
  )
}
export default FormFields
