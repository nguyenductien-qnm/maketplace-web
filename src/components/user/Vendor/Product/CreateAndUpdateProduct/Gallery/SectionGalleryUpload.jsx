import { Box, Skeleton } from '@mui/material'
import Grid from '@mui/material/Grid2'
import { grey, red } from '@mui/material/colors'
import InputGalleryUpload from './InputGalleryUpload'
import { useDispatch, useSelector } from 'react-redux'
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined'
import { handleDeleteGallery } from '~/redux/formProduct.slice'
import TypographyLabel from '~/components/user/Common/TypographyLabel'

function SectionGalleryUpLoad() {
  const dispatch = useDispatch()
  const productGallery = useSelector(
    (state) => state.formProduct.product_gallery
  )

  const resizeImage = (url, width = 60, height = 60) => {
    return url.replace('/upload/', `/upload/w_${width},h_${height},c_fill/`)
  }

  return (
    <Box sx={{ marginTop: '65px' }}>
      {productGallery.length != 0 ? (
        <TypographyLabel> Product Gallery</TypographyLabel>
      ) : (
        <Skeleton variant="rounded" width="40%" sx={{ marginBottom: '10px' }} />
      )}

      <Box
        sx={{
          minWidth: '100%',
          height: '220px',
          border: '3px',
          borderStyle: 'dashed',
          borderColor: grey[400],
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        {productGallery.length === 0 && (
          //  <InputGalleryUpload />
          <Skeleton variant="rounded" width="100%" height="100%" />
        )}
        {productGallery.length != 0 && (
          <Grid
            container
            spacing={1}
            rowSpacing={1}
            sx={{ height: '100%', width: '100%' }}
          >
            {productGallery.map((image, index) => (
              <Grid sx={{ position: 'relative' }} key={index}>
                <HighlightOffOutlinedIcon
                  onClick={() =>
                    dispatch(handleDeleteGallery({ index: index }))
                  }
                  sx={{
                    fontSize: '16px',
                    position: 'absolute',
                    right: '0',
                    top: '0',
                    backgroundColor: 'white',
                    borderRadius: '9999px',
                    color: red[600],
                    '&:hover': { cursor: 'pointer' }
                  }}
                />
                <img src={resizeImage(image)} />
              </Grid>
            ))}
          </Grid>
        )}
      </Box>

      {productGallery.length != 0 && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '20px'
          }}
        >
          <InputGalleryUpload />
        </Box>
      )}
    </Box>
  )
}
export default SectionGalleryUpLoad
