import React from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Skeleton
} from '@mui/material'

function TableSkeleton({ rows = 5, columns = 4 }) {
  const skeletonCells = Array.from({ length: columns })
  const skeletonRows = Array.from({ length: rows })

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {skeletonCells.map((_, idx) => (
              <TableCell key={idx}>
                <Skeleton variant="text" width="60%" />
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {skeletonRows.map((_, rowIdx) => (
            <TableRow key={rowIdx}>
              {skeletonCells.map((_, colIdx) => (
                <TableCell key={colIdx}>
                  <Skeleton variant="text" width="80%" />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default TableSkeleton
