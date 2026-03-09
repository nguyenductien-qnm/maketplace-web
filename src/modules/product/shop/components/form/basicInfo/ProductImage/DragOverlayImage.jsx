import Box from '@mui/material/Box'
import { DragOverlay } from '@dnd-kit/core'

function DragOverlayImage({ fieldsImage, activeId }) {
  const activeImage = fieldsImage.find((i) => i.id === activeId)
  return (
    <DragOverlay>
      {activeId ? (
        <Box
          sx={{
            width: 133,
            height: 133,
            borderRadius: '4px',
            overflow: 'hidden',
            opacity: 1
          }}
        >
          <img
            src={activeImage?.previewUrl || activeImage?.url}
            alt="drag preview"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              border: '2px dashed red'
            }}
          />
        </Box>
      ) : null}
    </DragOverlay>
  )
}

export default DragOverlayImage
