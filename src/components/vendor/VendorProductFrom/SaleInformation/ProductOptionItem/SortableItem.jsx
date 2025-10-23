import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined'
import OpenWithOutlinedIcon from '@mui/icons-material/OpenWithOutlined'
import { grey } from '@mui/material/colors'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import {
  FIELD_REQUIRED_MESSAGE,
  PRODUCT_VARIATION_OPTION_MESSAGE,
  PRODUCT_VARIATION_OPTION_RULE
} from '~/utils/validators'
import { InputAdornment, Typography } from '@mui/material'
import DividerVertical from '~/components/common/DividerVertical'
import { useState } from 'react'

const iconStyle = {
  color: grey[500],
  fontSize: '20px'
}

function SortableItem({
  form,
  activeId,
  index,
  option,
  variationIndex,
  handleChangeOption,
  handleRemoveOption,
  triggerUpdateOption
}) {
  const { register, watch, errors } = form
  const { setNodeRef, transform, transition, listeners, attributes } =
    useSortable({ id: option.id })

  const [optionLength, setOptionLength] = useState(0)

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    cursor: 'grab',
    opacity: activeId == option.id ? 0.3 : 1
  }

  const customHandleChangeOption = (e, index) => {
    setOptionLength(e.target.value.length)
    handleChangeOption(e, index)
  }

  return (
    <div ref={setNodeRef} style={style}>
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
          size="small"
          sx={{
            flex: 1,
            backgroundColor: grey[100],
            '& .MuiOutlinedInput-root': { backgroundColor: 'white' }
          }}
          {...register(
            `product_variations.${variationIndex}.options.${index}.value`,
            {
              required: FIELD_REQUIRED_MESSAGE,
              pattern: {
                value: PRODUCT_VARIATION_OPTION_RULE,
                message: PRODUCT_VARIATION_OPTION_MESSAGE
              }
            }
          )}
          error={
            !!errors?.product_variations?.[variationIndex]?.options?.[index]
              ?.value
          }
          onChange={(e) => customHandleChangeOption(e, index)}
          onBlur={(e) => {
            triggerUpdateOption(e, index)
          }}
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <DividerVertical />
                  <Typography sx={{ ml: '10px' }}>
                    {optionLength ||
                      watch(
                        `product_variations.${variationIndex}.options.${index}.value`
                      )?.length}
                    / 20
                  </Typography>
                </InputAdornment>
              )
            }
          }}
        />
        <OpenWithOutlinedIcon {...listeners} {...attributes} sx={iconStyle} />
        <DeleteForeverOutlinedIcon
          sx={{ ...iconStyle, '&:hover': { cursor: 'pointer' } }}
          onClick={() => handleRemoveOption(index)}
        />
      </Box>
      <Box sx={{ minHeight: 20, color: 'error.main', fontSize: 12 }}>
        {errors?.product_variations?.[variationIndex]?.options?.[index]?.value
          ?.message || ''}
      </Box>
    </div>
  )
}
export default SortableItem
