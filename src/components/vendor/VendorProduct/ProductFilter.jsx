import Box from '@mui/material/Box'
import Popover from '@mui/material/Popover'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import TextField from '@mui/material/TextField'
import FilterListOutlinedIcon from '@mui/icons-material/FilterListOutlined'
import { useState } from 'react'
import TypographyLabel from '~/components/common/TypographyLabel'
import CategoryTreeView from '~/components/common/CategoryTreeView'
import { MenuItem, Select } from '@mui/material'

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
        sx={{ height: '600px' }}
      >
        <Box
          sx={{
            minWidth: '450px',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px'
          }}
        >
          <h3 style={{ marginBottom: 0 }}>Advanced Filters</h3>
          <Divider />
          <Box sx={{ flex: 1 }}>
            <TextField
              fullWidth
              placeholder="Enter product name or code"
              size="small"
              value={filters.search}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, search: e.target.value }))
              }
            />
          </Box>

          <Box sx={{ flex: 1 }}>
            <TypographyLabel>Sort by</TypographyLabel>
            <Select
              size="small"
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
              <MenuItem value="name_asc">Name (A-Z)</MenuItem>
              <MenuItem value="name_desc">Name (Z-A)</MenuItem>
            </Select>
          </Box>

          <Box sx={{ flex: 1 }}>
            <TypographyLabel>Category</TypographyLabel>

            <CategoryTreeView
              categories={categories}
              value={filters.category || ''}
              onChange={(newSelected) =>
                setFilters((prev) => ({ ...prev, category: newSelected }))
              }
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
