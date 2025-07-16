import { useEffect, useState } from 'react'
import {
  shopAddPaymentAccountAPI,
  shopDeletePaymentAccountAPI,
  getShopWalletAPI,
  shopRequestWithdrawAPI,
  shopSetDefaultPaymentAccountAPI
} from '~/api/wallet.api'
import { getShopTransactionsAPI } from '~/api/transaction.api'
import { getShopRequestWithdrawAPI } from '~/api/withdrawRequest.api'

export const useVendorWallet = () => {
  const [shopWallet, setShopWallet] = useState({})
  const [transactions, setTransactions] = useState([])
  const [requestWithdraws, setRequestWithdraws] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [walletRes, transRes, withdrawRes] = await Promise.all([
          getShopWalletAPI(),
          getShopTransactionsAPI(),
          getShopRequestWithdrawAPI()
        ])

        setShopWallet(walletRes?.data?.metadata || {})
        setTransactions(transRes?.data?.metadata || [])
        setRequestWithdraws(withdrawRes?.data?.metadata || [])
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const handleAddAccount = async (data) => {
    data.method = 'paypal'
    const res = await shopAddPaymentAccountAPI(data, [
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
    const res = await shopSetDefaultPaymentAccountAPI({ _id }, [
      '.btn-shop-set-default-payment-method',
      '.btn-shop-delete-payment-method'
    ])
    if (res.status === 200) {
      setShopWallet((prevState) => {
        const updated = prevState.shop_payment_methods
          .map((m) =>
            m._id === _id
              ? { ...m, is_default: true }
              : { ...m, is_default: false }
          )
          .sort((a, b) => b.is_default - a.is_default)

        return { ...prevState, shop_payment_methods: updated }
      })
    }
  }

  const handleDelete = async ({ _id }) => {
    const res = await shopDeletePaymentAccountAPI({ _id }, [
      '.btn-shop-set-default-payment-method',
      '.btn-shop-delete-payment-method'
    ])
    if (res.status === 200) {
      setShopWallet((prevState) => ({
        ...prevState,
        shop_payment_methods: prevState.shop_payment_methods.filter(
          (m) => m._id !== _id
        )
      }))
    }
  }

  const handleRequestWithdraw = async (data) => {
    const res = await shopRequestWithdrawAPI(data, [
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

  return {
    loading,
    shopWallet,
    transactions,
    requestWithdraws,
    handleAddAccount,
    handleSetDefault,
    handleDelete,
    handleRequestWithdraw
  }
}
