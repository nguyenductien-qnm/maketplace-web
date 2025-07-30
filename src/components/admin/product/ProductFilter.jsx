import Box from '@mui/material/Box'
import Popover from '@mui/material/Popover'
import Slider from '@mui/material/Slider'
import Autocomplete from '@mui/material/Autocomplete'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import TextField from '@mui/material/TextField'
import FilterListOutlinedIcon from '@mui/icons-material/FilterListOutlined'
import TypographyLabel from '../../common/TypographyLabel'
import CategoryTreeView from '~/components/common/CategoryTreeView'
import { useState } from 'react'

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
        sx={{ height: '750px' }}
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
              placeholder="Enter product name"
              size="small"
              value={filters.search}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, search: e.target.value }))
              }
            />
          </Box>

          <Box sx={{ flex: 1 }}>
            <TypographyLabel>Product of shop</TypographyLabel>
            <Autocomplete
              size="small"
              fullWidth
              options={shops || []}
              getOptionLabel={(option) => option.shop_name || ''}
              value={
                shops?.find((shop) => shop._id === filters.productOfShop) ||
                null
              }
              onChange={(_, newValue) => {
                setFilters((prev) => ({
                  ...prev,
                  productOfShop: newValue?._id || ''
                }))
              }}
              renderInput={(params) => <TextField {...params} />}
              isOptionEqualToValue={(option, value) => option._id === value._id}
            />
          </Box>

          <Box sx={{ flex: 1 }}>
            <TypographyLabel>Category</TypographyLabel>

            <CategoryTreeView
              multi="true"
              categories={categories}
              value={filters.category || ''}
              onChange={(newSelected) =>
                setFilters((prev) => ({ ...prev, category: newSelected }))
              }
            />
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
