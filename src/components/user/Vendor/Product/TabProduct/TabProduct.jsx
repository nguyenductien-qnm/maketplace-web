import { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import { Button, styled } from '@mui/material'
import ProductTable from '../ProductTable'
import { Link } from 'react-router-dom'
import BusinessCenterOutlinedIcon from '@mui/icons-material/BusinessCenterOutlined'
import SearchInput from '~/components/SearchInput'
import EmptyProduct from '../EmptyProduct'
import CircularIndeterminate from '~/components/CircularIndeterminate'
function TabProduct({ listProduct, getProducts }) {
  const [value, setValue] = useState('ALL')
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
    const fetchProducts = async () => {
      await getProducts({ status: value })
      setLoading(false)
    }
    fetchProducts()
  }, [value])

  const ProductTabContent = () => (
    <>
      <SearchInput customHandleSearch={customHandleSearch} />
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: '50px' }}>
          <CircularIndeterminate />
        </Box>
      ) : listProduct?.length === 0 ? (
        <EmptyProduct />
      ) : (
        <ProductTable listProduct={listProduct} />
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
            <CustomTab label="All" value="ALL" />
            <CustomTab label="Approved" value="PUBLIC" />
            <CustomTab label="Pending Review" value="PENDING_REVIEW" />
            <CustomTab label="In Of Stock" value="IN_OF_STOCK" />
            <CustomTab label="Out Of Stock" value="OUT_OF_STOCK" />
            <CustomTab label="Draft" value="DRAFT" />
          </TabList>
          <Link to="/vendor/create-product">
            <Button variant="contained" color="primary" sx={{ height: '30px' }}>
              <BusinessCenterOutlinedIcon />
              Add new product
            </Button>
          </Link>
        </Box>
        <TabPanel value="ALL">
          <ProductTabContent />
        </TabPanel>
        <TabPanel value="PUBLIC">
          <ProductTabContent />
        </TabPanel>
        <TabPanel value="PENDING_REVIEW">
          <ProductTabContent />
        </TabPanel>
        <TabPanel value="IN_OF_STOCK">
          <ProductTabContent />
        </TabPanel>
        <TabPanel value="OUT_OF_STOCK">
          <ProductTabContent />
        </TabPanel>
        <TabPanel value="DRAFT">
          <ProductTabContent />
        </TabPanel>
      </TabContext>
    </Box>
  )
}
export default TabProduct
