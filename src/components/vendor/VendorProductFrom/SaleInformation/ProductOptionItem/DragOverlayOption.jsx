import { DragOverlay } from '@dnd-kit/core'
import { Box, TextField } from '@mui/material'
import { grey } from '@mui/material/colors'
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined'
import OpenWithOutlinedIcon from '@mui/icons-material/OpenWithOutlined'

const iconStyle = {
  color: grey[500],
  fontSize: '20px'
}

function DragOverlayOption({
  variationIndex,
  activeIndex,
  fieldsOptions,
  errors
}) {
  return (
    <DragOverlay>
      {activeIndex != null ? (
        <Box>
          <Box
            sx={{
              flex: 1,
              display: 'flex',
              gap: 1,
              alignItems: 'center',
              width: '100%'
            }}
          >
            <TextField
              value={fieldsOptions?.[activeIndex].value || ''}
              error={
                !!errors?.product_variations?.[variationIndex]?.options?.[
                  activeIndex
                ]?.value?.message
              }
              sx={{
                flex: 1,
                backgroundColor: grey[100],
                '& .MuiOutlinedInput-root': { backgroundColor: 'white' }
              }}
              size="small"
            />
            <OpenWithOutlinedIcon sx={iconStyle} />
            <DeleteForeverOutlinedIcon sx={iconStyle} />
          </Box>

          <Box sx={{ minHeight: 20, color: 'error.main', fontSize: 12 }}>
            {errors?.product_variations?.[variationIndex]?.options?.[
              activeIndex
            ]?.value?.message || ' '}
          </Box>
        </Box>
      ) : null}
    </DragOverlay>
  )
}

export default DragOverlayOption
