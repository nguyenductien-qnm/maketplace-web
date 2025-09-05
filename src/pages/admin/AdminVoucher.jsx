import Paper from '@mui/material/Paper'
import ReasonModal from '~/components/admin/ReasonModal'
import VoucherDetailModal from '~/components/admin/voucher/VoucherDetailModal'
import VoucherForm from '~/components/admin/voucher/VoucherForm'
import VoucherHeader from '~/components/admin/voucher/VoucherHeader'
import VoucherTable from '~/components/admin/voucher/VoucherTable'
import { useAdminVoucher } from '~/hooks/admin/voucher.hook'

function AdminVoucher({ status, name }) {
  const {
    action,
    vouchers,
    shops,
    staffs,
    count,
    loading,
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
    handleOpenForm,
    handleCloseForm,
    handleCreateVoucher,
    handleUpdateVoucher,

    VOUCHER_TABLE_MAP
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
        shops={shops}
        staffs={staffs}
        name={name}
        filters={filters}
        setFilters={setFilters}
        handleFilter={handleFilter}
        handleClearFilter={handleClearFilter}
        handleOpenForm={handleOpenForm}
        // handleExportData={handleExportData}
      />

      <VoucherTable
        loading={loading}
        status={status}
        vouchers={vouchers}
        count={count}
        page={page}
        rowsPerPage={rowsPerPage}
        handleOpenForm={handleOpenForm}
        handleOpenModal={handleOpenModal}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
        VOUCHER_TABLE_MAP={VOUCHER_TABLE_MAP}
      />

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

      <VoucherDetailModal
        open={openDetailModal}
        onClose={handleCloseModal}
        voucher={voucherDetail}
      />

      <ReasonModal
        open={openReasonModal}
        onClose={handleCloseModal}
        header={modalProps?.header}
        submitText={modalProps?.submitText}
        submitColor={modalProps?.submitColor}
        onSubmit={modalProps?.onSubmit}
      />
    </Paper>
  )
}
export default AdminVoucher
