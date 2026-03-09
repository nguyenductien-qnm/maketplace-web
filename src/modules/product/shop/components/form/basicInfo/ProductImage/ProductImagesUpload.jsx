import Box from '@mui/material/Box'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import Grid2 from '@mui/material/Grid2'
import TypographyLabel from '~/components/common/TypographyLabel'
import UploadButton from '~/components/common/UploadButton'
import SortableItem from './SortableItem'
import DragOverlayImage from './DragOverlayImage'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import { DndContext } from '@dnd-kit/core'
import { useState } from 'react'
import { Controller } from 'react-hook-form'
import { SortableContext } from '@dnd-kit/sortable'
import { useProductImages } from '~/modules/product/shop/hook/form/useProductImage'
import { FIELD_REQUIRED_MESSAGE } from '~/utils/validators'
import LightboxGallery from '~/components/common/LightboxGallery'
import CircularProgress from '@mui/material/CircularProgress'

function ProductImagesUpload({ form }) {
  const { control, errors } = form

  const {
    isUploading,
    activeId,
    sensors,
    errorMessage,
    fields,
    handleUploadImages,
    handleRemoveImages,
    handleDragStart,
    handleDragEnd
  } = useProductImages({ control, errors })

  const [openLightbox, setOpenLightbox] = useState(false)
  const [activeIndex, setActiveIndex] = useState(null)

  return (
    <Grid2 size={12}>
      <Box sx={{ display: 'flex', gap: 1 }}>
        <TypographyLabel>Product Images</TypographyLabel>
        <Tooltip
          arrow
          placement="top"
          title="Upload 1-9 product images. Recommended dimensions: 1200x1200px (scale 1:1). First image will be the main display image."
        >
          <InfoOutlinedIcon fontSize="small" sx={{ color: 'grey' }} />
        </Tooltip>
      </Box>
      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={fields?.map((f) => f.id) ?? []}>
          <Grid2
            container
            spacing={2}
            rowSpacing={2}
            sx={{
              display: 'flex',
              gap: 2,
              flexWrap: 'wrap',
              width: '100%',
              border: '1px dashed',
              borderColor: errorMessage ? 'red' : 'grey',
              borderRadius: '4px',
              padding: '10px'
            }}
          >
            {fields?.length > 0 &&
              fields.map((image, index) => (
                <SortableItem
                  key={image.id}
                  setActiveIndex={setActiveIndex}
                  setOpenLightbox={setOpenLightbox}
                  index={index}
                  image={image}
                  activeId={activeId}
                  handleRemoveImages={handleRemoveImages}
                />
              ))}
            <Grid2 size={2}>
              <Controller
                name="product_images"
                control={control}
                rules={{
                  validate: (value) => {
                    if (!value || value.length === 0)
                      return FIELD_REQUIRED_MESSAGE
                    if (value.length < 3)
                      return 'Please upload at least 3 images'
                    if (value.length > 9)
                      return 'You can upload up to 9 images only'
                    return true
                  }
                }}
                render={() =>
                  isUploading ? (
                    <Box
                      sx={{
                        height: '133px',
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <CircularProgress />
                    </Box>
                  ) : (
                    <UploadButton
                      variant="outlined"
                      label={`Upload (${fields?.length}/9)`}
                      multiple
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '133px',
                        width: '100%'
                      }}
                      inputProps={{
                        onChange: handleUploadImages
                      }}
                    />
                  )
                }
              />
            </Grid2>
          </Grid2>
        </SortableContext>
        <DragOverlayImage fieldsImage={fields} activeId={activeId} />
      </DndContext>
      <Typography variant="caption" color="error">
        {errorMessage}
      </Typography>
      {openLightbox && (
        <LightboxGallery
          images={fields.map((image) => image?.previewUrl || image?.url)}
          activeIndex={activeIndex}
          onClose={() => setOpenLightbox(false)}
        />
      )}
    </Grid2>
  )
}
export default ProductImagesUpload
