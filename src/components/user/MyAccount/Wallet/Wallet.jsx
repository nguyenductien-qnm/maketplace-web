import { Box } from '@mui/material'
import BalanceWidget from '~/components/shared/Wallet/BalanceWidget'
import TransactionOverview from '~/components/shared/Wallet/TransactionOverview'
import PaymentMethod from '~/components/shared/Wallet/PaymentMethod'
import { useEffect, useState } from 'react'
import {
  userAddPaymentAccountAPI,
  userDeletePaymentAccountAPI,
  getUserWalletAPI,
  userRequestWithdrawAPI,
  userSetDefaultPaymentAccountAPI
} from '~/api/wallet.api'
import VendorWalletSkeleton from '~/components/shared/Wallet/VendorWalletSkeleton'
import { getUserTransactionsAPI } from '~/api/transaction.api'
import { getUserRequestWithdrawAPI } from '~/api/requestWithdraw.api'

function Wallet() {
  const [userWallet, setUserWallet] = useState({})
  const [transactions, setTransactions] = useState([])
  const [requestWithdraws, setRequestWithdraws] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getUserWallet = async () => {
      try {
        const res = await getUserWalletAPI()
        setUserWallet(res?.data?.metadata || {})
      } finally {
        setLoading(false)
      }
    }
    const getTransactions = async () => {
      const res = await getUserTransactionsAPI()
      setTransactions(res?.data?.metadata || [])
    }
    const getRequestWithdraw = async () => {
      const res = await getUserRequestWithdrawAPI()
      setRequestWithdraws(res?.data?.metadata || [])
    }
    getUserWallet()
    getTransactions()
    getRequestWithdraw()
  }, [])

  const handleAddAccount = async (data) => {
    data.method = 'paypal'
    const res = await userAddPaymentAccountAPI(data, [
      '.btn-shop-add-payment-method',
      '.btn-shop-cancel-add-payment-method'
    ])
    if (res.status === 200) {
      const accounts = res?.data?.metadata
      setUserWallet((prevState) => ({
        ...prevState,
        user_payment_methods: accounts
      }))
    }
    return res
  }

  const handleSetDefault = async (data) => {
    const { _id } = data
    const res = await userSetDefaultPaymentAccountAPI({ _id }, [
      '.btn-shop-set-default-payment-method',
      '.btn-shop-delete-payment-method'
    ])
    if (res.status === 200) {
      setUserWallet((prevState) => {
        const updatedPaymentMethods = prevState.user_payment_methods.map(
          (method) => {
            if (method._id === _id) {
              return { ...method, is_default: true }
            }
            return { ...method, is_default: false }
          }
        )

        updatedPaymentMethods.sort((a, b) => b.is_default - a.is_default)

        return {
          ...prevState,
          user_payment_methods: updatedPaymentMethods
        }
      })
    }
  }

  const handleDelete = async (data) => {
    const { _id } = data
    const res = await userDeletePaymentAccountAPI({ _id }, [
      '.btn-shop-set-default-payment-method',
      '.btn-shop-delete-payment-method'
    ])
    if (res.status === 200) {
      setUserWallet((prevState) => {
        const updatedPaymentMethods = prevState.user_payment_methods.filter(
          (method) => method._id !== _id
        )

        return {
          ...prevState,
          user_payment_methods: updatedPaymentMethods
        }
      })
    }
  }

  const handleRequestWithdraw = async (data) => {
    const res = await userRequestWithdrawAPI(data, [
      '.btn-shop-request-withdraw',
      '.btn-shop-cancel-request-withdraw'
    ])
    if (res.status === 200) {
      setUserWallet((prev) => ({
        ...prev,
        shop_balance: prev.shop_balance - data.amount
      }))
    }
    return res
  }

  return (
    <Box>
      {loading && <VendorWalletSkeleton />}
      {!loading && (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
          <BalanceWidget
            balance={userWallet?.user_balance}
            accounts={userWallet?.user_payment_methods}
            handleRequestWithdraw={handleRequestWithdraw}
            requestWithdraws={requestWithdraws}
          />
          <TransactionOverview transactions={transactions} />
          <PaymentMethod
            accounts={userWallet?.user_payment_methods}
            handleAddAccount={handleAddAccount}
            handleSetDefault={handleSetDefault}
            handleDelete={handleDelete}
          />
        </Box>
      )}
    </Box>
  )
}
export default Wallet
