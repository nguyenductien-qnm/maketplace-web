import styles from '../styles/Placeholder.module.css'

function Placeholder(props) {
  const left = props.depth * 24
  return <div className={styles.root} style={{ left }}></div>
}

export default Placeholder
