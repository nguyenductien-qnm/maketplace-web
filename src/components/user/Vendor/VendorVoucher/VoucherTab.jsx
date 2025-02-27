import { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import { Button, styled } from '@mui/material'
// import ProductTable from '../ProductTable'
import VoucherTable from './VoucherTable'
import LoyaltyOutlinedIcon from '@mui/icons-material/LoyaltyOutlined'
import VoucherModal from './VoucherModal'
// import SearchInput from './SearchInput'
// import EmptyProduct from '../EmptyProduct'
// import CircularIndeterminate from '~/components/CircularIndeterminate'
function VoucherTab({ listProduct, getProducts }) {
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

  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     await getProducts({ status: value })
  //     setLoading(false)
  //   }
  //   fetchProducts()
  // }, [value])

  //   const ProductTabContent = () => (
  //     <>
  //       <SearchInput customHandleSearch={customHandleSearch} />
  //       {loading ? (
  //         <Box sx={{ display: 'flex', justifyContent: 'center', mt: '50px' }}>
  //           <CircularIndeterminate />
  //         </Box>
  //       ) : listProduct?.length === 0 ? (
  //         <EmptyProduct />
  //       ) : (
  //         <ProductTable listProduct={listProduct} />
  //       )}
  //     </>
  //   )

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
          <VoucherTable />
        </TabPanel>
        <TabPanel value="INACTIVE">
          <VoucherTable />
        </TabPanel>
      </TabContext>
      <VoucherModal
        open={openModal}
        handleClose={() => setOpenModal(false)}
        action="CREATE"
      />
    </Box>
  )
}
export default VoucherTab
