import React from 'react'
import { Box, Typography } from '@mui/material'
import ArrowRightIcon from '@mui/icons-material/ArrowRight'
import { useDragOver } from '@minoru/react-dnd-treeview'
import styles from './CustomNode.module.css'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import { TypeIcon } from './TypeIcon'

export const CustomNode = (props) => {
  const { id, text, status } = props.node
  const indent = props.depth * 24
  const { handleOpenModal, handleDeleteCategory } = props

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
          '&:hover .edit-icon': {
            opacity: 1
          },
          justifyContent: 'space-between'
        }}
      >
        <Typography
          variant="body2"
          sx={{ color: status === 'active' ? 'inherit' : 'red' }}
        >
          {text}
        </Typography>
        <Box>
          <DeleteOutlineOutlinedIcon
            onClick={() => handleDeleteCategory(id)}
            fontSize="small"
            className="edit-icon"
            sx={{
              opacity: 0,
              transition: 'opacity 0.2s ease-in-out',
              cursor: 'pointer'
            }}
          />
          <EditOutlinedIcon
            onClick={() =>
              handleOpenModal({ action: 'update-child', category: props.node })
            }
            fontSize="small"
            className="edit-icon"
            sx={{
              ml: 1,
              opacity: 0,
              transition: 'opacity 0.2s ease-in-out',
              cursor: 'pointer'
            }}
          />
        </Box>
      </Box>
    </div>
  )
}
