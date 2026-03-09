import Box from '@mui/material/Box'
import Grid2 from '@mui/material/Grid2'
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined'
import { CSS } from '@dnd-kit/utilities'
import { blue, grey } from '@mui/material/colors'
import { useSortable } from '@dnd-kit/sortable'

function SortableItem({
  index,
  setOpenLightbox,
  setActiveIndex,
  image,
  activeId,
  handleRemoveImages
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: image.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    cursor: 'grab',
    opacity: activeId == image.id ? 0.3 : 1
  }

  const displaySrc = image?.url || image.previewUrl

  return (
    <div ref={setNodeRef} {...attributes} {...listeners} style={style}>
      <Grid2 key={index} size={2}>
        <Box
          sx={{
            position: 'relative',
            width: '133px',
            height: '133px',
            '&:hover .delete-overlay': {
              opacity: 1
            }
          }}
        >
          <Box
            onClick={() => {
              ;(setActiveIndex(index), setOpenLightbox(true))
            }}
            component="img"
            src={displaySrc}
            alt="preview"
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              border: 'dashed',
              borderColor: index == 0 ? blue[600] : 'lightgrey',
              borderWidth: index == 0 ? '2px' : '1px',
              borderRadius: '4px',
              display: 'block',
              cursor: 'pointer'
            }}
          />

          <Box
            className="delete-overlay"
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '25px',
              backgroundColor: grey[400],
              borderRadius: '0 0 4px 4px',
              width: '100%',
              position: 'absolute',
              bottom: 0,
              left: 0,
              opacity: 0,
              transition: 'opacity 0.2s ease-in-out'
            }}
          >
            <DeleteForeverOutlinedIcon
              onClick={() => handleRemoveImages(index)}
              sx={{
                fontSize: '25px',
                color: 'white',
                '&:hover': {
                  cursor: 'pointer'
                }
              }}
            />
          </Box>
        </Box>
      </Grid2>
    </div>
  )
}
export default SortableItem
