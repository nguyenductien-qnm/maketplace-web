import { Box, InputLabel, Skeleton } from '@mui/material'
import { grey, red } from '@mui/material/colors'
import InputThumbUpload from './InputThumbUpload'
import { useDispatch, useSelector } from 'react-redux'
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined'
import { handleDeleteThumb } from '~/redux/formProduct.slice'
import TypographyLabel from '~/components/user/Common/TypographyLabel'
import FieldErrorAlert from '~/components/FieldErrorAlert'
import { useFormContext } from 'react-hook-form'

function SectionThumbUpLoad() {
  const dispatch = useDispatch()

  const urlThumb = useSelector((state) => state.formProduct.product_thumb)
  const resizeImage = (url, width, height) => {
    return url.replace('/upload/', `/upload/w_${width},h_${height},c_fill/`)
  }
  const resizedImageUrl = urlThumb ? resizeImage(urlThumb, 180, 180) : ''
  const {
    formState: { errors }
  } = useFormContext()
  return (
    <Box>
      {urlThumb ? (
        <TypographyLabel> Product Thumb</TypographyLabel>
      ) : (
        <Skeleton variant="rounded" width="40%" sx={{ marginBottom: '10px' }} />
      )}
      <Box
        sx={{
          minWidth: '100%',
          height: '200px',
          border: '3px',
          borderStyle: 'dashed',
          borderColor: errors?.['product_thumb'] ? red[400] : grey[400],
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative'
        }}
      >
        {urlThumb === '' && (
          // <InputThumbUpload />
          <Skeleton variant="rounded" width="100%" height="100%" />
        )}
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
      <FieldErrorAlert errors={errors} fieldName="product_thumb" />
    </Box>
  )
}
export default SectionThumbUpLoad
