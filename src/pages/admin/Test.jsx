import Sidebar from './SideBar'
import SuppliersTable from './SuppliersTable'

function Test() {
  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <div style={{ flexGrow: 1, padding: '20px' }}>
        <SuppliersTable />
      </div>
    </div>
  )
}

export default Test
