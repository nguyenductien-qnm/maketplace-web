import { Paper } from '@mui/material'
import ReasonModal from '~/components/admin/ReasonModal'
import TableSkeleton from '~/components/admin/TableSkeleton'
import VoucherForm from '~/components/admin/voucher/VoucherForm'
import VoucherHeader from '~/components/admin/voucher/VoucherHeader'
import VoucherTable from '~/components/admin/voucher/VoucherTable'
import { useAdminVoucher } from '~/hooks/admin/voucher.hook'
function AdminVoucher({ status, name }) {
  const {
    action,
    vouchers,
    count,
    loading,
    isDenied,
    voucherDetail,
    selectedVoucher,

    filters,
    setFilters,
    page,
    rowsPerPage,

    openDetailModal,
    openReasonModal,
    openVoucherForm,
    modalProps,

    handleFilter,
    handleClearFilter,
    handleChangePage,
    handleChangeRowsPerPage,
    handleOpenModal,
    handleCloseModal,
    handleGetVoucherDetail,
    handleOpenForm,
    handleCloseForm,
    handleCreateVoucher,
    handleUpdateVoucher
  } = useAdminVoucher({ status })
  return (
    <Paper
      sx={{
        height: 'calc(90vh - 24px)',
        width: 'calc(100% - 24px)',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <VoucherHeader
        name={name}
        filters={filters}
        status={status}
        setFilters={setFilters}
        handleFilter={handleFilter}
        handleClearFilter={handleClearFilter}
        handleOpenForm={handleOpenForm}
        // handleExportData={handleExportData}
      />

      {loading && <TableSkeleton columns={8} rows={rowsPerPage} />}
      {!loading && !isDenied && (
        <VoucherTable
          status={status}
          vouchers={vouchers}
          count={count}
          page={page}
          rowsPerPage={rowsPerPage}
          handleGetVoucherDetail={handleGetVoucherDetail}
          handleOpenForm={handleOpenForm}
          handleOpenModal={handleOpenModal}
          openDetailModal={openDetailModal}
          voucherDetail={voucherDetail}
          handleCloseModal={handleCloseModal}
          handleChangePage={handleChangePage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
        />
      )}

      <VoucherForm
        key={selectedVoucher?._id || 'new'}
        voucher={selectedVoucher}
        mode="admin"
        open={openVoucherForm}
        onclose={handleCloseForm}
        action={action}
        onSubmit={
          action === 'create' ? handleCreateVoucher : handleUpdateVoucher
        }
      />

      {modalProps && (
        <ReasonModal
          open={openReasonModal}
          onClose={handleCloseModal}
          header={modalProps.header}
          submitText={modalProps.submitText}
          submitColor={modalProps.submitColor}
          onSubmit={modalProps.onSubmit}
        />
      )}
    </Paper>
  )
}
export default AdminVoucher
