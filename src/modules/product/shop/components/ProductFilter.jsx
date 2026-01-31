import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Popover from '@mui/material/Popover'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import FilterListOutlinedIcon from '@mui/icons-material/FilterListOutlined'
import TypographyTitle from '~/components/common/TypographyTitle'
import { useState } from 'react'

function ProductFilter({ data, handler }) {
  const { tempFilters } = data
  const { handleFilterChange, handleApplyFilter, handleClearTempFilters } =
    handler

  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)

  const handleOpenFilter = (event) => setAnchorEl(event.currentTarget)
  const handleCloseFilter = () => setAnchorEl(null)

  return (
    <Box>
      <Button sx={{ p: 1 }} variant="outlined" onClick={handleOpenFilter}>
        <FilterListOutlinedIcon sx={{ mr: 1 }} />
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
            width: '450px',
            height: '630px',
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
              gap: '25px'
            }}
          >
            <TextField
              sx={{ mt: 2 }}
              select
              fullWidth
              label="Sort By"
              value={tempFilters.sort_by || ''}
              onChange={(e) => handleFilterChange('sort_by', e.target.value)}
            >
              <MenuItem value="newest">Created (newest)</MenuItem>
              <MenuItem value="oldest">Created (oldest)</MenuItem>
            </TextField>

            <TextField
              fullWidth
              label="Search"
              placeholder="Enter product name, code, slug..."
              value={tempFilters.search}
              onChange={(e) => handleFilterChange('search', e.target.value)}
            />

            <TextField
              select
              fullWidth
              label="Type"
              value={tempFilters.type || ''}
              onChange={(e) => handleFilterChange('type', e.target.value)}
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="simple">Simple</MenuItem>
              <MenuItem value="variable">Variable</MenuItem>
            </TextField>

            <TextField
              select
              fullWidth
              label="Visibility"
              value={tempFilters.visibility || ''}
              onChange={(e) => handleFilterChange('visibility', e.target.value)}
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="public">Public</MenuItem>
              <MenuItem value="private">Private</MenuItem>
            </TextField>
          </Box>

          <Box
            sx={{
              padding: 3,
              paddingTop: 0,
              display: 'flex',
              justifyContent: 'flex-end',
              flexShrink: 0
            }}
          >
            <Button
              onClick={() => handleClearTempFilters()}
              variant="contained"
              sx={{ backgroundColor: 'black', mr: 1 }}
            >
              Clear
            </Button>
            <Button
              variant="contained"
              onClick={() => {
                handleApplyFilter()
                handleCloseFilter()
              }}
            >
              Apply
            </Button>
          </Box>
        </Box>
      </Popover>
    </Box>
  )
}

export default ProductFilter
