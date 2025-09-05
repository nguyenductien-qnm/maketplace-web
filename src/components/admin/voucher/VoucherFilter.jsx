import Autocomplete from '@mui/material/Autocomplete'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import MenuItem from '@mui/material/MenuItem'
import Popover from '@mui/material/Popover'
import Select from '@mui/material/Select'
import Slider from '@mui/material/Slider'
import FilterListOutlinedIcon from '@mui/icons-material/FilterListOutlined'
import TypographyLabel from '../../common/TypographyLabel'
import { useState } from 'react'

function VoucherFilter({
  shops,
  staffs,
  filters,
  setFilters,
  handleFilter,
  handleClearFilter
}) {
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)

  const handleOpenFilter = (event) => setAnchorEl(event.currentTarget)
  const handleCloseFilter = () => setAnchorEl(null)

  const MAX_DISCOUNT_VALUE_RANGE = {
    percent: {
      shop: 100,
      admin: 100
    },
    fixed_amount: {
      shop: 100,
      admin: 200
    }
  }

  const createdBy = filters?.createdBy

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
            minWidth: '800px',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px'
          }}
        >
          <h3 style={{ marginBottom: 0 }}>Advanced filters</h3>
          <Divider />
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Box sx={{ flex: 1 }}>
              <TypographyLabel>Search</TypographyLabel>
              <TextField
                fullWidth
                placeholder="Enter voucher code, name"
                size="small"
                value={filters.search}
                onChange={(e) =>
                  setFilters((prev) => ({ ...prev, search: e.target.value }))
                }
              />
            </Box>
            <Box sx={{ flex: 1 }}>
              <TypographyLabel>Applies</TypographyLabel>
              <Select
                size="small"
                fullWidth
                value={filters.applies || ''}
                onChange={(e) =>
                  setFilters((prev) => ({ ...prev, applies: e.target.value }))
                }
                displayEmpty
              >
                <MenuItem value="all">All</MenuItem>
                <MenuItem value="specific">Specific</MenuItem>
              </Select>
            </Box>

            <Box sx={{ flex: 1 }}>
              <TypographyLabel>Type</TypographyLabel>
              <Select
                size="small"
                fullWidth
                value={filters.type || ''}
                onChange={(e) =>
                  setFilters((prev) => ({ ...prev, type: e.target.value }))
                }
                displayEmpty
              >
                <MenuItem value="all">All</MenuItem>
                <MenuItem value="percent">Percent</MenuItem>
                <MenuItem value="fixed_amount">Fixed amount</MenuItem>
              </Select>
            </Box>
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

            <Box sx={{ flex: 1 }}>
              <TypographyLabel>Start date</TypographyLabel>
              <TextField
                onChange={(e) =>
                  setFilters((prev) => ({
                    ...prev,
                    startDate: e.target.value
                  }))
                }
                value={filters.startDate}
                size="small"
                type="date"
                fullWidth
              />
            </Box>
            <Box sx={{ flex: 1 }}>
              <TypographyLabel>End date</TypographyLabel>
              <TextField
                onChange={(e) =>
                  setFilters((prev) => ({
                    ...prev,
                    endDate: e.target.value
                  }))
                }
                value={filters.endDate}
                size="small"
                type="date"
                fullWidth
              />
            </Box>
          </Box>

          <Box sx={{ display: 'flex', gap: 1 }}>
            <Box sx={{ flex: 1 }}>
              <TypographyLabel>Created by</TypographyLabel>
              <Select
                size="small"
                fullWidth
                value={filters.createdBy || ''}
                onChange={(e) =>
                  setFilters((prev) => ({
                    ...prev,
                    createdBy: e.target.value,
                    creatorSelect: ''
                  }))
                }
                displayEmpty
              >
                <MenuItem value="all">All</MenuItem>
                <MenuItem value="admin">Admin</MenuItem>
                <MenuItem value="shop">Shop</MenuItem>
              </Select>
            </Box>

            {createdBy !== 'all' && (
              <Box sx={{ flex: 1 }}>
                <TypographyLabel>Creator select</TypographyLabel>
                <Autocomplete
                  size="small"
                  fullWidth
                  options={
                    createdBy === 'shop'
                      ? shops || []
                      : createdBy === 'admin'
                      ? staffs || []
                      : []
                  }
                  getOptionLabel={(option) =>
                    createdBy === 'shop'
                      ? option.shop_name || ''
                      : createdBy === 'admin'
                      ? option.user_name || ''
                      : ''
                  }
                  value={
                    createdBy === 'shop'
                      ? shops?.find((s) => s._id === filters.creatorSelect) ||
                        null
                      : createdBy === 'admin'
                      ? staffs?.find((u) => u._id === filters.creatorSelect) ||
                        null
                      : null
                  }
                  onChange={(_, newValue) => {
                    setFilters((prev) => ({
                      ...prev,
                      creatorSelect: newValue?._id || ''
                    }))
                  }}
                  isOptionEqualToValue={(option, value) =>
                    option?._id === value?._id
                  }
                  renderInput={(params) => (
                    <TextField {...params} placeholder="Search by name..." />
                  )}
                />
              </Box>
            )}
          </Box>
          <Box sx={{ display: 'flex', gap: 5 }}>
            <Box sx={{ flex: 1 }}>
              <TypographyLabel>
                Reserved range: {filters.reservedRange[0].toLocaleString()} -{' '}
                {filters.reservedRange[1].toLocaleString()} $
              </TypographyLabel>
              <Slider
                value={filters.reservedRange}
                onChange={(e, newValue) =>
                  setFilters((prev) => ({ ...prev, reservedRange: newValue }))
                }
                valueLabelDisplay="auto"
                min={0}
                max={500}
                step={10}
              />
            </Box>
            <Box sx={{ flex: 1 }}>
              <TypographyLabel>
                Quantity range: {filters.quantityRange[0].toLocaleString()} -{' '}
                {filters.quantityRange[1].toLocaleString()} $
              </TypographyLabel>
              <Slider
                value={filters.quantityRange}
                onChange={(e, newValue) =>
                  setFilters((prev) => ({
                    ...prev,
                    quantityRange: newValue
                  }))
                }
                valueLabelDisplay="auto"
                min={0}
                max={500}
                step={10}
              />
            </Box>
            <Box sx={{ flex: 1 }}>
              <TypographyLabel>
                Discount value range:{' '}
                {filters.discountValueRange[0].toLocaleString()} -{' '}
                {filters.discountValueRange[1].toLocaleString()}{' '}
                {filters?.type === 'percent' ? '%' : '$'}
              </TypographyLabel>
              <Slider
                value={filters.discountValueRange}
                onChange={(e, newValue) =>
                  setFilters((prev) => ({
                    ...prev,
                    discountValueRange: newValue
                  }))
                }
                valueLabelDisplay="auto"
                min={0}
                max={
                  MAX_DISCOUNT_VALUE_RANGE[filters.type]?.[filters.createdBy]
                }
                step={5}
              />
            </Box>
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
export default VoucherFilter
