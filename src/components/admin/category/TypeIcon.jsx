import React from 'react'
import FolderOutlinedIcon from '@mui/icons-material/FolderOutlined'
import FiberManualRecordOutlinedIcon from '@mui/icons-material/FiberManualRecordOutlined'

export const TypeIcon = ({ droppable, status }) => {
  if (droppable) {
    return (
      <FolderOutlinedIcon
        sx={{ color: status === 'active' ? 'inherit' : 'red', mr: 1 }}
      />
    )
  } else {
    return (
      <FiberManualRecordOutlinedIcon
        sx={{ color: status === 'active' ? 'inherit' : 'red', mr: 1 }}
        fontSize="small"
      />
    )
  }
}
