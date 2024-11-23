import { Box, InputLabel } from '@mui/material'
import Grid from '@mui/material/Grid2'
import { grey, red } from '@mui/material/colors'
import InputGalleryUpload from './InputGalleryUpload'
import { useDispatch, useSelector } from 'react-redux'
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined'
import { handleDeleteGallery } from '~/redux/formCreateProduct.slice'

function SectionGalleryUpLoad() {
  const dispatch = useDispatch()
  const spuGallery = useSelector((state) => state.formCreateProduct.spuGallery)

  const resizeImage = (url, width = 60, height = 60) => {
    return url.replace('/upload/', `/upload/w_${width},h_${height},c_fill/`)
  }

  return (
    <Box sx={{ marginTop: '65px' }}>
      <InputLabel
        sx={{
          fontSize: '14px',
          fontWeight: '600',
          marginBottom: '5px'
        }}
      >
        Product Gallery
      </InputLabel>
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
        {spuGallery.length === 0 && <InputGalleryUpload />}
        {spuGallery.length != 0 && (
          <Grid
            container
            spacing={1}
            rowSpacing={1}
            sx={{ height: '100%', width: '100%' }}
          >
            {spuGallery.map((image, index) => (
              <Grid spacing={4} sx={{ position: 'relative' }}>
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

      {spuGallery.length != 0 && (
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
