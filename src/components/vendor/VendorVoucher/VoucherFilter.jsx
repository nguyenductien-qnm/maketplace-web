import Box from '@mui/material/Box'
import Select from '@mui/material/Select'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Popover from '@mui/material/Popover'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import FilterListOutlinedIcon from '@mui/icons-material/FilterListOutlined'
import TypographyLabel from '~/components/common/TypographyLabel'
import { useState } from 'react'

function VoucherFilter({
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
              placeholder="Enter voucher name or code"
              size="small"
              value={filters.search}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, search: e.target.value }))
              }
            />
          </Box>

          <Box sx={{ flex: 1 }}>
            <TypographyLabel>Voucher Type</TypographyLabel>
            <Select
              size="small"
              fullWidth
              value={filters.voucher_type || ''}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  voucher_type: e.target.value
                }))
              }
              displayEmpty
            >
              <MenuItem value="fixed_amount">Fixed Amount</MenuItem>
              <MenuItem value="percent">Percent</MenuItem>
            </Select>
          </Box>

          <Box sx={{ flex: 1 }}>
            <TypographyLabel>Voucher Apply</TypographyLabel>
            <Select
              size="small"
              fullWidth
              value={filters.voucher_apply || ''}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  voucher_apply: e.target.value
                }))
              }
              displayEmpty
            >
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="specific">Specific</MenuItem>
            </Select>
          </Box>

          <Box sx={{ flex: 1 }}>
            <TypographyLabel>Voucher Visibility</TypographyLabel>
            <Select
              size="small"
              fullWidth
              value={filters.voucher_visibility || ''}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  voucher_visibility: e.target.value
                }))
              }
              displayEmpty
            >
              <MenuItem value="public">Public</MenuItem>
              <MenuItem value="private">Private</MenuItem>
            </Select>
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
            </Select>
          </Box>

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

export default VoucherFilter
