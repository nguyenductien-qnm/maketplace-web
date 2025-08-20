import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Popover from '@mui/material/Popover'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import TypographyLabel from '~/components/common/TypographyLabel'
import FilterListOutlinedIcon from '@mui/icons-material/FilterListOutlined'
import { useState } from 'react'
import { NumericFormat } from 'react-number-format'

function WalletFilter({
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
                  ? shops?.find((s) => s._id === filters.walletOfShop) || null
                  : users?.find((u) => u._id === filters.walletOfUser) || null
              }
              onChange={(_, newValue) => {
                setFilters((prev) => ({
                  ...prev,
                  ...(type === 'VENDOR'
                    ? { walletOfShop: newValue?._id || '' }
                    : { walletOfUser: newValue?._id || '' })
                }))
              }}
              isOptionEqualToValue={(option, value) => option._id === value._id}
              renderInput={(params) => (
                <TextField {...params} placeholder="Search by name..." />
              )}
            />
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
            <TypographyLabel>Min balance</TypographyLabel>

            <NumericFormat
              value={filters.minBalance}
              onValueChange={(values) => {
                setFilters((prev) => ({
                  ...prev,
                  minBalance: values.value || ''
                }))
              }}
              size="small"
              allowNegative={false}
              prefix="$"
              decimalScale={2}
              fixedDecimalScale
              thousandSeparator
              customInput={TextField}
              fullWidth
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
export default WalletFilter
