import React from 'react'
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography
} from '@mui/material'

const suppliersData = [
  {
    name: 'Richard Martin',
    product: 'Kit Kat',
    contact: '7687764556',
    email: 'richard@gmail.com',
    returnStatus: 'Taking Return',
    onWay: 13
  },
  {
    name: 'Tom Homan',
    product: 'Maaza',
    contact: '9867545368',
    email: 'tomhoman@gmail.com',
    returnStatus: 'Taking Return',
    onWay: '-'
  },
  {
    name: 'Veandir',
    product: 'Dairy Milk',
    contact: '9867545566',
    email: 'veandier@gmail.com',
    returnStatus: 'Not Taking Return',
    onWay: '-'
  },
  {
    name: 'Charin',
    product: 'Tomato',
    contact: '9267545457',
    email: 'charin@gmail.com',
    returnStatus: 'Taking Return',
    onWay: 12
  },
  {
    name: 'Hoffman',
    product: 'Milk Bikis',
    contact: '9367546531',
    email: 'hoffman@gmail.com',
    returnStatus: 'Taking Return',
    onWay: '-'
  }
  // More data...
]

const SuppliersTable = () => {
  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: 2
        }}
      >
        <Typography variant="h5" gutterBottom>
          Suppliers
        </Typography>
        <Button variant="contained" color="primary">
          Add Product
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Supplier Name</TableCell>
              <TableCell>Product</TableCell>
              <TableCell>Contact Number</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>On the way</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {suppliersData.map((supplier, index) => (
              <TableRow key={index}>
                <TableCell>{supplier.name}</TableCell>
                <TableCell>{supplier.product}</TableCell>
                <TableCell>{supplier.contact}</TableCell>
                <TableCell>{supplier.email}</TableCell>
                <TableCell
                  style={{
                    color:
                      supplier.returnStatus === 'Taking Return'
                        ? 'green'
                        : 'red'
                  }}
                >
                  {supplier.returnStatus}
                </TableCell>
                <TableCell>{supplier.onWay}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}

export default SuppliersTable
