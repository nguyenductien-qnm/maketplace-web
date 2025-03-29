import { useState } from 'react'
import VoucherTab from './VoucherTab'
import {
  shopCreateVoucherAPI,
  shopDeleteVoucherAPI,
  shopGetVoucherAPI,
  shopUpdateVoucherAPI
} from '~/api/voucher.api'

function VendorVoucher() {
  const [vouchers, setVouchers] = useState()
  const shopGetVoucher = async (data) => {
    const res = await shopGetVoucherAPI(data)
    if (res.status === 200) {
      setVouchers(res?.data?.metadata)
    }
  }
  const shopCreateVoucher = async (data) => {
    const res = await shopCreateVoucherAPI(data)
    if (res.status === 200) {
      setVouchers((prev) => [res?.data?.metadata, ...prev])
      return res
    }
  }
  const shopUpdateVoucher = async (data) => {
    const res = await shopUpdateVoucherAPI(data)
    if (res.status === 200) {
      setVouchers((prev) =>
        prev.map((voucher) =>
          voucher._id === res?.data?.metadata?._id
            ? res?.data?.metadata
            : voucher
        )
      )
      return res
    }
  }
  const shopDeleteVoucher = async (data) => {
    const res = await shopDeleteVoucherAPI(data)
    if (res.status === 200) {
      setVouchers((prev) => prev.filter((voucher) => voucher._id !== data._id))
      return res
    }
  }
  return (
    <VoucherTab
      vouchers={vouchers}
      shopGetVoucher={shopGetVoucher}
      shopCreateVoucher={shopCreateVoucher}
      shopUpdateVoucher={shopUpdateVoucher}
      shopDeleteVoucher={shopDeleteVoucher}
    />
  )
}
export default VendorVoucher
