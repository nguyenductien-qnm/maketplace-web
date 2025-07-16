import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Tooltip from '@mui/material/Tooltip'
import TableSkeleton from '../TableSkeleton'
import NoData from '../NoData'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'

function CommissionRateTable({
  loading,
  commissionRates,
  categoriesRoot,
  handleOpenModal
}) {
  const findCategoryName = (code) => {
    const category = categoriesRoot?.find((c) => c?.category_code == code)
    return category?.category_name || ''
  }

  const toPercentage = (value) => {
    return `${(value * 100).toFixed(0)}%`
  }

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
                <TableCell align="left">Category name</TableCell>
                <TableCell align="left">Refund rate auto</TableCell>
                <TableCell align="left">Refund rate manual</TableCell>
                <TableCell align="left">Created by</TableCell>
                <TableCell align="left">Created at</TableCell>
                <TableCell align="left">Updated at</TableCell>
                <TableCell align="left">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {commissionRates?.map((commission) => (
                <TableRow
                  key={commission?._id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell align="left">
                    {findCategoryName(commission?.category_code)}
                  </TableCell>
                  <TableCell align="left">
                    {commission?.refund_rate_auto} ~ (
                    {toPercentage(commission?.refund_rate_auto)})
                  </TableCell>
                  <TableCell align="left">
                    {commission?.refund_rate_manual} ~ (
                    {toPercentage(commission?.refund_rate_manual)})
                  </TableCell>
                  <TableCell align="left">
                    {commission?.creator_id?.user_name}
                  </TableCell>
                  <TableCell align="left">{commission?.createdAt}</TableCell>
                  <TableCell align="left">{commission?.updatedAt}</TableCell>
                  <TableCell align="left">
                    <Tooltip title="Update commission rate">
                      <Button
                        variant="contained"
                        onClick={() =>
                          handleOpenModal({
                            action: 'update',
                            commissionRate: commission
                          })
                        }
                      >
                        <EditOutlinedIcon />
                      </Button>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  )
}
export default CommissionRateTable
