import Box from '@mui/material/Box'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import VoucherRow from './VoucherRow'
import VoucherFilter from './VoucherFilter'
import CircularIndeterminate from '~/components/common/CircularIndeterminate'
import ConfirmModal from '~/components/common/ConfirmModal'
import VoucherEmpty from './VoucherEmpty'
import VoucherModal from './VoucherModal'
import { useVendorVoucher } from '~/hooks/vendor/voucher.hook'
import { useState } from 'react'

function VoucherTable({ status, openModal, setOpenModal, action, setAction }) {
  const {
    vouchers,
    loading,
    fetchVouchers,
    createVoucher,
    updateVoucher,
    deleteVoucher
  } = useVendorVoucher(status)

  const [selectedVoucher, setSelectedVoucher] = useState(null)
  const [openDelModal, setOpenDelModal] = useState(false)

  const handleFilter = async (filters) => {
    await fetchVouchers(filters)
  }

  return (
    <>
      <Box>
        <VoucherFilter handleFilterVoucher={handleFilter} />
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
            {vouchers.map((voucher) => (
              <VoucherRow
                key={voucher._id}
                voucher={voucher}
                setSelectedVoucher={setSelectedVoucher}
                setOpenModal={() => setOpenModal(true)}
                setAction={setAction}
                setOpenDelModal={() => setOpenDelModal(true)}
              />
            ))}
          </TableBody>
        </Table>
      )}

      <ConfirmModal
        header="Confirm Deletion"
        content="Are you sure you want to delete this item? This action cannot be undone."
        open={openDelModal}
        onClose={() => setOpenDelModal(false)}
        onConfirm={async () => {
          const res = await deleteVoucher(selectedVoucher)
          if (res.status === 200) {
            setOpenDelModal(false)
            setSelectedVoucher(null)
          }
        }}
        confirmColor="error"
      />

      <VoucherModal
        voucher={selectedVoucher}
        open={openModal}
        action={action}
        handleClose={() => {
          setAction(null)
          setSelectedVoucher(null)
          setOpenModal(false)
        }}
        handleCreateVoucher={createVoucher}
        handleUpdateVoucher={updateVoucher}
      />
    </>
  )
}
export default VoucherTable
