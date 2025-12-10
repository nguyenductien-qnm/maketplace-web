import Box from '@mui/material/Box'
import Select from '@mui/material/Select'
import Button from '@mui/material/Button'
import Popover from '@mui/material/Popover'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import FilterListOutlinedIcon from '@mui/icons-material/FilterListOutlined'
import TypographyLabel from '~/components/common/TypographyLabel'
import TypographyTitle from '~/components/common/TypographyTitle'
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
                placeholder="Enter voucher name or code"
                value={filters.search}
                onChange={(e) =>
                  setFilters((prev) => ({ ...prev, search: e.target.value }))
                }
              />
            </Box>

            <Box>
              <TypographyLabel>Voucher Type</TypographyLabel>
              <Select
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

            <Box>
              <TypographyLabel>Voucher Apply</TypographyLabel>
              <Select
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

            <Box>
              <TypographyLabel>Voucher Visibility</TypographyLabel>
              <Select
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
              </Select>
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

export default VoucherFilter
