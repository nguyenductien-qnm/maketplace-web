import {
  Box,
  IconButton,
  MenuItem,
  Popover,
  Select,
  Slider
} from '@mui/material'
import SearchInput from '~/components/common/SearchInput'
import FilterListIcon from '@mui/icons-material/FilterList'
import { useState } from 'react'
import { useSelector } from 'react-redux'

function ProductFilter({ handleFilterProduct }) {
  const categories = useSelector((state) => state.categories.categories)
  const [searchValue, setSearchValue] = useState('')
  const [priceRange, setPriceRange] = useState([0, 10000])
  const [selectedCategories, setSelectedCategories] = useState([])

  const [anchorEl, setAnchorEl] = useState(null)
  const handleOpenFilter = (event) => setAnchorEl(event.currentTarget)
  const handleCloseFilter = () => setAnchorEl(null)
  const open = Boolean(anchorEl)

  const handleSearch = () => {
    const payloads = {
      search: searchValue,
      categories: selectedCategories,
      priceRange: priceRange
    }
    handleFilterProduct(payloads)
  }

  return (
    <Box sx={{ display: 'flex', gap: '10px' }}>
      <Box sx={{ flexGrow: 1 }}>
        <SearchInput
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          handleSearch={handleSearch}
        />
      </Box>
      <Box>
        <IconButton onClick={handleOpenFilter} color="primary">
          <FilterListIcon />
        </IconButton>

        <Popover
          open={open}
          anchorEl={anchorEl}
          onClose={handleCloseFilter}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          sx={{ width: 500 }}
        >
          <Box p={2} width={300}>
            <h4>Advanced filters</h4>

            <Select
              size="small"
              fullWidth
              multiple
              value={selectedCategories}
              onChange={(e) => setSelectedCategories(e.target.value)}
              displayEmpty
            >
              {categories.map((category) => (
                <MenuItem key={category._id} value={category.category_code}>
                  {category.category_name}
                </MenuItem>
              ))}
            </Select>

            <Box mt={2} width="100%">
              <p>
                Price range: {priceRange[0].toLocaleString()} -{' '}
                {priceRange[1].toLocaleString()} $
              </p>
              <Slider
                value={priceRange}
                onChange={(e, newValue) => setPriceRange(newValue)}
                valueLabelDisplay="auto"
                min={0}
                max={10000}
                step={50}
                sx={{ width: '100%' }}
              />
            </Box>
          </Box>
        </Popover>
      </Box>
    </Box>
  )
}
export default ProductFilter
