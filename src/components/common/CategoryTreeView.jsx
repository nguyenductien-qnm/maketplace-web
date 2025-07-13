import { TreeItem } from '@mui/x-tree-view'
import { Box } from '@mui/material'
import { SimpleTreeView } from '@mui/x-tree-view'
import { useMemo } from 'react'

function CategoryTreeView({ value = [], onChange, categories = [], multi }) {
  const findPathToNodeByCode = (tree, targetCode, path = []) => {
    for (const node of tree) {
      const newPath = [...path, node.category_code]
      if (node.category_code === targetCode) return newPath

      if (Array.isArray(node.children) && node.children.length > 0) {
        const childPath = findPathToNodeByCode(
          node.children,
          targetCode,
          newPath
        )
        if (childPath) return childPath
      }
    }
    return null
  }

  const getParentCodesForSelected = (tree, selectedCodes) => {
    const expandedSet = new Set()

    if (selectedCodes) {
      const normalizedCodes = Array.isArray(selectedCodes)
        ? selectedCodes
        : typeof selectedCodes === 'string'
        ? [selectedCodes]
        : []

      normalizedCodes.forEach((code) => {
        const path = findPathToNodeByCode(tree, code)
        if (path && path.length > 1) {
          path.slice(0, -1).forEach((parentCode) => expandedSet.add(parentCode))
        }
      })
    }

    return Array.from(expandedSet)
  }

  const expandedItems = useMemo(() => {
    return getParentCodesForSelected(categories, value)
  }, [categories, value])

  const renderTree = (node) => (
    <TreeItem
      key={node._id}
      itemId={node.category_code}
      label={node.category_name}
    >
      {Array.isArray(node.children) &&
        node.children.map((child) => renderTree(child))}
    </TreeItem>
  )

  return (
    <Box sx={{ minHeight: 352, minWidth: 290 }}>
      <SimpleTreeView
        multiSelect={multi}
        checkboxSelection
        selectedItems={value}
        defaultExpandedItems={expandedItems}
        onSelectedItemsChange={(e, selected) => onChange?.(selected)}
      >
        {categories.map((cat) => renderTree(cat))}
      </SimpleTreeView>
    </Box>
  )
}

export default CategoryTreeView
