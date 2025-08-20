import Paper from '@mui/material/Paper'
import RecentWalletTransactionsModal from '~/components/admin/wallet/RecentWalletTransactionsModal'
import WalletHeader from '~/components/admin/wallet/WalletHeader'
import WalletTable from '~/components/admin/wallet/WalletTable'
import { useAdminWallet } from '~/hooks/admin/wallet.hook'

function AdminWallet({ type }) {
  const {
    openDetailModal,
    recentTransactions,
    wallets,
    count,
    loading,

    filters,
    setFilters,
    page,
    rowsPerPage,
    shops,
    users,

    handleFilter,
    handleClearFilter,
    handleChangePage,
    handleChangeRowsPerPage,
    handleCloseModal,

    handleOpenModal
  } = useAdminWallet({ type })
  return (
    <Paper
      sx={{
        height: 'calc(90vh - 24px)',
        width: 'calc(100% - 24px)',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <WalletHeader
        type={type}
        users={users}
        shops={shops}
        filters={filters}
        setFilters={setFilters}
        handleFilter={handleFilter}
        handleClearFilter={handleClearFilter}
      />

      <WalletTable
        type={type}
        loading={loading}
        wallets={wallets}
        count={count}
        page={page}
        rowsPerPage={rowsPerPage}
        handleOpenModal={handleOpenModal}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
      />

      <RecentWalletTransactionsModal
        open={openDetailModal}
        onClose={handleCloseModal}
        recentTransactions={recentTransactions}
      />
    </Paper>
  )
}
export default AdminWallet
