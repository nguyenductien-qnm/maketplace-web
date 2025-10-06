import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import FormAddress from '~/components/common/FormAddress'
import TypographyTitle from '~/components/common/TypographyTitle'
import InfoIcon from '@mui/icons-material/Info'
import { grey } from '@mui/material/colors'
import { Typography } from '@mui/material'

function ShopAddressForm({
  address,
  control,
  errors,
  setValue,
  handleAddressFormSubmit
}) {
  return (
    <Box
      sx={{
        border: '2px dashed',
        borderColor: grey[400],
        borderRadius: 1,
        p: 4,
      }}
    >
      <form onSubmit={handleAddressFormSubmit}>
        <TypographyTitle sx={{ mb: 2 }}>Address</TypographyTitle>
        <FormAddress
          address={address}
          control={control}
          errors={errors}
          setValue={setValue}
        />

        <Box
          onClick={() => handleOpenDialog('ADDRESS')}
          sx={{
            mt: 1,
            display: 'flex',
            gap: 1,
            alignItems: 'center',
            cursor: 'pointer',
            justifyContent: 'end'
          }}
        >
          <InfoIcon sx={{ fontSize: '16px' }} />
          <Typography
            variant="subtitle2"
            sx={{ ':hover': { textDecoration: 'underLine' } }}
          >
            Why we request your address?
          </Typography>
        </Box>

        <Button
          className="btn-action-setting-owner"
          type="submit"
          sx={{ mt: 5 }}
          variant="contained"
          fullWidth
        >
          Submit
        </Button>
      </form>
    </Box>
  )
}
export default ShopAddressForm
