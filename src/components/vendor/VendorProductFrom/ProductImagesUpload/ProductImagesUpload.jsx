import Grid2 from '@mui/material/Grid2'
import TypographyLabel from '~/components/common/TypographyLabel'
import UploadButton from '~/components/common/UploadButton'
import SortableItem from './SortableItem'
import DragOverlayImage from './DragOverlayImage'
import { useState } from 'react'
import { Controller } from 'react-hook-form'
import { SortableContext } from '@dnd-kit/sortable'
import { useProductImages } from '~/hooks/vendor/product/productImage'
import {
  DndContext,
  useSensor,
  useSensors,
  PointerSensor,
  TouchSensor
} from '@dnd-kit/core'
import { Typography } from '@mui/material'
import { FIELD_REQUIRED_MESSAGE } from '~/utils/validators'
import LightboxImage from '~/components/common/LightboxImage'

function ProductImagesUpload({ form }) {
  const { control, errors } = form

  const {
    fieldsImage,
    handleUploadImages,
    handleRemoveImages,
    handleMoveImages
  } = useProductImages({ control })

  const [openLightbox, setOpenLightbox] = useState(false)
  const [src, setSrc] = useState(null)

  const [activeId, setActiveId] = useState(null)

  const handleDragStart = (event) => {
    setActiveId(event.active.id)
    document.body.style.cursor = 'grabbing'
  }

  const handleDragEnd = (event) => {
    const { active, over } = event
    setActiveId(null)

    document.body.style.cursor = ''
    if (!over) return
    if (active.id === over.id) return

    const oldIndex = fieldsImage.findIndex((i) => i.id === active.id)
    const newIndex = fieldsImage.findIndex((i) => i.id === over.id)
    handleMoveImages(oldIndex, newIndex)
  }

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        delay: 150,
        tolerance: 5
      }
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 200,
        tolerance: 5
      }
    })
  )

  const errorMessage = errors?.product_images?.root?.message
  return (
    <Grid2 size={12}>
      <TypographyLabel>Product Images</TypographyLabel>
      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={fieldsImage?.map((f) => f.id) ?? []}>
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
            {fieldsImage?.length > 0 &&
              fieldsImage.map((image, index) => (
                <SortableItem
                  key={image.id}
                  setSrc={setSrc}
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
                render={() => (
                  <UploadButton
                    variant="outlined"
                    label={`Upload (${fieldsImage?.length}/9)`}
                    multiple={true}
                    sx={{
                      display: 'flex !important',
                      flexDirection: 'column !important',
                      alignItems: 'center',
                      justifyContent: 'center',
                      height: '133px',
                      width: '100%'
                    }}
                    inputProps={{
                      onChange: (e) => handleUploadImages(e)
                    }}
                  />
                )}
              />
            </Grid2>
          </Grid2>
        </SortableContext>
        <DragOverlayImage fieldsImage={fieldsImage} activeId={activeId} />
      </DndContext>
      <Typography variant="caption" color="error">
        {errorMessage}
      </Typography>
      {openLightbox && (
        <LightboxImage src={src} onClose={() => setOpenLightbox(false)} />
      )}
    </Grid2>
  )
}
export default ProductImagesUpload
