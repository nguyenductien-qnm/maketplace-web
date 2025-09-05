import Paper from '@mui/material/Paper'
import CommissionRateForm from '~/components/admin/commissionRate/CommissionRateForm'
import CommissionRateHeader from '~/components/admin/commissionRate/CommissionRateHeader'
import CommissionRateTable from '~/components/admin/commissionRate/CommissionRateTable'
import { useAdminCommissionRate } from '~/hooks/admin/commissionRate.hook'

function AdminCommissionRate() {
  const {
    openModal,
    action,
    loading,
    commissionRates,
    categoriesRoot,
    selectedCommissionRate,
    sortBy,
    setSortBy,
    handleOpenModal,
    handleCloseModal,
    handleSubmit,
    handleExportCommissionRates,
    COMMISSION_RATE_TABLE_MAP
  } = useAdminCommissionRate()
  return (
    <Paper
      sx={{
        height: 'calc(90vh - 24px)',
        width: 'calc(100% - 24px)',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <CommissionRateHeader
        sortBy={sortBy}
        setSortBy={setSortBy}
        handleOpenModal={handleOpenModal}
        handleExportCommissionRates={handleExportCommissionRates}
      />

      <CommissionRateTable
        loading={loading}
        commissionRates={commissionRates}
        categoriesRoot={categoriesRoot}
        handleOpenModal={handleOpenModal}
        COMMISSION_RATE_TABLE_MAP={COMMISSION_RATE_TABLE_MAP}
      />

      <CommissionRateForm
        action={action}
        open={openModal}
        onSubmit={handleSubmit}
        onClose={handleCloseModal}
        categoriesRoot={categoriesRoot}
        commissionRate={selectedCommissionRate}
      />
    </Paper>
  )
}
export default AdminCommissionRate
