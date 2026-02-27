import React from 'react'
import { Box, Tooltip, Typography } from '@mui/material'
import ArrowRightIcon from '@mui/icons-material/ArrowRight'
import { useDragOver } from '@minoru/react-dnd-treeview'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined'
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined'
import { TypeIcon } from './TypeIcon'
import styles from '../styles/CustomNode.module.css'
import { green, grey, red } from '@mui/material/colors'

function CustomNode(props) {
  const { id, text, status } = props.node
  const indent = props.depth * 24

  const { handleOpenConfirmDialog, handleOpenForm, handleOpenDetailModal } =
    props.handler

  const handleToggle = (e) => {
    e.stopPropagation()
    props.onToggle(props.node.id)
  }

  const dragOverProps = useDragOver(id, props.isOpen, props.onToggle)

  return (
    <div
      className={`tree-node ${styles.root}`}
      style={{
        paddingInlineStart: indent,
        display: 'flex',
        alignItems: 'center',
        width: '100%'
      }}
      {...dragOverProps}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <div
          className={`${styles.expandIconWrapper} ${
            props.isOpen ? styles.isOpen : ''
          }`}
        >
          {props.depth == 0 && (
            <div onClick={handleToggle}>
              <ArrowRightIcon />
            </div>
          )}
        </div>

        <TypeIcon status={status} droppable={props?.depth === 0} />
      </Box>

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          flex: 1,
          '&:hover .icon': {
            opacity: 1
          },
          justifyContent: 'space-between'
        }}
      >
        <Typography variant="body2" sx={{ color: status ? 'inherit' : 'red' }}>
          {text}
        </Typography>

        <Box sx={{ display: 'flex', gap: 0.5 }}>
          <Tooltip title="View details">
            <VisibilityOutlinedIcon
              onClick={() => {
                handleOpenDetailModal({ categoryId: id })
              }}
              fontSize="small"
              className="icon"
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
                  action: 'updateChild',
                  categoryId: id
                })
              }}
              fontSize="small"
              className="icon"
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
                handleOpenConfirmDialog({ categoryId: id })
              }}
              fontSize="small"
              className="icon"
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
    </div>
  )
}
export default CustomNode
