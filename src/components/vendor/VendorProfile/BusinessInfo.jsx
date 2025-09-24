import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import TypographyLabel from '~/components/common/TypographyLabel'
import ReadOnlyTextField from '~/components/common/ReadOnlyTextField'
import { grey } from '@mui/material/colors'

function BusinessInfo({ shop, setSelectImg, setOpenLightBox }) {
  const info = shop?.business_info
  return (
    <Box>
      <Typography
        variant="body2"
        sx={{ fontSize: '1.5rem', fontWeight: 'bold' }}
      >
        Business Information
      </Typography>

      <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
        <Box flex={1}>
          <TypographyLabel>Tax CODE</TypographyLabel>
          <ReadOnlyTextField value={info?.tax_code} />
        </Box>

        <Box flex={1}>
          <TypographyLabel>Issued Date</TypographyLabel>
          <ReadOnlyTextField value={info?.issued_date} />
        </Box>

        <Box flex={1}>
          <TypographyLabel>Issued Place</TypographyLabel>
          <ReadOnlyTextField value={info?.issued_place} />
        </Box>
      </Box>

      <Box sx={{ mt: 2 }}>
        <TypographyLabel>Business License</TypographyLabel>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            border: '3px dashed',
            borderColor: grey[400]
          }}
        >
          <Box
            onClick={() => {
              setSelectImg(info?.business_license)
              setOpenLightBox(true)
            }}
            component="img"
            src={info?.business_license}
            sx={{
              height: '400px',
              p: '15px',
              objectFit: 'contain',
              cursor: 'pointer'
            }}
          />
        </Box>
      </Box>
    </Box>
  )
}
export default BusinessInfo
