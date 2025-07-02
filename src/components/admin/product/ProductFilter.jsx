import Box from '@mui/material/Box'
import MenuItem from '@mui/material/MenuItem'
import Popover from '@mui/material/Popover'
import Select from '@mui/material/Select'
import Slider from '@mui/material/Slider'
import { useEffect, useState } from 'react'
import FilterListOutlinedIcon from '@mui/icons-material/FilterListOutlined'
import { Button, Divider, TextField } from '@mui/material'
import { apiGetProvinces } from '~/helpers/getAddress'
import TypographyLabel from '../../common/TypographyLabel'

function ProductFilter({
  shops,
  categories,
  filters,
  setFilters,
  handleFilter,
  handleClearFilter
}) {
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const [provinces, setProvinces] = useState([])

  const handleOpenFilter = (event) => setAnchorEl(event.currentTarget)
  const handleCloseFilter = () => setAnchorEl(null)
  return (
    <Box>
      <Button variant="contained" onClick={handleOpenFilter}>
        <FilterListOutlinedIcon />
        Filters
      </Button>

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleCloseFilter}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Box
          sx={{
            minWidth: '400px',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px'
          }}
        >
          <h3 style={{ marginBottom: 0 }}>Advanced filters</h3>
          <Divider />
          <Box sx={{ flex: 1 }}>
            <TextField
              fullWidth
              placeholder="Enter product name or product ID"
              size="small"
              value={filters.search}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, search: e.target.value }))
              }
            />
          </Box>

          <Box sx={{ flex: 1 }}>
            <TypographyLabel>Product of shop</TypographyLabel>
            <Select
              size="small"
              fullWidth
              value={filters.productOfShop || ''}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  productOfShop: e.target.value
                }))
              }
              displayEmpty
            >
              {shops?.map((shop) => (
                <MenuItem key={shop._id} value={shop._id}>
                  {shop.shop_name}
                </MenuItem>
              ))}
            </Select>
          </Box>

          <Box sx={{ flex: 1 }}>
            <TypographyLabel>Category</TypographyLabel>
            <Select
              size="small"
              fullWidth
              value={filters.category || ''}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  category: e.target.value
                }))
              }
              displayEmpty
            >
              {categories?.map((c) => (
                <MenuItem key={c._id} value={c.category_code}>
                  {c.category_name}
                </MenuItem>
              ))}
            </Select>
          </Box>

          <Box sx={{ display: 'flex', gap: 1 }}>
            <Box sx={{ flex: 1 }}>
              <TypographyLabel>Created from</TypographyLabel>
              <TextField
                onChange={(e) =>
                  setFilters((prev) => ({
                    ...prev,
                    createdFrom: e.target.value
                  }))
                }
                value={filters.createdFrom}
                size="small"
                type="date"
                fullWidth
              />
            </Box>
            <Box sx={{ flex: 1 }}>
              <TypographyLabel>Created to</TypographyLabel>
              <TextField
                onChange={(e) =>
                  setFilters((prev) => ({
                    ...prev,
                    createdTo: e.target.value
                  }))
                }
                value={filters.createdTo}
                size="small"
                type="date"
                fullWidth
              />
            </Box>
          </Box>

          <Box sx={{ flex: 1 }}>
            <TypographyLabel>
              Price range: {filters.priceRange[0].toLocaleString()} -{' '}
              {filters.priceRange[1].toLocaleString()} $
            </TypographyLabel>
            <Slider
              value={filters.priceRange}
              onChange={(e, newValue) =>
                setFilters((prev) => ({ ...prev, priceRange: newValue }))
              }
              valueLabelDisplay="auto"
              min={0}
              max={2000}
              step={50}
            />
          </Box>

          <Divider />
          <Box sx={{ alignSelf: 'end' }}>
            <Button
              onClick={handleClearFilter}
              variant="contained"
              sx={{ backgroundColor: 'black', mr: '10px' }}
            >
              Clear
            </Button>
            <Button
              variant="contained"
              onClick={() => {
                handleFilter()
                handleCloseFilter()
              }}
            >
              Search
            </Button>
          </Box>
        </Box>
      </Popover>
    </Box>
  )
}
export default ProductFilter
