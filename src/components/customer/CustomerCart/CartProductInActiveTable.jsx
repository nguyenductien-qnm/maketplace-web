import { Box, Paper, Table, TableBody, TableContainer } from '@mui/material'
import CartProductRow from './CartTable/CartProductRow'
import TypographyTitle from '~/components/common/TypographyTitle'
import React from 'react'
function CartProductInActiveTable({ ui, data, handler }) {
  const { productInactive } = data
  return (
    <Box>
      <TypographyTitle sx={{ mb: 3 }}>Inactive List</TypographyTitle>
      <TableContainer component={Paper}>
        <Table sx={{ width: '100%' }}>
          <TableBody>
            {productInactive?.map((i) => (
              <React.Fragment key={i._id}>
                {i.products?.map((p) => (
                  <CartProductRow
                    key={p.product_id}
                    ui={ui}
                    data={{ product: p, shop: i.shop }}
                    handler={handler}
                  />
                ))}
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}
export default CartProductInActiveTable
