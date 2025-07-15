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
    handleOpenModal,
    handleCloseModal,
    handleCreateCommissionRate,
    handleUpdateCommissionRate
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
      <CommissionRateHeader handleOpenModal={handleOpenModal} />
      <CommissionRateTable
        loading={loading}
        commissionRates={commissionRates}
        categoriesRoot={categoriesRoot}
        handleOpenModal={handleOpenModal}
      />
      <CommissionRateForm
        action={action}
        open={openModal}
        onSubmit={
          action === 'create'
            ? handleCreateCommissionRate
            : handleUpdateCommissionRate
        }
        onClose={handleCloseModal}
        categoriesRoot={categoriesRoot}
        commissionRate={selectedCommissionRate}
      />
    </Paper>
  )
}
export default AdminCommissionRate
