import { useState } from 'react'
import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import { styled } from '@mui/material'
import Filter from './Filter/Filter'
import ProductTable from '../ProductTable'

export default function TabProduct({ listProduct }) {
  const [value, setValue] = useState('1')

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const CustomTab = styled(Tab)({
    '&.MuiTab-root': {
      textTransform: 'none'
    }
  })

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <CustomTab label="All" value="1" />
            <CustomTab label="Pending Review" value="2" />
            <CustomTab label="In stock" value="3" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <Filter />
          <ProductTable listProduct={listProduct} />
        </TabPanel>
        <TabPanel value="2">Pending Review</TabPanel>
        <TabPanel value="3">In stock</TabPanel>
      </TabContext>
    </Box>
  )
}
