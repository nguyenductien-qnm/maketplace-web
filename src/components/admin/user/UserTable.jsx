import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableFooter from '@mui/material/TableFooter'
import TablePagination from '@mui/material/TablePagination'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import Chip from '@mui/material/Chip'
import PasswordIcon from '@mui/icons-material/Password'
import LockOpenIcon from '@mui/icons-material/LockOpen'
import BlockIcon from '@mui/icons-material/Block'
import NoData from '../NoData'
import TableSkeleton from '../TableSkeleton'

function UserTable({
  loading,
  users,
  count,
  page,
  rowsPerPage,
  handleChangePage,
  handleChangeRowsPerPage,
  handleOpenModal
}) {
  const GenderCell = ({ gender }) => {
    if (!gender) return '—'
    const label = gender.charAt(0).toUpperCase() + gender.slice(1).toLowerCase()
    const colorMap = {
      male: '#1976d2',
      female: '#ec407a'
    }

    return (
      <Chip
        label={label}
        size="small"
        sx={{
          backgroundColor: colorMap[gender.toLowerCase()] || 'grey',
          color: 'white',
          width: '70px'
        }}
      />
    )
  }

  return (
    <>
      {loading && <TableSkeleton columns={8} rows={rowsPerPage} />}
      {!loading && users?.length === 0 && <NoData />}
      {!loading && users?.length > 0 && (
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
                <TableCell align="left">Email</TableCell>
                <TableCell align="left">Phone</TableCell>
                <TableCell align="left">Full name</TableCell>
                <TableCell align="left">Create at</TableCell>
                <TableCell align="left">Gender</TableCell>
                <TableCell align="left">Is Shop</TableCell>
                <TableCell align="left">Detail</TableCell>
                <TableCell align="left">Action</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {users?.map((user) => (
                <TableRow
                  key={user._id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell align="left">{user?.user_email}</TableCell>
                  <TableCell align="left">{user?.user_phone || '—'}</TableCell>
                  <TableCell align="left">{user?.user_name || '—'}</TableCell>
                  <TableCell align="left">{user?.createdAt}</TableCell>
                  <TableCell align="left">
                    {GenderCell({ gender: user?.user_gender })}
                  </TableCell>
                  <TableCell align="left">
                    {user?.user_role.includes('SHOP') ? (
                      <Chip
                        sx={{ width: '40px' }}
                        label="Yes"
                        size="small"
                        color="success"
                      />
                    ) : (
                      <Chip
                        sx={{ width: '40px' }}
                        label="No"
                        size="small"
                        color="default"
                      />
                    )}
                  </TableCell>

                  <TableCell align="left">
                    <Tooltip title="View detail info">
                      <Box
                        sx={{
                          '&:hover': {
                            cursor: 'pointer'
                          }
                        }}
                        onClick={() => {
                          handleOpenModal({ action: 'detail', user })
                        }}
                      >
                        <InfoOutlinedIcon />
                      </Box>
                    </Tooltip>
                  </TableCell>
                  <TableCell align="left">
                    {user?.user_status === 'active' && (
                      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'nowrap' }}>
                        <Tooltip title="Ban user">
                          <Button
                            className="btn-admin-user-action"
                            color="error"
                            variant="contained"
                            onClick={() =>
                              handleOpenModal({ action: 'ban', user })
                            }
                          >
                            <BlockIcon />
                          </Button>
                        </Tooltip>

                        <Tooltip title="Update password">
                          <Button
                            className="btn-admin-user-action"
                            color="success"
                            variant="contained"
                            onClick={() =>
                              handleOpenModal({
                                action: 'update-password',
                                user
                              })
                            }
                          >
                            <PasswordIcon />
                          </Button>
                        </Tooltip>
                      </Box>
                    )}

                    {user?.user_status === 'blocked' && (
                      <Tooltip title="Unban user">
                        <Button
                          className="btn-admin-user-action"
                          variant="contained"
                          onClick={() =>
                            handleOpenModal({ action: 'unban', user })
                          }
                        >
                          <LockOpenIcon />
                        </Button>
                      </Tooltip>
                    )}

                    {user?.user_status === 'pending_setup' && (
                      <Chip label="Pending setup" size="small" />
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>

            <TableFooter>
              <TableRow
                sx={{
                  position: 'sticky',
                  bottom: 0,
                  backgroundColor: 'background.paper',
                  zIndex: 1
                }}
              >
                <TablePagination
                  rowsPerPageOptions={[10, 25, 50]}
                  colSpan={9}
                  count={count || 0}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  labelRowsPerPage="Rows per page"
                  labelDisplayedRows={({ from, to, count }) =>
                    `${from}-${to} of ${count}`
                  }
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      )}
    </>
  )
}
export default UserTable
