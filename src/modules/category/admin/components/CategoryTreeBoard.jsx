import {
  Tree,
  MultiBackend,
  getBackendOptions
} from '@minoru/react-dnd-treeview'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid2 from '@mui/material/Grid2'
import Typography from '@mui/material/Typography'
import AddOutlinedIcon from '@mui/icons-material/AddOutlined'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import styles from './styles/App.module.css'
import CircularIndeterminate from '~/components/common/CircularIndeterminate'
import CustomDragPreview from './tree/CustomDragPreview'
import CustomNode from './tree/CustomNode'
import Placeholder from './tree/Placeholder'
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined'
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined'
import Tooltip from '@mui/material/Tooltip'
import CircularProgress from '@mui/material/CircularProgress'
import NoData from '~/components/common/NoData'
import { DndProvider } from '@minoru/react-dnd-treeview'
import { blue, green, grey, red } from '@mui/material/colors'

function CategoryTreeBoard({ ui, data, handler }) {
  const { isLoading, isFetching, isUpdating } = ui
  const { categories } = data
  const {
    handleOpenConfirmDialog,
    handleOpenDetailModal,
    handleOpenForm,
    handleDrop
  } = handler

  const rootNodes = categories?.filter((node) => node.parent === 0)

  return (
    <Box sx={{ position: 'relative' }}>
      {isLoading && (
        <Box sx={{ alignSelf: 'center', mt: 10 }}>
          <CircularIndeterminate />
        </Box>
      )}

      {!isLoading && (
        <Box
          sx={{
            opacity: isUpdating || isFetching ? 0.5 : 1,
            pointerEvents: isUpdating ? 'none' : 'auto'
          }}
        >
          <DndProvider backend={MultiBackend} options={getBackendOptions()}>
            <Grid2 container spacing={2} alignItems="stretch">
              {rootNodes.map((root) => (
                <Grid2 key={root?.id} size={4} sx={{ display: 'flex' }}>
                  <Card
                    sx={{
                      p: 4,
                      width: '100%',
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column'
                    }}
                  >
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
                            color: root.status ? 'inherit' : 'red'
                          }}
                        />
                        <Typography
                          sx={{
                            color: root.status ? 'inherit' : 'red'
                          }}
                        >
                          {root.text}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', gap: 0.5 }}>
                        <Tooltip title="Create sub-category">
                          <AddOutlinedIcon
                            onClick={() => {
                              handleOpenForm({
                                categoryId: root.id,
                                action: 'createChild'
                              })
                            }}
                            fontSize="small"
                            className="add-icon"
                            sx={{
                              opacity: 0,
                              transition: 'opacity 0.2s ease-in-out',
                              color: blue[500],
                              '&:hover': {
                                cursor: 'pointer',
                                color: blue[800]
                              }
                            }}
                          />
                        </Tooltip>

                        <Tooltip title="View details">
                          <VisibilityOutlinedIcon
                            onClick={() => {
                              handleOpenDetailModal({ categoryId: root.id })
                            }}
                            fontSize="small"
                            className="add-icon"
                            sx={{
                              opacity: 0,
                              transition: 'opacity 0.2s ease-in-out',
                              color: grey[500],
                              '&:hover': {
                                cursor: 'pointer',
                                color: grey[800]
                              }
                            }}
                          />
                        </Tooltip>

                        <Tooltip title="Edit category">
                          <EditOutlinedIcon
                            onClick={() => {
                              handleOpenForm({
                                action: 'updateRoot',
                                categoryId: root.id
                              })
                            }}
                            fontSize="small"
                            className="add-icon"
                            sx={{
                              opacity: 0,
                              transition: 'opacity 0.2s ease-in-out',
                              color: green[500],
                              '&:hover': {
                                cursor: 'pointer',
                                color: green[800]
                              }
                            }}
                          />
                        </Tooltip>

                        <Tooltip title="Delete category">
                          <HighlightOffOutlinedIcon
                            onClick={() => {
                              handleOpenConfirmDialog({ categoryId: root.id })
                            }}
                            fontSize="small"
                            className="add-icon"
                            sx={{
                              opacity: 0,
                              transition: 'opacity 0.2s ease-in-out',
                              color: red[500],
                              '&:hover': {
                                cursor: 'pointer',
                                color: red[800]
                              }
                            }}
                          />
                        </Tooltip>
                      </Box>
                    </Box>

                    <Tree
                      style={{ minHeight: '100px' }}
                      tree={categories}
                      rootId={root.id}
                      render={(node, { depth, isOpen, onToggle }) => (
                        <CustomNode
                          node={node}
                          depth={depth}
                          isOpen={isOpen}
                          onToggle={onToggle}
                          handler={handler}
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
                        const targetNode = tree.find(
                          (n) => n.id === dropTargetId
                        )
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
                </Grid2>
              ))}
            </Grid2>
          </DndProvider>
        </Box>
      )}

      {!isLoading && categories.length === 0 && (
        <Box sx={{ opacity: isUpdating || isFetching ? 0.5 : 1 }}>
          <NoData />
        </Box>
      )}

      {!isLoading && isFetching && (
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            pointerEvents: 'none',
            zIndex: 2
          }}
        >
          <CircularProgress />
        </Box>
      )}
    </Box>
  )
}

export default CategoryTreeBoard
