import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import FormControlLabel from '@mui/material/FormControlLabel'
import TextField from '@mui/material/TextField'
import Checkbox from '@mui/material/Checkbox'
import Fade from '@mui/material/Fade'
import TypographyLabel from '~/components/common/TypographyLabel'
import FieldErrorAlert from '~/components/common/FieldErrorAlert'
import {
  FIELD_REQUIRED_MESSAGE,
  NAME_RULE,
  NAME_RULE_MESSAGE,
  PHONE_RULE,
  PHONE_RULE_MESSAGE
} from '~/utils/validators'
import { grey } from '@mui/material/colors'
import { useAddressForm } from '~/hooks/user/user.hook'
import { modalConfig, modalStyle } from '~/config/modal'
import { Controller } from 'react-hook-form'
import { useAddressOptions } from '~/hooks/common/address.hook'
import { MenuItem, Select } from '@mui/material'

function CustomerAddressForm({
  action,
  open,
  address,
  onSubmit,
  onClose,
  handleDeleteAddress
}) {
  const { register, handleFormSubmit, errors, isSubmitting, control } =
    useAddressForm({
      action,
      address,
      onSubmit
    })

  const { provinces, districts, wards, loadDistricts, loadWards } =
    useAddressOptions({ address })

  return (
    <Modal
      open={open}
      onClose={() => {
        if (isSubmitting) return
        onClose()
      }}
      {...modalConfig}
    >
      <Fade in={open}>
        <form onSubmit={handleFormSubmit}>
          <Box sx={modalStyle(500)}>
            <Typography variant="h6" mb={2}>
              {action === 'create' && 'Create Address'}
              {action === 'update' && 'Update Address'}
            </Typography>

            <Box sx={{ width: '100%', gap: '10px', display: 'flex', mb: 1 }}>
              <Box sx={{ flex: 1 }}>
                <TypographyLabel>Full name</TypographyLabel>
                <TextField
                  fullWidth
                  size="small"
                  {...register('full_name', {
                    required: FIELD_REQUIRED_MESSAGE,
                    pattern: { value: NAME_RULE, message: NAME_RULE_MESSAGE }
                  })}
                  error={!!errors.full_name}
                />
                <FieldErrorAlert errors={errors} fieldName="full_name" />
              </Box>

              <Box sx={{ flex: 1 }}>
                <TypographyLabel>Phone number</TypographyLabel>
                <TextField
                  fullWidth
                  size="small"
                  {...register('phone_number', {
                    required: FIELD_REQUIRED_MESSAGE,
                    pattern: { value: PHONE_RULE, message: PHONE_RULE_MESSAGE }
                  })}
                  error={!!errors.phone_number}
                  onInput={(e) => {
                    e.target.value = e.target.value.replace(/[^0-9]/g, '')
                  }}
                />
                <FieldErrorAlert errors={errors} fieldName="phone_number" />
              </Box>
            </Box>

            <Box sx={{ mb: 1 }}>
              <TypographyLabel>Province</TypographyLabel>
              <Controller
                name="province"
                control={control}
                defaultValue={address?.province || null}
                render={({ field }) => (
                  <Select
                    size="small"
                    sx={{ width: '100%' }}
                    value={field.value?.ProvinceID || ''}
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
                )}
              />
            </Box>

            <Box sx={{ mb: 1 }}>
              <TypographyLabel>District</TypographyLabel>
              <Controller
                name="district"
                control={control}
                defaultValue={address?.district || null}
                render={({ field }) => (
                  <Select
                    size="small"
                    sx={{ width: '100%' }}
                    value={field.value?.DistrictID || ''}
                    onChange={(e) => {
                      const selected = districts.find(
                        (d) => d.DistrictID === e.target.value
                      )
                      field.onChange(selected)
                      loadWards(selected.DistrictID)
                    }}
                  >
                    {districts?.map((d) => (
                      <MenuItem key={d.DistrictID} value={d.DistrictID}>
                        {d.DistrictName}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
            </Box>

            <Box sx={{ mb: 1 }}>
              <TypographyLabel>Ward</TypographyLabel>
              <Controller
                name="ward"
                control={control}
                defaultValue={address?.ward || null}
                render={({ field }) => (
                  <Select
                    size="small"
                    sx={{ width: '100%' }}
                    value={field.value?.WardCode || ''}
                    onChange={(e) => {
                      const selected = wards.find(
                        (w) => w.WardCode === e.target.value
                      )
                      field.onChange(selected)
                    }}
                  >
                    {wards?.map((w) => (
                      <MenuItem key={w.WardCode} value={w.WardCode}>
                        {w.WardName}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
            </Box>

            <Box sx={{ mb: 1 }}>
              <TypographyLabel>Street</TypographyLabel>
              <Controller
                name="street"
                control={control}
                defaultValue={address?.street || ''}
                render={({ field }) => (
                  <TextField size="small" sx={{ width: '100%' }} {...field} />
                )}
              />
            </Box>

            {action === 'create' && (
              <FormControlLabel
                control={
                  <Checkbox
                    {...register('default')}
                    size="small"
                    defaultChecked
                  />
                }
                label="Set as default address"
                sx={{ mt: 1, '& .MuiTypography-root': { fontSize: '14px' } }}
              />
            )}

            <Box sx={{ display: 'flex', justifyContent: 'end', gap: 1, mt: 2 }}>
              <Button
                className="btn-action-user-address"
                onClick={() => {
                  if (isSubmitting) return
                  onClose()
                }}
                sx={{ backgroundColor: grey[300], color: 'black' }}
              >
                Cancel
              </Button>

              {action === 'update' && (
                <Button
                  color="error"
                  variant="contained"
                  className="btn-action-user-address"
                  onClick={() => handleDeleteAddress({ _id: address?._id })}
                >
                  Delete
                </Button>
              )}

              <Button
                variant="contained"
                type="submit"
                className="btn-action-user-address"
              >
                Submit
              </Button>
            </Box>
          </Box>
        </form>
      </Fade>
    </Modal>
  )
}

export default CustomerAddressForm
