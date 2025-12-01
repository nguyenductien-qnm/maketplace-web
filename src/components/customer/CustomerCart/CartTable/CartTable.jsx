import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import Checkbox from '@mui/material/Checkbox'
import TableCell from '@mui/material/TableCell'
import TableCellHeader from '~/components/common/TableCellHeader'
import CartShopRow from './CartShopRow'
import CartProductRow from './CartProductRow'
import React from 'react'

function CartTable({ ui, data, handler }) {
  const { selectedProducts } = ui
  const { productActive } = data
  const { handleSelectAll, isSelectedAllProduct } = handler

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCellHeader>
              <Checkbox
                onClick={handleSelectAll}
                checked={isSelectedAllProduct()}
                indeterminate={
                  !isSelectedAllProduct() && selectedProducts?.length > 0
                }
              />
            </TableCellHeader>
            <TableCellHeader>Product</TableCellHeader>
            <TableCellHeader>Unit Price</TableCellHeader>
            <TableCellHeader>Quantity</TableCellHeader>
            <TableCellHeader>Total Price</TableCellHeader>
            <TableCellHeader>Action</TableCellHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {productActive?.map((i, index) => (
            <React.Fragment key={i._id}>
              {index > 0 && (
                <TableRow sx={{ height: '20px', backgroundColor: '#f5f5f5' }}>
                  <TableCell colSpan={6} sx={{ padding: 0, border: 'none' }} />
                </TableRow>
              )}
              <CartShopRow
                key={`shop-${i._id}`}
                shop={i.shop}
                handler={handler}
              />
              {i.products?.map((p) => (
                <CartProductRow
                  key={p.product_id}
                  ui={ui}
                  data={{ shop: i.shop, product: p }}
                  handler={handler}
                />
              ))}
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
export default CartTable
