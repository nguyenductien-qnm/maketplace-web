import React from 'react'
import { TypeIcon } from './TypeIcon'
import styles from '../styles/CustomDragPreview.module.css'

function CustomDragPreview(props) {
  const item = props.monitorProps.item

  return (
    <div className={styles.root}>
      <div className={styles.icon}>
        <TypeIcon droppable={props?.depth === 0} />
      </div>
      <div className={styles.label}>{item.text}</div>
    </div>
  )
}

export default CustomDragPreview
