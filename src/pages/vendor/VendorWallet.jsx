import { Box } from '@mui/material'
import BalanceWidget from '~/components/shared/Wallet/BalanceWidget'
import TransactionOverview from '~/components/shared/Wallet/TransactionOverview'
import PaymentMethod from '~/components/shared/Wallet/PaymentMethod'
import VendorWalletSkeleton from '~/components/shared/Wallet/VendorWalletSkeleton'
import { useVendorWallet } from '~/hooks/vendor/wallet.hook'

function VendorWallet() {
  const {
    loading,
    shopWallet,
    transactions,
    requestWithdraws,
    handleAddAccount,
    handleSetDefault,
    handleDelete,
    handleRequestWithdraw
  } = useVendorWallet()

  return (
    <Box>
      {loading && <VendorWalletSkeleton />}
      {!loading && (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
          <BalanceWidget
            balance={shopWallet?.shop_balance}
            accounts={shopWallet?.shop_payment_methods}
            handleRequestWithdraw={handleRequestWithdraw}
            requestWithdraws={requestWithdraws}
          />
          <TransactionOverview transactions={transactions} />
          <PaymentMethod
            accounts={shopWallet?.shop_payment_methods}
            handleAddAccount={handleAddAccount}
            handleSetDefault={handleSetDefault}
            handleDelete={handleDelete}
          />
        </Box>
      )}
    </Box>
  )
}

export default VendorWallet
