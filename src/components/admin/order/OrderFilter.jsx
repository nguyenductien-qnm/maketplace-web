import Box from '@mui/material/Box'
import MenuItem from '@mui/material/MenuItem'
import Popover from '@mui/material/Popover'
import Select from '@mui/material/Select'
import Slider from '@mui/material/Slider'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import Divider from '@mui/material/Divider'
import FormControlLabel from '@mui/material/FormControlLabel'
import TextField from '@mui/material/TextField'
import FilterListOutlinedIcon from '@mui/icons-material/FilterListOutlined'
import TypographyLabel from '../../common/TypographyLabel'
import { useState } from 'react'

function OrderFilter({
  filters,
  provinces,
  shops,
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
            minWidth: '600px',
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
            placeholder="Enter tracking number, buyer name or phone"
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
              <MenuItem value="newest">Created (newest)</MenuItem>
              <MenuItem value="oldest">Created (oldest)</MenuItem>
              <MenuItem value="updatedAt">Updated</MenuItem>
              <MenuItem value="highestTotalPrice">
                Highest (total price)
              </MenuItem>
              <MenuItem value="highestDiscount">
                Highest (discount value)
              </MenuItem>
              <MenuItem value="highestItems">Highest (items)</MenuItem>
              <MenuItem value="lowestPrice">Lowest (total price)</MenuItem>
            </Select>
          </Box>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Box sx={{ flex: 1 }}>
              <TypographyLabel>Order payment method</TypographyLabel>
              <Select
                size="small"
                fullWidth
                value={filters.orderPaymentMethod || ''}
                onChange={(e) =>
                  setFilters((prev) => ({
                    ...prev,
                    orderPaymentMethod: e.target.value
                  }))
                }
                displayEmpty
              >
                <MenuItem value="paypal">Paypal</MenuItem>
                <MenuItem value="cod">COD</MenuItem>
              </Select>
            </Box>
            <Box sx={{ flex: 1 }}>
              <TypographyLabel>Order payment status</TypographyLabel>
              <Select
                size="small"
                fullWidth
                value={filters.orderPaymentStatus || ''}
                onChange={(e) =>
                  setFilters((prev) => ({
                    ...prev,
                    orderPaymentStatus: e.target.value
                  }))
                }
                displayEmpty
              >
                <MenuItem value="paid">Paid</MenuItem>
                <MenuItem value="unpaid">Unpaid</MenuItem>
              </Select>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', gap: 1 }}>
            <Box sx={{ flex: 1 }}>
              <TypographyLabel>Create from</TypographyLabel>
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

          <Box sx={{ display: 'flex', gap: 1 }}>
            <Box sx={{ flex: 1 }}>
              <TypographyLabel>Shipping to province</TypographyLabel>
              <Select
                size="small"
                fullWidth
                value={filters.shippingToProvince || ''}
                onChange={(e) =>
                  setFilters((prev) => ({
                    ...prev,
                    shippingToProvince: e.target.value
                  }))
                }
                displayEmpty
              >
                {provinces?.map((province) => (
                  <MenuItem
                    key={province.ProvinceID}
                    value={province.ProvinceName}
                  >
                    {province.ProvinceName}
                  </MenuItem>
                ))}
              </Select>
            </Box>

            <Box sx={{ flex: 1 }}>
              <TypographyLabel>Order of shop</TypographyLabel>
              <Select
                size="small"
                fullWidth
                value={filters.orderOfShop || ''}
                onChange={(e) =>
                  setFilters((prev) => ({
                    ...prev,
                    orderOfShop: e.target.value
                  }))
                }
                displayEmpty
              >
                {shops?.map((shop) => (
                  <MenuItem key={shop._id} value={shop._id}>
                    {shop.shop_name}
                  </MenuItem>
                ))}
              </Select>
            </Box>
          </Box>

          <Box width="100%">
            <TypographyLabel>
              Total price range: {filters.totalPriceRange[0].toLocaleString()} -{' '}
              {filters.totalPriceRange[1].toLocaleString()} $
            </TypographyLabel>
            <Slider
              value={filters.totalPriceRange}
              onChange={(e, newValue) =>
                setFilters((prev) => ({ ...prev, totalPriceRange: newValue }))
              }
              valueLabelDisplay="auto"
              min={0}
              max={2000}
              step={50}
            />
          </Box>

          <Box>
            <FormControlLabel
              control={
                <Checkbox
                  checked={filters.isHaveDiscount || false}
                  onChange={(e) =>
                    setFilters((prev) => ({
                      ...prev,
                      isHaveDiscount: e.target.checked
                    }))
                  }
                />
              }
              label="Only orders with discounts"
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
export default OrderFilter
