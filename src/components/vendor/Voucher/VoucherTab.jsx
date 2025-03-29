import { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import { Button, styled } from '@mui/material'
import VoucherTable from './VoucherTable'
import LoyaltyOutlinedIcon from '@mui/icons-material/LoyaltyOutlined'
import VoucherModal from './VoucherModal'
import SearchInput from '~/components/common/SearchInput'
import CircularIndeterminate from '~/components/common/CircularIndeterminate'
import ProductEmpty from '../Product/Display/ProductEmpty'
function VoucherTab({
  vouchers,
  shopGetVoucher,
  shopCreateVoucher,
  shopUpdateVoucher,
  shopDeleteVoucher
}) {
  const [openModal, setOpenModal] = useState(false)
  const [value, setValue] = useState('ACTIVE')
  const [loading, setLoading] = useState(true)
  const handleChange = (event, newValue) => {
    setLoading(true)
    setValue(newValue)
  }

  const CustomTab = styled(Tab)({
    '&.MuiTab-root': {
      textTransform: 'none'
    }
  })

  const customHandleSearch = async (searchValue) => {
    setLoading(true)
    const data = {
      status: value,
      search: searchValue
    }
    await getProducts(data)
    setLoading(false)
  }

  useEffect(() => {
    const fetchVouchers = async () => {
      await shopGetVoucher({ status: value })
      setLoading(false)
    }
    fetchVouchers()
  }, [value])

  const VoucherTabContent = () => (
    <>
      <SearchInput customHandleSearch={customHandleSearch} />
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: '50px' }}>
          <CircularIndeterminate />
        </Box>
      ) : vouchers?.length === 0 ? (
        <ProductEmpty />
      ) : (
        <VoucherTable
          vouchers={vouchers}
          shopUpdateVoucher={shopUpdateVoucher}
          shopDeleteVoucher={shopDeleteVoucher}
        />
      )}
    </>
  )

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box
          sx={{
            borderBottom: 1,
            borderColor: 'divider',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <CustomTab label="Active" value="ACTIVE" />
            <CustomTab label="Inactive" value="INACTIVE" />
          </TabList>
          <Button
            onClick={() => setOpenModal(true)}
            variant="contained"
            color="primary"
            sx={{ height: '30px' }}
          >
            <LoyaltyOutlinedIcon />
            Add new voucher
          </Button>
        </Box>
        <TabPanel value="ACTIVE">
          <VoucherTabContent />
        </TabPanel>
        <TabPanel value="INACTIVE">
          <VoucherTabContent />
        </TabPanel>
      </TabContext>
      <VoucherModal
        voucher={null}
        open={openModal}
        handleClose={() => setOpenModal(false)}
        action="CREATE"
        shopCreateVoucher={shopCreateVoucher}
      />
    </Box>
  )
}
export default VoucherTab
