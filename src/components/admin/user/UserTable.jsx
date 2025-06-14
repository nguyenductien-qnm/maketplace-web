import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableFooter from '@mui/material/TableFooter'
import TablePagination from '@mui/material/TablePagination'
import { Box, Button, Tooltip } from '@mui/material'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import Chip from '@mui/material/Chip'
import ReasonModal from '../ReasonModal'
import UserModal from './UserModal'
import UserUpdatePasswordModal from './UserUpdatePasswordModal'
import PasswordIcon from '@mui/icons-material/Password'
import LockOpenIcon from '@mui/icons-material/LockOpen'
import BlockIcon from '@mui/icons-material/Block'
import NoData from '../NoData'
function UserTable({
  users,
  count,
  page,
  rowsPerPage,
  userDetail,
  selectedUser,
  handleGetUserDetail,
  modalProps,
  handleChangePage,
  handleChangeRowsPerPage,
  openReasonModal,
  openInfoModal,
  openUpdatePasswordModal,
  handleOpenModal,
  handleCloseModal,
  handleUpdatePassword
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
      {users?.length === 0 && <NoData />}
      {users?.length > 0 && (
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
                <TableCell align="right">Email</TableCell>
                <TableCell align="right">Phone</TableCell>
                <TableCell align="right">Full name</TableCell>
                <TableCell align="right">Create at</TableCell>
                <TableCell align="right">Gender</TableCell>
                <TableCell align="right">Is Shop</TableCell>
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
                  <TableCell align="right">{user?.user_email}</TableCell>
                  <TableCell align="right">{user?.user_phone || '—'}</TableCell>
                  <TableCell align="right">{user?.user_name || '—'}</TableCell>
                  <TableCell align="right">{user?.createdAt}</TableCell>
                  <TableCell align="right">
                    {GenderCell({ gender: user?.user_gender })}
                  </TableCell>
                  <TableCell align="right">
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

                  <TableCell align="right">
                    <Tooltip title="View detail info">
                      <Box
                        sx={{
                          '&:hover': {
                            cursor: 'pointer'
                          }
                        }}
                        onClick={() => {
                          handleOpenModal({ action: 'detail', user })
                          handleGetUserDetail(user)
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

                    {user?.user_status === 'block' && (
                      <Tooltip title="Unban user">
                        <Button
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
          {modalProps?.type === 'reason' && (
            <ReasonModal
              open={openReasonModal}
              onClose={handleCloseModal}
              header={modalProps.header}
              submitText={modalProps.submitText}
              submitColor={modalProps.submitColor}
              onSubmit={modalProps.onSubmit}
            />
          )}

          <UserModal
            open={openInfoModal}
            onClose={handleCloseModal}
            user={userDetail}
          />

          <UserUpdatePasswordModal
            open={openUpdatePasswordModal}
            onClose={handleCloseModal}
            handleUpdatePassword={handleUpdatePassword}
            user={selectedUser}
          />
        </TableContainer>
      )}
    </>
  )
}
export default UserTable
