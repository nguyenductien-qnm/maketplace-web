import Grid2 from '@mui/material/Grid2'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import SortableItem from './SortableItem'
import DragOverlayOption from './DragOverlayOption'
import { DndContext } from '@dnd-kit/core'
import { SortableContext } from '@dnd-kit/sortable'
import { useProductOptions } from '~/modules/product/shop/hook/form/useProductOption'

function ProductOptionItem({ form, variationIndex }) {
  const { errors } = form

  const {
    activeId,
    activeIndex,
    fieldsOptions,
    handleAddOption,
    handleRemoveOption,
    handleChangeOption,
    triggerUpdateOption,
    handleDragStart,
    handleDragEnd
  } = useProductOptions({ form, variationIndex })

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
