import { Box } from '@mui/material'
import BalanceWidget from './BalanceWidget'
import TransactionOverview from './TransactionOverview'
import PaymentMethod from './PaymentMethod'
import { useEffect, useState } from 'react'
import {
  addPaymentAccountAPI,
  deletePaymentAccountAPI,
  getShopWalletAPI,
  requestWithdrawAPI,
  setDefaultPaymentAccountAPI
} from '~/api/shopWallet.api'
import VendorWalletSkeleton from './VendorWalletSkeleton'
import { getTransactionsAPI } from '~/api/transaction.api'
import { getRequestWithdrawAPI } from '~/api/requestWithdraw.api'

function VendorWallet() {
  const [shopWallet, setShopWallet] = useState({})
  const [transactions, setTransactions] = useState([])
  const [requestWithdraws, setRequestWithdraws] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getShopWallet = async () => {
      try {
        const res = await getShopWalletAPI()
        setShopWallet(res?.data?.metadata || {})
      } finally {
        setLoading(false)
      }
    }
    const getTransactions = async () => {
      const res = await getTransactionsAPI()
      setTransactions(res?.data?.metadata || [])
    }
    const getRequestWithdraw = async () => {
      const res = await getRequestWithdrawAPI()
      setRequestWithdraws(res?.data?.metadata || [])
    }
    getShopWallet()
    getTransactions()
    getRequestWithdraw()
  }, [])

  const handleAddAccount = async (data) => {
    data.method = 'paypal'
    const res = await addPaymentAccountAPI(data, [
      '.btn-shop-add-payment-method',
      '.btn-shop-cancel-add-payment-method'
    ])
    if (res.status === 200) {
      const accounts = res?.data?.metadata
      setShopWallet((prevState) => ({
        ...prevState,
        shop_payment_methods: accounts
      }))
    }
    return res
  }

  const handleSetDefault = async (data) => {
    const { _id } = data
    const res = await setDefaultPaymentAccountAPI({ _id }, [
      '.btn-shop-set-default-payment-method',
      '.btn-shop-delete-payment-method'
    ])
    if (res.status === 200) {
      setShopWallet((prevState) => {
        const updatedPaymentMethods = prevState.shop_payment_methods.map(
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
          shop_payment_methods: updatedPaymentMethods
        }
      })
    }
  }

  const handleDelete = async (data) => {
    const { _id } = data
    const res = await deletePaymentAccountAPI({ _id }, [
      '.btn-shop-set-default-payment-method',
      '.btn-shop-delete-payment-method'
    ])
    if (res.status === 200) {
      setShopWallet((prevState) => {
        const updatedPaymentMethods = prevState.shop_payment_methods.filter(
          (method) => method._id !== _id
        )

        return {
          ...prevState,
          shop_payment_methods: updatedPaymentMethods
        }
      })
    }
  }

  const handleRequestWithdraw = async (data) => {
    const res = await requestWithdrawAPI(data, [
      '.btn-shop-request-withdraw',
      '.btn-shop-cancel-request-withdraw'
    ])
    if (res.status === 200) {
      setShopWallet((prev) => ({
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
