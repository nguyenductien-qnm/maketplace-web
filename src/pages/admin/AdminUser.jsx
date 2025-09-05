import Paper from '@mui/material/Paper'
import ReasonModal from '~/components/admin/ReasonModal'
import UserHeader from '~/components/admin/user/UserHeader'
import UserDetailModal from '~/components/admin/user/UserDetailModal'
import UserTable from '~/components/admin/user/UserTable'
import UserUpdatePasswordModal from '~/components/admin/user/UserUpdatePasswordModal'
import { useAdminUser } from '~/hooks/admin/user.hook'

function AdminUser({ name, status }) {
  const {
    users,
    count,
    loading,
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

    handleUpdatePassword,

    USER_TABLE_MAP
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

      <UserTable
        loading={loading}
        users={users}
        count={count}
        page={page}
        rowsPerPage={rowsPerPage}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
        handleOpenModal={handleOpenModal}
        USER_TABLE_MAP={USER_TABLE_MAP}
      />

      <ReasonModal
        open={openReasonModal}
        onClose={handleCloseModal}
        header={modalProps?.header}
        submitText={modalProps?.submitText}
        submitColor={modalProps?.submitColor}
        onSubmit={modalProps?.onSubmit}
      />

      <UserDetailModal
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
    </Paper>
  )
}
export default AdminUser
