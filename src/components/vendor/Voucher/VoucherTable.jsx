import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@mui/material'
import VoucherRow from './VoucherRow'
import {
  queryVoucherByOwnerAPI,
  shopCreateVoucherAPI,
  shopDeleteVoucherAPI,
  shopUpdateVoucherAPI
} from '~/api/voucher.api'
import { useEffect, useState } from 'react'
import VoucherFilter from './VoucherFilter'
import CircularIndeterminate from '~/components/common/CircularIndeterminate'
import ConfirmDeleteModal from './ConfirmDeleteModal'
import VoucherEmpty from './VoucherEmpty'
import VoucherModal from './VoucherModal'

function VoucherTable({ status, openModal, setOpenModal, action, setAction }) {
  const [vouchers, setVouchers] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedVoucher, setSelectedVoucher] = useState(null)
  const [openDelModal, setOpenDelModal] = useState(false)

  useEffect(() => {
    const fetchVouchers = async () => {
      setLoading(true)
      try {
        const res = await queryVoucherByOwnerAPI({ status })

        setVouchers(res?.data?.metadata || [])
      } finally {
        setLoading(false)
      }
    }

    fetchVouchers()
  }, [status])

  const handleShopCreateVoucher = async (data) => {
    const res = await shopCreateVoucherAPI(data, [
      '.btn-shop-cancel-submit-voucher',
      '.btn-shop-submit-voucher'
    ])
    if (res.status === 200) {
      setVouchers((prev) => [res?.data?.metadata, ...prev])
      return res
    }
  }
  const handleShopUpdateVoucher = async (data) => {
    const res = await shopUpdateVoucherAPI(data, [
      '.btn-shop-cancel-submit-voucher',
      '.btn-shop-submit-voucher'
    ])
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
  const handleShopDeleteVoucher = async (data) => {
    const res = await shopDeleteVoucherAPI(data, [
      '.btn-shop-confirm-delete-voucher',
      '.btn-shop-cancel-delete-order'
    ])
    if (res.status === 200) {
      setVouchers((prev) => prev.filter((voucher) => voucher._id !== data._id))
      return res
    }
  }
  const handleFilterVoucher = async (data) => {
    try {
      setLoading(true)
      const filteredPayloads = Object.fromEntries(
        Object.entries(data).filter(
          ([_, value]) => value !== '' && value != null
        )
      )
      const res = await queryVoucherByOwnerAPI({ ...filteredPayloads, status })
      setVouchers(res?.data?.metadata || [])
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Box>
        <VoucherFilter handleFilterVoucher={handleFilterVoucher} />
      </Box>
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: '50px' }}>
          <CircularIndeterminate />
        </Box>
      ) : vouchers.length === 0 ? (
        <VoucherEmpty
          setOpenModal={() => setOpenModal(true)}
          setAction={() => setAction('CREATE')}
        />
      ) : (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>CODE</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Start date</TableCell>
              <TableCell>End date</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Used</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Value</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {vouchers?.map((voucher) => (
              <VoucherRow
                setSelectedVoucher={setSelectedVoucher}
                setAction={setAction}
                setOpenModal={() => setOpenModal(true)}
                setOpenDelModal={() => setOpenDelModal(true)}
                key={voucher._id}
                voucher={voucher}
              />
            ))}
          </TableBody>
        </Table>
      )}

      <ConfirmDeleteModal
        open={openDelModal}
        onClose={() => {
          setOpenDelModal(false), setSelectedVoucher(null)
        }}
        voucherId={selectedVoucher?._id}
        handleDeleteVoucher={handleShopDeleteVoucher}
      />

      <VoucherModal
        voucher={selectedVoucher}
        open={openModal}
        action={action}
        handleClose={() => {
          setAction(null), setSelectedVoucher(null), setOpenModal(false)
        }}
        handleCreateVoucher={handleShopCreateVoucher}
        handleUpdateVoucher={handleShopUpdateVoucher}
      />
    </>
  )
}
export default VoucherTable
