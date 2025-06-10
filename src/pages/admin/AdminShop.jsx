import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import CircularIndeterminate from '~/components/common/CircularIndeterminate'
import ShopTable from '~/components/admin/shop/ShopTable'
import ShopHeader from '~/components/admin/shop/ShopHeader'
import { useEffect, useRef, useState } from 'react'
import { useAdminShop } from '~/hooks/admin/shop.hook'
import { exportShopDataAPI } from '~/api/shop.api'

function AdminShop({ name, status }) {
  const defaultFilters = {
    search: '',
    province: '',
    productCountRange: [0, 500],
    followerCountRange: [0, 1000],
    ratingRange: [0, 5]
  }

  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [filters, setFilters] = useState(defaultFilters)
  const skipEffect = useRef(false)

  const handleClearFilter = () => {
    skipEffect.current = true
    setFilters(defaultFilters)
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const {
    count,
    shops,
    loading,
    isDenied,
    queryShopByAdmin,
    banShop,
    openReasonModal,
    openInfoModal,
    handleOpenModal,
    handleCloseModal,
    selectedShop,
    modalProps,
    handleAcceptShop
  } = useAdminShop(page, rowsPerPage, status)

  const handleFilter = (data) => {
    setFilters(data)
    setPage(0)
  }

  const handleExportData = async () => {
    await exportShopDataAPI({ status, ...filters })
  }

  useEffect(() => {
    if (skipEffect.current == true) {
      skipEffect.current = false
      return
    }
    queryShopByAdmin({ page, rowsPerPage, status, ...filters })
  }, [status, page, filters, rowsPerPage])

  return (
    <Paper
      sx={{
        height: 'calc(90vh - 24px)',
        width: 'calc(100% - 24px)',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <ShopHeader
        name={name}
        filters={filters}
        handleFilter={handleFilter}
        handleExportData={handleExportData}
        handleClearFilter={handleClearFilter}
      />
      {loading && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            mt: '50px'
          }}
        >
          <CircularIndeterminate />
        </Box>
      )}
      {!loading && !isDenied && (
        <ShopTable
          shops={shops}
          count={count}
          page={page}
          rowsPerPage={rowsPerPage}
          banShop={banShop}
          modalProps={modalProps}
          handleChangePage={handleChangePage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
          openReasonModal={openReasonModal}
          openInfoModal={openInfoModal}
          selectedShop={selectedShop}
          handleOpenModal={handleOpenModal}
          handleCloseModal={handleCloseModal}
          handleAcceptShop={handleAcceptShop}
        />
      )}
    </Paper>
  )
}

export default AdminShop
