import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import ReadOnlyTextField from '~/components/common/ReadOnlyTextField'
import Logo from '~/layouts/user/Header/Logo'
import TypographyLabel from '~/components/common/TypographyLabel'
import capitalizeFirstLetter from '~/utils/capitalizeFirstLetter'
import LightboxImage from '~/components/common/LightboxImage'
import { useState } from 'react'

function ReviewInformation({ getValues }) {
  const shopType = getValues('shop_type')
  const [open, setOpen] = useState(false)
  const [selectImg, setSelectImg] = useState(null)

  const renderPreviewImage = (field) => {
    const file = getValues(field)
    if (!file) return null
    return (
      <Box
        sx={{
          height: field === 'business_license' ? 350 : 180,
          display: 'flex',
          justifyContent: field === 'business_license' ? 'center' : 'start',
          alignItems: 'center',
          overflow: 'hidden'
        }}
      >
        <Box
          onClick={() => {
            setSelectImg(file)
            setOpen(true)
          }}
          component="img"
          src={URL.createObjectURL(file)}
          sx={{
            maxWidth: '100%',
            maxHeight: '100%',
            objectFit: 'contain',
            p: 2,
            border: '3px dashed lightgray',
            cursor: 'pointer'
          }}
        />
      </Box>
    )
  }

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
        Review Information
      </Typography>

      <Box sx={{ display: 'flex', gap: 1 }}>
        <Box flex={1}>
          <TypographyLabel>Shop Name</TypographyLabel>
          <ReadOnlyTextField value={getValues('shop_name')} />
        </Box>
        <Box flex={1}>
          <TypographyLabel>Shop Email</TypographyLabel>
          <ReadOnlyTextField value={getValues('shop_email')} />
        </Box>
        <Box flex={1}>
          <TypographyLabel>Shop Phone</TypographyLabel>
          <ReadOnlyTextField value={getValues('shop_phone')} />
        </Box>
      </Box>

      <Box flex={1}>
        <TypographyLabel>Shop Address</TypographyLabel>
        <ReadOnlyTextField value="Shop Address" />
      </Box>

      <Box sx={{ display: 'flex', gap: 1 }}>
        <Box flex={1}>
          <TypographyLabel>Shop Type</TypographyLabel>
          <ReadOnlyTextField
            value={capitalizeFirstLetter(getValues('shop_type'))}
          />
        </Box>
        <Box flex={1}>
          <TypographyLabel>Refund type</TypographyLabel>
          <ReadOnlyTextField
            value={capitalizeFirstLetter(getValues('refund_type'))}
          />
        </Box>
      </Box>
      {shopType === 'personal' && (
        <Box>
          <Box flex={1}>
            <TypographyLabel>National ID</TypographyLabel>
            <ReadOnlyTextField value={getValues('national_id')} />
          </Box>
          <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
            <Box flex={1}>
              <TypographyLabel>National front card</TypographyLabel>
              {renderPreviewImage('national_card_front')}
            </Box>

            <Box flex={1}>
              <TypographyLabel>National back card</TypographyLabel>
              {renderPreviewImage('national_card_back')}
            </Box>
          </Box>
        </Box>
      )}
      {shopType === 'business' && (
        <Box>
          <Box>
            <TypographyLabel>Tax Code</TypographyLabel>
            <ReadOnlyTextField value={getValues('tax_code')} />
          </Box>
          <Box sx={{ display: 'flex', gap: 1, mt: 3 }}>
            <Box flex={1}>
              <TypographyLabel>Issued Date</TypographyLabel>
              <ReadOnlyTextField value={getValues('issued_date')} />
            </Box>
            <Box flex={1}>
              <TypographyLabel>Issued Place</TypographyLabel>
              <ReadOnlyTextField value={getValues('issued_place')} />
            </Box>
          </Box>
          <Box flex={1} sx={{ mt: 3 }}>
            <TypographyLabel>Business License</TypographyLabel>
            {renderPreviewImage('business_license')}
          </Box>
        </Box>
      )}

      <Box flex={1}>
        <TypographyLabel>Paypal Email</TypographyLabel>
        <ReadOnlyTextField
          value={capitalizeFirstLetter(getValues('paypal_email'))}
        />
      </Box>
      {open && <LightboxImage src={selectImg} onClose={() => setOpen(false)} />}
    </Box>
  )
}
export default ReviewInformation
