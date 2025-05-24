import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import FormControlLabel from '@mui/material/FormControlLabel'
import TextField from '@mui/material/TextField'
import Checkbox from '@mui/material/Checkbox'
import AddIcon from '@mui/icons-material/Add'
import TypographyLabel from '~/components/common/TypographyLabel'
import FormAddress from '~/components/common/FormAddress'
import FieldErrorAlert from '~/components/common/FieldErrorAlert'
import {
  FIELD_REQUIRED_MESSAGE,
  NAME_RULE,
  NAME_RULE_MESSAGE,
  PHONE_RULE,
  PHONE_RULE_MESSAGE
} from '~/utils/validators'
import { blue, grey, red } from '@mui/material/colors'
import { useAddressForm } from '~/hooks/user.hook'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  maxHeight: '80vh',
  overflow: 'auto',
  scrollbarWidth: 'none'
}

function CustomerAddressModal({
  addressItem,
  actionType,
  handleAddAddress,
  handleDeleteAddress,
  handleUpdateAddress
}) {
  const onSuccess = (result, type) => {
    if (type === 'delete') handleDeleteAddress(result)
    else if (actionType === 'create') handleAddAddress(result)
    else handleUpdateAddress(result)
  }

  const {
    register,
    watch,
    errors,
    reset,
    handleSubmit,
    setValue,
    clearErrors,
    open,
    handleOpen,
    handleClose,
    handleAddressChange,
    handleAddressAction,
    handleDelete
  } = useAddressForm({ actionType, addressItem, onSuccess })

  return (
    <div>
      {actionType === 'create' ? (
        <Button
          onClick={handleOpen}
          sx={{
            display: 'flex',
            gap: '5px',
            fontSize: '14px',
            padding: '10px 20px',
            color: 'white',
            backgroundColor: blue[600]
          }}
        >
          <AddIcon /> Add new address
        </Button>
      ) : (
        <Typography
          onClick={handleOpen}
          sx={{
            fontSize: '14px',
            color: blue[600],
            textAlign: 'end',
            marginBottom: '10px',
            '&:hover': {
              fontWeight: '600',
              cursor: 'pointer'
            }
          }}
        >
          Edit
        </Typography>
      )}

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
      >
        <form onSubmit={handleSubmit(handleAddressAction)}>
          <Box sx={style}>
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              mb={2}
            >
              {actionType === 'create' ? 'New Address' : 'Update Address'}
            </Typography>

            <Box sx={{ display: 'flex', gap: '20px', mb: 2 }}>
              <Box sx={{ flex: 1 }}>
                <TypographyLabel>Full name</TypographyLabel>
                <TextField
                  size="small"
                  {...register('full_name', {
                    required: FIELD_REQUIRED_MESSAGE,
                    pattern: {
                      value: NAME_RULE,
                      message: NAME_RULE_MESSAGE
                    }
                  })}
                  error={!!errors.full_name}
                />
                <FieldErrorAlert errors={errors} fieldName="full_name" />
              </Box>

              <Box sx={{ flex: 1 }}>
                <TypographyLabel>Phone number</TypographyLabel>
                <TextField
                  size="small"
                  {...register('phone_number', {
                    required: FIELD_REQUIRED_MESSAGE,
                    pattern: {
                      value: PHONE_RULE,
                      message: PHONE_RULE_MESSAGE
                    }
                  })}
                  error={!!errors.phone_number}
                  onInput={(e) => {
                    e.target.value = e.target.value.replace(/[^0-9]/g, '')
                  }}
                />
                <FieldErrorAlert errors={errors} fieldName="phone_number" />
              </Box>
            </Box>

            <Box sx={{ width: '100%', mb: 2 }}>
              <FormAddress
                clearErrors={clearErrors}
                register={register}
                watch={watch}
                errors={errors}
                reset={reset}
                setValue={setValue}
                address={{
                  province: addressItem?.province ?? null,
                  district: addressItem?.district,
                  ward: addressItem?.ward,
                  street: addressItem?.street
                }}
                actionType={actionType}
                handleAddressChange={handleAddressChange}
              />
            </Box>

            {actionType === 'create' && (
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
                onClick={handleClose}
                sx={{
                  backgroundColor: grey[200],
                  color: 'black',
                  px: 2,
                  py: 0.5
                }}
              >
                Cancel
              </Button>

              {actionType === 'update' && (
                <Button
                  onClick={handleDelete}
                  sx={{
                    backgroundColor: red[500],
                    color: 'white',
                    px: 2,
                    py: 0.5
                  }}
                >
                  Delete address
                </Button>
              )}

              <Button
                type="submit"
                sx={{
                  backgroundColor: blue[600],
                  color: 'white',
                  px: 2,
                  py: 0.5
                }}
              >
                Submit
              </Button>
            </Box>
          </Box>
        </form>
      </Modal>
    </div>
  )
}

export default CustomerAddressModal
