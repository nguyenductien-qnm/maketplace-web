import { Box, InputLabel, Skeleton } from '@mui/material'
import { grey, red } from '@mui/material/colors'
import InputThumbUpload from './InputThumbUpload'
import { useDispatch, useSelector } from 'react-redux'
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined'
import { handleDeleteThumb } from '~/redux/formProduct.slice'
import TypographyLabel from '~/components/user/Common/TypographyLabel'
import FieldErrorAlert from '~/components/FieldErrorAlert'
import { useFormContext } from 'react-hook-form'
import resizeImage from '~/helpers/resizeImage'
function SectionThumbUpLoad({ isLoading }) {
  const dispatch = useDispatch()

  const urlThumb = useSelector((state) => state.formProduct.product_thumb)

  const resizedImageUrl = urlThumb ? resizeImage(urlThumb, 180, 180) : ''

  const {
    formState: { errors }
  } = useFormContext()
  return (
    <Box>
      {isLoading ? (
        <Box>
          <Skeleton
            variant="rounded"
            width="40%"
            sx={{ marginBottom: '10px' }}
          />

          <Skeleton variant="rounded" height={200} width={200} />
        </Box>
      ) : (
        <Box>
          <TypographyLabel> Product Thumb</TypographyLabel>
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
            {urlThumb !== '' ? (
              <Box>
                <img
                  src={resizedImageUrl}
                  sx={{ height: '100%', width: '100%' }}
                />
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
            ) : (
              <InputThumbUpload />
            )}
          </Box>
          <FieldErrorAlert errors={errors} fieldName="product_thumb" />
        </Box>
      )}
    </Box>
  )
}
export default SectionThumbUpLoad
