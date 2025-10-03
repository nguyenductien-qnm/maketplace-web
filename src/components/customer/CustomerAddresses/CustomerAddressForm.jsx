import Box from '@mui/material/Box'
import Fade from '@mui/material/Fade'
import Modal from '@mui/material/Modal'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import FormControlLabel from '@mui/material/FormControlLabel'
import TypographyLabel from '~/components/common/TypographyLabel'
import FormAddress from '~/components/common/FormAddress'
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

function CustomerAddressForm({
  action,
  open,
  address,
  onSubmit,
  onClose,
  handleDeleteAddress
}) {
  const {
    register,
    setValue,
    errors,
    isSubmitting,
    control,
    handleFormSubmit
  } = useAddressForm({
    action,
    address,
    onSubmit
  })

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
                  helperText={errors?.full_name?.message}
                  error={!!errors.full_name}
                />
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
                  helperText={errors?.phone_number?.message}
                />
              </Box>
            </Box>

            <FormAddress
              address={address}
              control={control}
              errors={errors}
              setValue={setValue}
            />

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
