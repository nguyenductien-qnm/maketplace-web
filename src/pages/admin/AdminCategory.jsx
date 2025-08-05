import { DndProvider } from '@minoru/react-dnd-treeview'
import {
  Tree,
  MultiBackend,
  getBackendOptions
} from '@minoru/react-dnd-treeview'
import { Box, Card, Container, Typography } from '@mui/material'
import AddOutlinedIcon from '@mui/icons-material/AddOutlined'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import { useAdminCategory } from '~/hooks/admin/category.hook'
import CategoryForm from '~/components/admin/category/CategoryForm'
import CategoryHeader from '~/components/admin/category/CategoryHeader'
import { CustomDragPreview } from '~/components/admin/category/CustomDragPreview'
import { CustomNode } from '~/components/admin/category/CustomNode'
import { Placeholder } from '~/components/admin/category/Placeholder'
import CircularIndeterminate from '~/components/common/CircularIndeterminate'
import ReasonModal from '~/components/admin/ReasonModal'
import styles from '~/components/admin/category/App.module.css'

function AdminCategory() {
  const {
    loading,
    openModal,
    openReasonModal,
    action,
    categoriesTree,
    categoryDetail,
    handleOpenModal,
    handleCloseModal,
    handleSubmitCategory,
    handleDrop,
    handleUploadImage,
    handleDeleteCategory
  } = useAdminCategory()

  const rootNodes = categoriesTree.filter((node) => node.parent === 0)

  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 4,
        height: 'calc(90vh - 24px)'
      }}
    >
      <CategoryHeader handleOpenModal={handleOpenModal} />
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
          <CategoryForm
            open={openModal}
            onClose={handleCloseModal}
            handleUploadImage={handleUploadImage}
            mode={action}
            category={categoryDetail}
            onSubmit={handleSubmitCategory}
          />
          <ReasonModal
            header="Delete category (This action can't be undone.)"
            open={openReasonModal}
            onClose={handleCloseModal}
            onSubmit={handleDeleteCategory}
            submitText="Confirm"
            submitColor="error"
          />
        </>
      )}
    </Container>
  )
}
export default AdminCategory
