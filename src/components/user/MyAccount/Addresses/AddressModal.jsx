import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import { useEffect, useState } from 'react'
import AddIcon from '@mui/icons-material/Add'
import { blue, grey, red } from '@mui/material/colors'
import { FormControlLabel, TextField } from '@mui/material'
import Checkbox from '@mui/material/Checkbox'
import TypographyLabel from '../../../common/TypographyLabel'

import FormAddress from '~/components/FormAddress'
import { useForm } from 'react-hook-form'

import {
  addNewAddressAPI,
  updateAddressAPI,
  deleteAddressAPI
} from '~/api/user.api'
import FieldErrorAlert from '~/components/common/FieldErrorAlert'
import {
  FIELD_REQUIRED_MESSAGE,
  NAME_RULE,
  NAME_RULE_MESSAGE,
  PHONE_RULE,
  PHONE_RULE_MESSAGE
} from '~/utils/validators'

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
  // msOverflowStyle: 'none'
}

function AddressModal({
  addressItem,
  actionType,
  handleAddAddress,
  handleDeleteAddress,
  handleUpdateAddress
}) {
  const {
    register,
    watch,
    formState: { errors },
    reset,
    handleSubmit,
    setValue,
    clearErrors
  } = useForm()

  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => {
    setOpen(false)
    reset({})
  }

  const [tempAddress, setTempAddress] = useState({
    selectedProvince: {},
    selectedDistrict: {},
    selectedWard: {}
  })

  const handleAddressChange = (address) => {
    setTempAddress(address)
  }

  const handleAddressAction = async (data) => {
    data.province = tempAddress?.selectedProvince
    data.district = tempAddress?.selectedDistrict
    data.ward = tempAddress?.selectedWard

    if (actionType === 'create') {
      const res = await addNewAddressAPI({
        data,
        loadingClass: [
          '.btn-user-add-update-address',
          '.btn-user-address-cancel'
        ]
      })
      if (res.status === 201) {
        handleClose()
        handleAddAddress(res.data?.metadata)
        reset()
      }
    } else if (actionType === 'update') {
      data._id = addressItem?._id
      const res = await updateAddressAPI({
        data,
        loadingClass: [
          '.btn-user-add-update-address',
          '.btn-user-delete-address',
          '.btn-user-address-cancel'
        ]
      })
      if (res.status === 200) {
        handleClose()
        handleUpdateAddress(res.data?.metadata)
        reset()
      }
    }
  }

  const deleteAddress = async (_id) => {
    const res = await deleteAddressAPI({
      data: { _id },
      loadingClass: [
        '.btn-user-add-update-address',
        '.btn-user-delete-address',
        '.btn-user-address-cancel'
      ]
    })
    if (res.status === 200) {
      handleClose()
      reset()
      handleDeleteAddress(_id)
    }
  }

  useEffect(() => {
    setValue('full_name', addressItem?.full_name)
    setValue('phone_number', addressItem?.phone_number)
  }, [addressItem])

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
        aria-describedby="modal-modal-description"
      >
        <form onSubmit={handleSubmit(handleAddressAction)}>
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {actionType === 'create' ? 'New Address' : 'Update Address'}
            </Typography>
            <Box
              sx={{
                display: 'flex',
                gap: '20px',
                marginTop: '20px',
                marginBottom: '15px'
              }}
            >
              <Box>
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
                  error={!!errors['full_name']}
                />
                <FieldErrorAlert errors={errors} fieldName="full_name" />
              </Box>

              <Box>
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
                  error={!!errors['phone_number']}
                  onInput={(e) => {
                    e.target.value = e.target.value.replace(/[^0-9]/g, '')
                  }}
                />
                <FieldErrorAlert errors={errors} fieldName="phone_number" />
              </Box>
            </Box>

            <Box sx={{ width: '100%' }}>
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
                sx={{
                  marginTop: '10px',
                  '& .MuiTypography-root': {
                    fontSize: '14px'
                  }
                }}
              />
            )}

            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'end',
                gap: '10px',
                marginTop: '20px'
              }}
            >
              <Button
                className="btn-user-address-cancel"
                onClick={() => handleClose()}
                sx={{
                  backgroundColor: grey[200],
                  color: 'black',
                  padding: '5px 10px'
                }}
              >
                Cancel
              </Button>

              {actionType === 'update' && (
                <Button
                  className="btn-user-delete-address"
                  onClick={() => deleteAddress(addressItem._id)}
                  sx={{
                    backgroundColor: red[500],
                    color: 'white',
                    padding: '5px 10px'
                  }}
                >
                  Delete address
                </Button>
              )}

              <Button
                className="btn-user-add-update-address"
                type="submit"
                sx={{
                  backgroundColor: blue[600],
                  color: 'white',
                  padding: '5px 10px'
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

export default AddressModal
