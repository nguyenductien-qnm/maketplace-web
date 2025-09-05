import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableSkeleton from '../TableSkeleton'
import NoData from '../NoData'
import CommissionRateRow from './CommissionRateRow'

function CommissionRateTable({
  loading,
  commissionRates,
  categoriesRoot,
  handleOpenModal,
  COMMISSION_RATE_TABLE_MAP
}) {
  return (
    <>
      {loading && <TableSkeleton columns={9} rows={13} />}
      {!loading && commissionRates?.length === 0 && <NoData />}
      {!loading && commissionRates?.length > 0 && (
        <TableContainer
          component={Paper}
          sx={{
            flex: 1,
            overflowY: 'auto',
            width: '100%'
          }}
        >
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                {COMMISSION_RATE_TABLE_MAP?.map(({ key, label }) => (
                  <TableCell key={key} align="left">
                    {label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {commissionRates?.map((commissionRate) => (
                <CommissionRateRow
                  key={commissionRate?._id}
                  commissionRate={commissionRate}
                  categoriesRoot={categoriesRoot}
                  handleOpenModal={handleOpenModal}
                  COMMISSION_RATE_TABLE_MAP={COMMISSION_RATE_TABLE_MAP}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  )
}
export default CommissionRateTable
