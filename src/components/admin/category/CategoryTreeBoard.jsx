import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import AddOutlinedIcon from '@mui/icons-material/AddOutlined'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import styles from '~/components/admin/category/App.module.css'
import CircularIndeterminate from '~/components/common/CircularIndeterminate'
import { CustomDragPreview } from '~/components/admin/category/CustomDragPreview'
import { CustomNode } from '~/components/admin/category/CustomNode'
import { Placeholder } from '~/components/admin/category/Placeholder'
import { DndProvider } from '@minoru/react-dnd-treeview'
import {
  Tree,
  MultiBackend,
  getBackendOptions
} from '@minoru/react-dnd-treeview'

function CategoryTreeBoard({
  loading,
  categoriesTree,
  handleOpenModal,
  handleDrop
}) {
  const rootNodes = categoriesTree?.filter((node) => node.parent === 0)

  return (
    <>
      {loading && (
        <Box sx={{ alignSelf: 'center', mt: 10 }}>
          <CircularIndeterminate />
        </Box>
      )}

      {!loading && (
        <>
          <DndProvider backend={MultiBackend} options={getBackendOptions()}>
            <Box
              sx={{
                display: 'flex',
                gap: 2,
                flexWrap: 'wrap',
                overflowY: 'auto'
              }}
            >
              {rootNodes.map((root) => (
                <Card key={root.id} sx={{ width: 360, p: 4 }}>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      '&:hover .add-icon': {
                        opacity: 1
                      }
                    }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        gap: 2,
                        alignItems: 'center'
                      }}
                    >
                      <div
                        dangerouslySetInnerHTML={{ __html: root?.icon }}
                        style={{
                          color: root.status === 'active' ? 'inherit' : 'red'
                        }}
                      />
                      <Typography
                        sx={{
                          color: root.status === 'active' ? 'inherit' : 'red'
                        }}
                      >
                        {root.text}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex' }}>
                      <DeleteOutlineOutlinedIcon
                        onClick={() =>
                          handleOpenModal({ action: 'delete', category: root })
                        }
                        fontSize="small"
                        className="add-icon"
                        sx={{
                          opacity: 0,
                          transition: 'opacity 0.2s ease-in-out',
                          cursor: 'pointer'
                        }}
                      />

                      <EditOutlinedIcon
                        onClick={() =>
                          handleOpenModal({
                            action: 'update-root',
                            category: root
                          })
                        }
                        fontSize="small"
                        className="add-icon"
                        sx={{
                          opacity: 0,
                          transition: 'opacity 0.2s ease-in-out',
                          cursor: 'pointer'
                        }}
                      />

                      <AddOutlinedIcon
                        onClick={() =>
                          handleOpenModal({
                            action: 'create-child',
                            category: root
                          })
                        }
                        fontSize="small"
                        className="add-icon"
                        sx={{
                          opacity: 0,
                          transition: 'opacity 0.2s ease-in-out',
                          cursor: 'pointer'
                        }}
                      />
                    </Box>
                  </Box>

                  <Tree
                    tree={categoriesTree}
                    rootId={root.id}
                    render={(node, { depth, isOpen, onToggle }) => (
                      <CustomNode
                        node={node}
                        depth={depth}
                        isOpen={isOpen}
                        onToggle={onToggle}
                        handleOpenModal={handleOpenModal}
                      />
                    )}
                    dragPreviewRender={(monitorProps) => (
                      <CustomDragPreview monitorProps={monitorProps} />
                    )}
                    dropTargetOffset={5}
                    sort={false}
                    insertDroppableFirst={false}
                    onDrop={handleDrop}
                    classes={{
                      root: styles.treeRoot,
                      draggingSource: styles.draggingSource,
                      dropTarget: styles.dropTarget
                    }}
                    canDrop={(tree, { dropTargetId }) => {
                      const targetNode = tree.find((n) => n.id === dropTargetId)
                      if (!targetNode) return false

                      const getDepth = (nodeId, currentDepth = 0) => {
                        const parent = tree.find((n) => n.id === nodeId)
                        if (!parent || parent.parent === 0)
                          return currentDepth + 1
                        return getDepth(parent.parent, currentDepth + 1)
                      }

                      const newDepth = getDepth(targetNode.id)
                      return newDepth <= 2
                    }}
                    placeholderRender={(node, { depth }) => (
                      <Placeholder node={node} depth={depth} />
                    )}
                  />
                </Card>
              ))}
            </Box>
          </DndProvider>
        </>
      )}
    </>
  )
}

export default CategoryTreeBoard
