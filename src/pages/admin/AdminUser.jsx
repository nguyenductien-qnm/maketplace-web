import { Box, Paper } from '@mui/material'
import TableSkeleton from '~/components/admin/TableSkeleton'
import UserHeader from '~/components/admin/user/UserHeader'
import UserTable from '~/components/admin/user/UserTable'
import NoData from '~/components/admin/NoData'
import { useAdminUser } from '~/hooks/admin/user.hook'

function AdminUser({ name, status }) {
  const {
    users,
    count,
    loading,
    isDenied,
    userDetail,
    selectedUser,

    filters,
    setFilters,
    page,
    rowsPerPage,

    openInfoModal,
    openReasonModal,
    openUpdatePasswordModal,
    modalProps,

    handleFilter,
    handleClearFilter,
    handleExportData,
    handleChangePage,
    handleChangeRowsPerPage,

    handleOpenModal,
    handleCloseModal,

    handleGetUserDetail,
    handleUpdatePassword
  } = useAdminUser({ status })

  return (
    <Paper
      sx={{
        height: 'calc(90vh - 24px)',
        width: 'calc(100% - 24px)',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <UserHeader
        name={name}
        filters={filters}
        status={status}
        setFilters={setFilters}
        handleFilter={handleFilter}
        handleClearFilter={handleClearFilter}
        handleExportData={handleExportData}
      />
      {loading && <TableSkeleton columns={8} rows={rowsPerPage} />}
      {!loading && !isDenied && (
        <UserTable
          users={users}
          count={count}
          page={page}
          userDetail={userDetail}
          selectedUser={selectedUser}
          handleGetUserDetail={handleGetUserDetail}
          rowsPerPage={rowsPerPage}
          modalProps={modalProps}
          handleChangePage={handleChangePage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
          openReasonModal={openReasonModal}
          openInfoModal={openInfoModal}
          openUpdatePasswordModal={openUpdatePasswordModal}
          handleOpenModal={handleOpenModal}
          handleCloseModal={handleCloseModal}
          handleUpdatePassword={handleUpdatePassword}
        />
      )}
    </Paper>
  )
}
export default AdminUser
