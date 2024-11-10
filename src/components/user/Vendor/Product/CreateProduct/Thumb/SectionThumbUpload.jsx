import { Box, InputLabel } from '@mui/material'
import { grey, red } from '@mui/material/colors'
import InputThumbUpload from './InputThumbUpload'
import { useDispatch, useSelector } from 'react-redux'
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined'
import { handleDeleteThumb } from '~/redux/formCreateProduct.slice'

function SectionThumbUpLoad() {
  const dispatch = useDispatch()

  const urlThumb = useSelector((state) => state.formCreateProduct.spuThumb)
  const resizeImage = (url, width, height) => {
    return url.replace('/upload/', `/upload/w_${width},h_${height},c_fill/`)
  }
  const resizedImageUrl = urlThumb ? resizeImage(urlThumb, 180, 180) : ''

  return (
    <Box>
      <InputLabel
        sx={{
          fontSize: '14px',
          fontWeight: '600',
          marginBottom: '5px'
        }}
      >
        Product Thumb
      </InputLabel>
      <Box
        sx={{
          minWidth: '100%',
          height: '200px',
          border: '3px',
          borderStyle: 'dashed',
          borderColor: grey[400],
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative'
        }}
      >
        {urlThumb === '' && <InputThumbUpload />}
        {urlThumb !== '' && (
          <Box>
            <img src={resizedImageUrl} sx={{ height: '100%', width: '100%' }} />
            <HighlightOffOutlinedIcon
              fontSize="small"
              onClick={() => dispatch(handleDeleteThumb())}
              sx={{
                position: 'absolute',
                right: '0',
                top: '0',
                backgroundColor: 'white',
                borderRadius: '9999px',
                color: red[600],
                '&:hover': { cursor: 'pointer' }
              }}
            />
          </Box>
        )}
      </Box>
    </Box>
  )
}
export default SectionThumbUpLoad
