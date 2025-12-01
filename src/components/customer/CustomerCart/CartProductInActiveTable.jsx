import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableContainer from '@mui/material/TableContainer'
import CartProductRow from './CartTable/CartProductRow'
import TypographyTitle from '~/components/common/TypographyTitle'
import React from 'react'

function CartProductInActiveTable({ ui, data, handler }) {
  const { productInactive } = data
  const { handelClearProductInactive } = handler
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
      <Box sx={{ display: 'flex', justifyContent: 'end' }}>
        <Button
          onClick={handelClearProductInactive}
          sx={{
            mt: 3,
            fontSize: '16px',
            backgroundColor: 'black',
            color: 'white',
            padding: '0 20px',
            height: '50px'
          }}
        >
          Remove Inactive Products
        </Button>
      </Box>
    </Box>
  )
}
export default CartProductInActiveTable
