import Box from '@mui/material/Box'
import Popover from '@mui/material/Popover'
import Autocomplete from '@mui/material/Autocomplete'
import Button from '@mui/material/Button'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import FilterListOutlinedIcon from '@mui/icons-material/FilterListOutlined'
import TypographyLabel from '../../common/TypographyLabel'
import CategoryTreeView from '~/components/common/CategoryTreeView'
import TypographyTitle from '~/components/common/TypographyTitle'
import { useState } from 'react'

function ProductFilter({ data, handler }) {
  const { shops, categories, filters } = data
  const { setFilters, handleFilter, handleClearFilter } = handler

  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)

  const handleOpenFilter = (event) => setAnchorEl(event.currentTarget)
  const handleCloseFilter = () => setAnchorEl(null)
  return (
    <Box>
      <Button variant="outlined" onClick={handleOpenFilter}>
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
            minWidth: '500px',
            height: '750px',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <Box sx={{ padding: 3, paddingBottom: 2, flexShrink: 0 }}>
            <TypographyTitle>Advanced Filters</TypographyTitle>
          </Box>

          <Box
            sx={{
              flex: 1,
              overflowY: 'auto',
              padding: '0 24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '20px'
            }}
          >
            <Box>
              <TextField
                fullWidth
                placeholder="Enter product name or code"
                value={filters.search}
                onChange={(e) =>
                  setFilters((prev) => ({ ...prev, search: e.target.value }))
                }
              />
            </Box>

            <Box>
              <TypographyLabel>Sort by</TypographyLabel>
              <Select
                fullWidth
                value={filters.sort_by || ''}
                onChange={(e) =>
                  setFilters((prev) => ({
                    ...prev,
                    sort_by: e.target.value
                  }))
                }
                displayEmpty
              >
                <MenuItem value="newest">Created (newest)</MenuItem>
                <MenuItem value="oldest">Created (oldest)</MenuItem>
                <MenuItem value="updated_at">Updated (recently)</MenuItem>
                <MenuItem value="most_reported">Most Reported</MenuItem>
                <MenuItem value="lowest_rating">Lowest Rating</MenuItem>
                <MenuItem value="best_selling">Best Selling (sold)</MenuItem>
                <MenuItem value="worst_selling">Worst Selling (sold)</MenuItem>
                <MenuItem value="highest_revenue">Highest Revenue</MenuItem>
                <MenuItem value="most_viewed">Most Viewed</MenuItem>
                <MenuItem value="most_reviewed">Most Reviewed</MenuItem>
                <MenuItem value="price_low_high">Price (Low - High)</MenuItem>
                <MenuItem value="price_high_low">Price (High - Low)</MenuItem>
                <MenuItem value="name_asc">Name (A-Z)</MenuItem>
                <MenuItem value="name_desc">Name (Z-A)</MenuItem>
              </Select>
            </Box>

            <Box>
              <TypographyLabel>Product of shop</TypographyLabel>
              <Autocomplete
                fullWidth
                options={shops || []}
                getOptionLabel={(option) => option.shop_name || ''}
                value={
                  shops?.find((shop) => shop._id === filters.product_of_shop) ||
                  null
                }
                onChange={(_, newValue) => {
                  setFilters((prev) => ({
                    ...prev,
                    product_of_shop: newValue?._id || ''
                  }))
                }}
                renderInput={(params) => <TextField {...params} />}
                isOptionEqualToValue={(option, value) =>
                  option._id === value._id
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
                      created_from: e.target.value
                    }))
                  }
                  value={filters.created_from}
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
                      created_to: e.target.value
                    }))
                  }
                  value={filters.created_to}
                  type="date"
                  fullWidth
                />
              </Box>
            </Box>

            <Box>
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
          </Box>

          <Box
            sx={{
              padding: 3,
              paddingTop: 2,
              display: 'flex',
              justifyContent: 'flex-end',
              flexShrink: 0,
              marginTop: 2
            }}
          >
            <Button
              onClick={() => {
                handleClearFilter()
                handleCloseFilter()
              }}
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
