import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import CartRow from './CartRow'
import Checkbox from '@mui/material/Checkbox'
import TableCellHeader from '~/components/common/TableCellHeader'

function CartTable({ ui, data, handler }) {
  const { cart } = data
  const { handleSelectAll } = handler

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: '100%' }}>
        <TableHead>
          <TableRow>
            <TableCellHeader>
              <Checkbox onClick={handleSelectAll} />
            </TableCellHeader>
            <TableCellHeader>Product</TableCellHeader>
            <TableCellHeader>Unit Price</TableCellHeader>
            <TableCellHeader>Quantity</TableCellHeader>
            <TableCellHeader>Total Price</TableCellHeader>
            <TableCellHeader>Action</TableCellHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {cart?.map((c) => (
            <CartRow key={c._id} itemDetail={c} ui={ui} handler={handler} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
export default CartTable
