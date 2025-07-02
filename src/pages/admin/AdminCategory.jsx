import {
  Tree,
  MultiBackend,
  getBackendOptions
} from '@minoru/react-dnd-treeview'
import { useAdminCategory } from '~/hooks/admin/category.hook'
import styles from '~/components/admin/category/App.module.css'
import { DndProvider } from '@minoru/react-dnd-treeview'
import { CustomNode } from '~/components/admin/category/CustomNode'
import { CustomDragPreview } from '~/components/admin/category/CustomDragPreview'
import { Box, Card, Container, Typography } from '@mui/material'
import AddOutlinedIcon from '@mui/icons-material/AddOutlined'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import CategoryHeader from '~/components/admin/category/CategoryHeader'
import CategoryForm from '~/components/admin/category/CategoryForm'
import { Placeholder } from '~/components/admin/category/Placeholder'
import CircularIndeterminate from '~/components/common/CircularIndeterminate'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'

function AdminCategory() {
  const {
    isLoading,
    openModal,
    action,
    handleOpenModal,
    handleCloseModal,

    categoriesTree,
    categoryDetail,

    handleCreateCategoryRoot,
    handleCreateCategoryChild,

    handleDrop,
    handleUpdateCategoryRoot,
    handleUpdateCategoryChild,

    handleUploadImage,
    handleDeleteCategory
  } = useAdminCategory()

  const rootNodes = categoriesTree.filter((node) => node.parent === 0)

  return (
    <Container sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <CategoryHeader handleOpenModal={handleOpenModal} />
      {isLoading && (
        <Box sx={{ alignSelf: 'center', mt: 10 }}>
          <CircularIndeterminate />
        </Box>
      )}
      {!isLoading && (
        <>
          <DndProvider backend={MultiBackend} options={getBackendOptions()}>
            <Box display="flex" gap={2} flexWrap="wrap">
              {rootNodes.map((root) => (
                <Card key={root.id} sx={{ width: 373, p: 4 }}>
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
                          fontSize: '18px',
                          color: root.status === 'active' ? 'inherit' : 'red'
                        }}
                      >
                        {root.text}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <DeleteOutlineOutlinedIcon
                        onClick={() => handleDeleteCategory(root.id)}
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
                        handleDeleteCategory={handleDeleteCategory}
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
          <CategoryForm
            open={openModal}
            onClose={handleCloseModal}
            handleUploadImage={handleUploadImage}
            mode={action}
            category={categoryDetail}
            onSubmit={async (data) => {
              action == 'create-root' && (await handleCreateCategoryRoot(data))
              action == 'create-child' &&
                (await handleCreateCategoryChild(data))
              action == 'update-root' && (await handleUpdateCategoryRoot(data))
              action == 'update-child' &&
                (await handleUpdateCategoryChild(data))
            }}
          />
        </>
      )}
    </Container>
  )
}
export default AdminCategory
