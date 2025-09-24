import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import TypographyLabel from '~/components/common/TypographyLabel'
import ReadOnlyTextField from '~/components/common/ReadOnlyTextField'
import { grey } from '@mui/material/colors'

function PersonalInfo({ shop, setSelectImg, setOpenLightBox }) {
  const info = shop?.personal_info
  return (
    <Box>
      <Typography
        variant="body2"
        sx={{ fontSize: '1.5rem', fontWeight: 'bold' }}
      >
        Personal Information
      </Typography>

      <Box sx={{ mt: 3 }}>
        <TypographyLabel>National ID</TypographyLabel>
        <ReadOnlyTextField value={info?.national_id} />
      </Box>

      <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
        <Box flex={1} sx={{ mt: 2 }}>
          <TypographyLabel>National Card Front</TypographyLabel>
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
                setSelectImg(info?.national_card_front)
                setOpenLightBox(true)
              }}
              component="img"
              src={info?.national_card_front}
              sx={{
                width: '100%',
                p: '15px',
                objectFit: 'contain',
                cursor: 'pointer'
              }}
            />
          </Box>
        </Box>
        <Box flex={1} sx={{ mt: 2 }}>
          <TypographyLabel>National Card Back</TypographyLabel>
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
                setSelectImg(info?.national_card_back)
                setOpenLightBox(true)
              }}
              component="img"
              src={info?.national_card_back}
              sx={{
                width: '100%',
                p: '15px',
                objectFit: 'contain',
                cursor: 'pointer'
              }}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
export default PersonalInfo
