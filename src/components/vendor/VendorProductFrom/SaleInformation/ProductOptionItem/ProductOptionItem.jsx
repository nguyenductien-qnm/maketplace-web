import Grid2 from '@mui/material/Grid2'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import SortableItem from './SortableItem'
import DragOverlayOption from './DragOverlayOption'
import { useState } from 'react'
import { DndContext } from '@dnd-kit/core'
import { SortableContext } from '@dnd-kit/sortable'
import { useProductOptions } from '~/hooks/vendor/product/productOption'

function ProductOptionItem({ form, variationIndex }) {
  const { control, errors, setError, clearErrors, watch } = form

  const {
    fieldsOptions,
    handleAddOption,
    handleRemoveOption,
    handleChangeOption,
    triggerUpdateOption,
    handleMoveOption
  } = useProductOptions({
    control,
    watch,
    errors,
    setError,
    clearErrors,
    variationIndex
  })

  const [activeId, setActiveId] = useState(null)
  const [activeIndex, setActiveIndex] = useState(null)

  const handleDragStart = (event) => {
    const id = event.active.id
    setActiveId(id)
    const index = fieldsOptions.findIndex((o) => o.id == id)
    setActiveIndex(index)
    document.body.style.cursor = 'grabbing'
  }

  const handleDragEnd = (event) => {
    const { active, over } = event
    setActiveId(null)
    setActiveIndex(null)
    document.body.style.cursor = ''
    if (!over) return
    if (active.id === over.id) return

    const oldIndex = fieldsOptions.findIndex((i) => i.id === active.id)
    const newIndex = fieldsOptions.findIndex((i) => i.id === over.id)
    handleMoveOption(oldIndex, newIndex)
  }

  return (
    <Box>
      <Button
        onClick={handleAddOption}
        variant="outlined"
        sx={{ backgroundColor: 'white', mb: 2 }}
      >
        Add Option
      </Button>
      <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        <SortableContext items={fieldsOptions.map((o) => o.id)}>
          <Grid2 container spacing={2} rowSpacing={2} sx={{ flex: 1 }}>
            {fieldsOptions?.length > 0 &&
              fieldsOptions?.map((option, index) => (
                <Grid2
                  key={option.id}
                  size={6}
                  sx={{ display: 'flex', gap: 1, flexDirection: 'column' }}
                >
                  <SortableItem
                    form={form}
                    activeId={activeId}
                    index={index}
                    option={option}
                    variationIndex={variationIndex}
                    handleChangeOption={handleChangeOption}
                    handleRemoveOption={handleRemoveOption}
                    triggerUpdateOption={triggerUpdateOption}
                  />
                </Grid2>
              ))}
          </Grid2>
        </SortableContext>
        <DragOverlayOption
          variationIndex={variationIndex}
          activeIndex={activeIndex}
          fieldsOptions={fieldsOptions}
          errors={errors}
        />
      </DndContext>
    </Box>
  )
}
export default ProductOptionItem
