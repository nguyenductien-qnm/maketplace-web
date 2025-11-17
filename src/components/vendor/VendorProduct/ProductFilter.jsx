import Box from '@mui/material/Box'
import Popover from '@mui/material/Popover'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import FilterListOutlinedIcon from '@mui/icons-material/FilterListOutlined'
import { useState } from 'react'
import TypographyLabel from '~/components/common/TypographyLabel'
import CategoryTreeView from '~/components/common/CategoryTreeView'
import { MenuItem, Select } from '@mui/material'
import TypographyTitle from '~/components/common/TypographyTitle'

function ProductFilter({
  filters,
  setFilters,
  handleFilter,
  handleClearFilter,
  categories
}) {
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
            minWidth: '450px',
            minHeight: '500px',
            maxHeight: '700px',
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
                <MenuItem value="stock_low_high">
                  Stock (Low - High) - Alert
                </MenuItem>
                <MenuItem value="stock_high_low">Stock (High - Low)</MenuItem>

                <MenuItem value="best_selling">Best Selling</MenuItem>
                <MenuItem value="worst_selling">Worst Selling</MenuItem>
                <MenuItem value="highest_revenue">Highest Revenue</MenuItem>
                <MenuItem value="lowest_revenue">Lowest Revenue</MenuItem>

                <MenuItem value="most_viewed">Most Viewed</MenuItem>
                <MenuItem value="most_reviewed">Most Reviewed</MenuItem>
                <MenuItem value="highest_rating">Highest Rating</MenuItem>
                <MenuItem value="lowest_rating">Lowest Rating</MenuItem>

                <MenuItem value="newest">Created (newest)</MenuItem>
                <MenuItem value="oldest">Created (oldest)</MenuItem>
                <MenuItem value="updated_at">Updated (recently)</MenuItem>

                <MenuItem value="price_high_low">Price (High - Low)</MenuItem>
                <MenuItem value="price_low_high">Price (Low - High)</MenuItem>
                <MenuItem value="name_asc">Name (A-Z)</MenuItem>
                <MenuItem value="name_desc">Name (Z-A)</MenuItem>
              </Select>
            </Box>

            <Box>
              <TypographyLabel>Category</TypographyLabel>

              <CategoryTreeView
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
