import { useSelector } from 'react-redux'
import { TreeItem } from '@mui/x-tree-view'
import { Box } from '@mui/material'
import { SimpleTreeView } from '@mui/x-tree-view'
function CategoryTreeView({ value = [], onChange }) {
  const categories = useSelector((state) => state.categories.categories)

  const renderTree = (node) => (
    <TreeItem
      key={node._id}
      itemId={node.category_code.toString()}
      label={node.category_name}
    >
      {Array.isArray(node.children) &&
        node.children.map((child) => renderTree(child))}
    </TreeItem>
  )

  return (
    <Box sx={{ minHeight: 352, minWidth: 290 }}>
      <SimpleTreeView
        multiSelect
        checkboxSelection
        selectedItems={value}
        onSelectedItemsChange={(e, selected) => onChange?.(selected)}
      >
        {categories.map((cat) => renderTree(cat))}
      </SimpleTreeView>
    </Box>
  )
}

export default CategoryTreeView
