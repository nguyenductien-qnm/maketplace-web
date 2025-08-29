import Box from '@mui/material/Box'
import MenuItem from '@mui/material/MenuItem'
import Popover from '@mui/material/Popover'
import Select from '@mui/material/Select'
import Slider from '@mui/material/Slider'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import TextField from '@mui/material/TextField'
import TypographyLabel from '../../common/TypographyLabel'
import FilterListOutlinedIcon from '@mui/icons-material/FilterListOutlined'
import { useState } from 'react'

function ShopFilter({
  status,
  filters,
  provinces,
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
            minWidth: '400px',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px'
          }}
        >
          <h3 style={{ marginBottom: 0 }}>Advanced filters</h3>
          <Divider />
          <TextField
            fullWidth
            placeholder="Enter shop name, phone, email"
            size="small"
            value={filters.search}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, search: e.target.value }))
            }
          />

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
              <MenuItem value="updatedAt_desc">Updated (Newest)</MenuItem>
              <MenuItem value="updatedAt_asc">Updated (Oldest)</MenuItem>
              <MenuItem value="name_asc">Name (A → Z)</MenuItem>
              <MenuItem value="name_desc">Name (Z → A)</MenuItem>

              <MenuItem value="productCount_desc">
                Number of Products (High → Low)
              </MenuItem>
              <MenuItem value="productCount_asc">
                Number of Products (Low → High)
              </MenuItem>
              <MenuItem value="orderCount_desc">
                Order Count (High → Low)
              </MenuItem>
              <MenuItem value="orderCount_asc">
                Order Count (Low → High)
              </MenuItem>
              <MenuItem value="revenue_desc">Revenue (High → Low)</MenuItem>
              <MenuItem value="revenue_asc">Revenue (Low → High)</MenuItem>

              <MenuItem value="rating_desc">
                Average Rating (High → Low)
              </MenuItem>
              <MenuItem value="rating_asc">
                Average Rating (Low → High)
              </MenuItem>
              <MenuItem value="cancelRate_asc">
                Cancellation Rate (Low → High)
              </MenuItem>
              <MenuItem value="cancelRate_desc">
                Cancellation Rate (High → Low)
              </MenuItem>
              <MenuItem value="deliveryRate_desc">
                Successful Delivery Rate (High → Low)
              </MenuItem>
              <MenuItem value="deliveryRate_asc">
                Successful Delivery Rate (Low → High)
              </MenuItem>

              <MenuItem value="complaints_desc">
                Customer Complaints (High → Low)
              </MenuItem>
              <MenuItem value="complaints_asc">
                Customer Complaints (Low → High)
              </MenuItem>
            </Select>
          </Box>

          <Box>
            <TypographyLabel>Shop province</TypographyLabel>
            <Select
              size="small"
              fullWidth
              value={filters.province || ''}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, province: e.target.value }))
              }
              displayEmpty
            >
              {provinces?.map((province) => (
                <MenuItem key={province.ProvinceID} value={province.ProvinceID}>
                  {province.ProvinceName}
                </MenuItem>
              ))}
            </Select>
          </Box>

          {status != 'NEW_REGISTRATION' && (
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
          )}

          <Box width="100%">
            <TypographyLabel>
              Product count range:{' '}
              {filters.productCountRange[0].toLocaleString()} -{' '}
              {filters.productCountRange[1].toLocaleString()} $
            </TypographyLabel>
            <Slider
              value={filters.productCountRange}
              onChange={(e, newValue) =>
                setFilters((prev) => ({ ...prev, productCountRange: newValue }))
              }
              valueLabelDisplay="auto"
              min={0}
              max={500}
              step={10}
            />
          </Box>

          <Box width="100%">
            <TypographyLabel>
              Follower count range:{' '}
              {filters.followerCountRange[0].toLocaleString()} -{' '}
              {filters.followerCountRange[1].toLocaleString()} $
            </TypographyLabel>
            <Slider
              value={filters.followerCountRange}
              onChange={(e, newValue) =>
                setFilters((prev) => ({
                  ...prev,
                  followerCountRange: newValue
                }))
              }
              valueLabelDisplay="auto"
              min={0}
              max={1000}
              step={10}
            />
          </Box>

          <Box width="100%">
            <TypographyLabel>
              Rating range: {filters.ratingRange[0].toLocaleString()} -{' '}
              {filters.ratingRange[1].toLocaleString()} $
            </TypographyLabel>
            <Slider
              value={filters.ratingRange}
              onChange={(e, newValue) =>
                setFilters((prev) => ({ ...prev, ratingRange: newValue }))
              }
              valueLabelDisplay="auto"
              min={0}
              max={5}
              step={0.1}
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
export default ShopFilter
