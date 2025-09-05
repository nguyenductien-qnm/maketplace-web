import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Popover from '@mui/material/Popover'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import Slider from '@mui/material/Slider'
import FilterListOutlinedIcon from '@mui/icons-material/FilterListOutlined'
import TypographyLabel from '~/components/common/TypographyLabel'
import { useState } from 'react'

function TransactionFilter({
  type,
  users,
  shops,
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
            <TypographyLabel>
              {type === 'VENDOR' ? 'Shop' : 'Customer'}
            </TypographyLabel>
            <Autocomplete
              size="small"
              fullWidth
              options={type === 'VENDOR' ? shops || [] : users || []}
              getOptionLabel={(option) =>
                type === 'VENDOR'
                  ? option.shop_name || ''
                  : option.user_name || ''
              }
              value={
                type === 'VENDOR'
                  ? shops?.find((s) => s._id === filters.transactionOfShop) ||
                    null
                  : users?.find((u) => u._id === filters.transactionOfUser) ||
                    null
              }
              onChange={(_, newValue) => {
                setFilters((prev) => ({
                  ...prev,
                  ...(type === 'VENDOR'
                    ? { transactionOfShop: newValue?._id || '' }
                    : { transactionOfUser: newValue?._id || '' })
                }))
              }}
              isOptionEqualToValue={(option, value) => option._id === value._id}
              renderInput={(params) => (
                <TextField {...params} placeholder="Search by name..." />
              )}
            />
          </Box>

          <Box sx={{ flex: 1 }}>
            <TypographyLabel>Sort by</TypographyLabel>
            <Select
              size="small"
              fullWidth
              value={filters.sortBy || ''}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  sortBy: e.target.value
                }))
              }
              displayEmpty
            >
              <MenuItem value="createdAt_desc">Created (Newest)</MenuItem>
              <MenuItem value="createdAt_asc">Created (Oldest)</MenuItem>
              <MenuItem value="processedAt_desc">Processed (Newest)</MenuItem>
              <MenuItem value="processedAt_asc">Processed (Oldest)</MenuItem>
              <MenuItem value="amount_desc">Amount (High → Low)</MenuItem>
              <MenuItem value="amount_asc">Amount (Low → High)</MenuItem>
            </Select>
          </Box>

          <Box>
            <TypographyLabel>Status</TypographyLabel>
            <Select
              size="small"
              fullWidth
              value={filters.status || ''}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, status: e.target.value }))
              }
              displayEmpty
            >
              <MenuItem value="ALL">All</MenuItem>
              <MenuItem value="PENDING">Pending</MenuItem>
              <MenuItem value="COMPLETED">Completed</MenuItem>
              <MenuItem value="FAILED">Failed</MenuItem>
            </Select>
          </Box>

          <Box>
            <TypographyLabel>Type of trans</TypographyLabel>
            <Select
              size="small"
              fullWidth
              value={filters.typeOfTrans || ''}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, typeOfTrans: e.target.value }))
              }
              displayEmpty
            >
              <MenuItem value="WITHDRAWAL">Withdrawal</MenuItem>
              <MenuItem value="ORDER_INCOME">Order income</MenuItem>
              <MenuItem value="PAYMENT">Payment</MenuItem>
              <MenuItem value="REFUND">Refund</MenuItem>
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

          <Box width="100%">
            <TypographyLabel>
              Amount range: {filters.amountRange[0].toLocaleString()} -{' '}
              {filters.amountRange[1].toLocaleString()} $
            </TypographyLabel>
            <Slider
              value={filters.amountRange}
              onChange={(e, newValue) =>
                setFilters((prev) => ({ ...prev, amountRange: newValue }))
              }
              valueLabelDisplay="auto"
              min={50}
              max={500}
              step={20}
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
export default TransactionFilter
