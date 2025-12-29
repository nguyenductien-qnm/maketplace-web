import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Collapse from '@mui/material/Collapse'
import Grid2 from '@mui/material/Grid2'
import MenuItem from '@mui/material/MenuItem'
import Chip from '@mui/material/Chip'
import Typography from '@mui/material/Typography'
import InputAdornment from '@mui/material/InputAdornment'
import Paper from '@mui/material/Paper'
import Autocomplete from '@mui/material/Autocomplete'
import SearchIcon from '@mui/icons-material/Search'
import TuneIcon from '@mui/icons-material/Tune'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import CloseIcon from '@mui/icons-material/Close'
import IGNORE_KEY from '~/constant/ignoreKey.const'
import getActiveFilters from '~/utils/getActiveFilters'
import { useState } from 'react'
import {
  FILTER_VALUE_MAP,
  FILTER_LABEL_MAP
} from '../constants/voucher.filter.constant'

function VoucherFilter({ ui, data, handler }) {
  const [advancedOpen, setAdvancedOpen] = useState(false)
  const { isFetching } = ui
  const { tempFilters, shops, staffs, params } = data
  const {
    handleApplyFilter,
    handleClearAllFilter,
    handleRemoveParam,
    handleFilterChange,
    handleClearTempFilters
  } = handler

  const activeFiltersCount = getActiveFilters(params)

  const creatorRole = tempFilters?.creator_role

  const resolveCreatorDisplay = ({ key, value }) => {
    if (key !== 'creator_selected') return null

    if (params?.creator_role === 'shop') {
      return shops.find((s) => s._id === value)?.shop_name ?? value
    }

    if (params?.creator_role === 'admin') {
      return staffs.find((u) => u._id === value)?.user_name ?? value
    }

    return value
  }

  return (
    <Box>
      <Paper variant="outlined" sx={{ p: 2, mb: 2 }}>
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
          <TextField
            fullWidth
            placeholder="Search by voucher code or name..."
            value={tempFilters.search || ''}
            onChange={(e) => handleFilterChange('search', e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
              endAdornment: tempFilters.search && (
                <InputAdornment position="end">
                  <IconButton
                    size="small"
                    onClick={() => handleFilterChange('search', '')}
                  >
                    <CloseIcon fontSize="small" />
                  </IconButton>
                </InputAdornment>
              )
            }}
            sx={{ height: 56 }}
          />

          <Button
            variant={advancedOpen ? 'contained' : 'outlined'}
            startIcon={<TuneIcon />}
            endIcon={advancedOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            onClick={() => setAdvancedOpen(!advancedOpen)}
            sx={{
              minWidth: 'fit-content',
              whiteSpace: 'nowrap',
              height: 56
            }}
          >
            Advanced Filters
            {activeFiltersCount > 0 && !advancedOpen && (
              <Chip
                label={activeFiltersCount}
                size="small"
                color="primary"
                sx={{ ml: 1, height: 20, fontSize: '0.75rem' }}
              />
            )}
          </Button>

          <Button
            disabled={isFetching}
            onClick={handleApplyFilter}
            variant="contained"
            sx={{ minWidth: 120, height: 56 }}
          >
            Search
          </Button>
        </Box>
      </Paper>

      <Collapse in={advancedOpen}>
        <Paper variant="outlined" sx={{ p: 3, mb: 2 }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 3
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <TuneIcon />
              <Typography variant="h6">Advanced Filters</Typography>
            </Box>
            <Typography
              variant="caption"
              sx={{ bgcolor: 'grey.100', px: 1.5, py: 0.5, borderRadius: 1 }}
            >
              Filter more precisely
            </Typography>
          </Box>

          <Grid2 container spacing={2} rowSpacing={4} sx={{ mb: 3 }}>
            <Grid2 size={3}>
              <TextField
                select
                fullWidth
                label="Sort By"
                value={tempFilters.sort_by || ''}
                onChange={(e) => handleFilterChange('sort_by', e.target.value)}
              >
                <MenuItem value="newest">Created (Newest)</MenuItem>
                <MenuItem value="oldest">Created (Oldest)</MenuItem>
                <MenuItem value="name_asc">Name (A-Z)</MenuItem>
                <MenuItem value="name_desc">Name (Z-A)</MenuItem>

                <MenuItem value="ending_soon">Ending Soon</MenuItem>
                <MenuItem value="starting_soon">Starting Soon</MenuItem>

                <MenuItem value="most_used">Most Used</MenuItem>
                <MenuItem value="least_used">Least Used</MenuItem>

                <MenuItem value="most_reserved">Most Reserved</MenuItem>
                <MenuItem value="least_reserved">Least Reserved</MenuItem>

                <MenuItem value="most_available">Most Available</MenuItem>
                <MenuItem value="least_available">Least Available</MenuItem>

                <MenuItem value="discount_high">Discount (High → Low)</MenuItem>
                <MenuItem value="discount_low">Discount (Low → High)</MenuItem>
              </TextField>
            </Grid2>

            <Grid2 size={3}>
              <TextField
                select
                fullWidth
                label="Apply To"
                value={tempFilters.apply_to || ''}
                onChange={(e) => handleFilterChange('apply_to', e.target.value)}
              >
                <MenuItem value="">All</MenuItem>
                <MenuItem value="all">All Products</MenuItem>
                <MenuItem value="specific">Specific Products</MenuItem>
              </TextField>
            </Grid2>

            <Grid2 size={3}>
              <TextField
                select
                fullWidth
                label="Visibility"
                value={tempFilters.visibility || ''}
                onChange={(e) =>
                  handleFilterChange('visibility', e.target.value)
                }
              >
                <MenuItem value="">All</MenuItem>
                <MenuItem value="public">Public</MenuItem>
                <MenuItem value="private">Private</MenuItem>
              </TextField>
            </Grid2>

            <Grid2 size={3}>
              <TextField
                select
                fullWidth
                label="Voucher Type"
                value={tempFilters.type || ''}
                onChange={(e) => handleFilterChange('type', e.target.value)}
              >
                <MenuItem value="">All</MenuItem>
                <MenuItem value="fixed_amount">Fixed</MenuItem>
                <MenuItem value="percent">Percent</MenuItem>
              </TextField>
            </Grid2>

            <Grid2 size={3}>
              <TextField
                fullWidth
                label="Created From"
                type="date"
                value={tempFilters.created_from || ''}
                onChange={(e) =>
                  handleFilterChange('created_from', e.target.value)
                }
                InputLabelProps={{ shrink: true }}
              />
            </Grid2>

            <Grid2 size={3}>
              <TextField
                fullWidth
                label="Created To"
                type="date"
                value={tempFilters.created_to || ''}
                onChange={(e) =>
                  handleFilterChange('created_to', e.target.value)
                }
                InputLabelProps={{ shrink: true }}
              />
            </Grid2>

            <Grid2 size={3}>
              <TextField
                fullWidth
                label="Active From"
                type="date"
                value={tempFilters.active_from || ''}
                onChange={(e) =>
                  handleFilterChange('active_from', e.target.value)
                }
                InputLabelProps={{ shrink: true }}
              />
            </Grid2>

            <Grid2 size={3}>
              <TextField
                fullWidth
                label="Active To"
                type="date"
                value={tempFilters.active_to || ''}
                onChange={(e) =>
                  handleFilterChange('active_to', e.target.value)
                }
                InputLabelProps={{ shrink: true }}
              />
            </Grid2>

            <Grid2 size={3}>
              <TextField
                select
                fullWidth
                label="Creator Role"
                value={tempFilters.creator_role || ''}
                onChange={(e) => {
                  handleFilterChange('creator_role', e.target.value)
                  handleFilterChange('creator_selected', null)
                }}
              >
                <MenuItem value="">All</MenuItem>
                <MenuItem value="admin">Admin</MenuItem>
                <MenuItem value="shop">Shop</MenuItem>
              </TextField>
            </Grid2>

            {creatorRole && creatorRole != '' && (
              <Grid2 size={6}>
                <Box>
                  <Autocomplete
                    fullWidth
                    options={
                      creatorRole === 'shop'
                        ? shops || []
                        : creatorRole === 'admin'
                        ? staffs || []
                        : []
                    }
                    getOptionLabel={(option) =>
                      creatorRole === 'shop'
                        ? option.shop_name || ''
                        : creatorRole === 'admin'
                        ? option.user_name || ''
                        : ''
                    }
                    value={
                      creatorRole === 'shop'
                        ? shops?.find(
                            (s) => s._id === tempFilters.creator_selected
                          ) || null
                        : creatorRole === 'admin'
                        ? staffs?.find(
                            (u) => u._id === tempFilters.creator_selected
                          ) || null
                        : null
                    }
                    onChange={(_, newValue) => {
                      handleFilterChange('creator_selected', newValue?._id)
                    }}
                    isOptionEqualToValue={(option, value) =>
                      option?._id === value?._id
                    }
                    renderInput={(params) => (
                      <TextField {...params} placeholder="Search by name..." />
                    )}
                  />
                </Box>
              </Grid2>
            )}
          </Grid2>

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              pt: 2,
              borderTop: 1,
              borderColor: 'divider'
            }}
          >
            <Button
              startIcon={<CloseIcon />}
              onClick={handleClearTempFilters}
              sx={{ color: 'text.secondary' }}
            >
              Clear all filters
            </Button>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button variant="outlined" onClick={() => setAdvancedOpen(false)}>
                Cancel
              </Button>
              <Button
                variant="contained"
                onClick={handleApplyFilter}
                disabled={isFetching}
              >
                Apply Filters
              </Button>
            </Box>
          </Box>
        </Paper>
      </Collapse>

      {activeFiltersCount > 0 && (
        <Card sx={{ p: 2, mb: 2, bgcolor: 'primary.50' }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              flexWrap: 'wrap'
            }}
          >
            <Typography variant="body2" fontWeight={500}>
              Active filters:
            </Typography>

            {Object.entries(params).map(([key, value]) => {
              if (!value || IGNORE_KEY.includes(key)) return null

              const label = FILTER_LABEL_MAP[key] ?? key

              const displayValue =
                key === 'creator_selected'
                  ? resolveCreatorDisplay({ key, value, params, shops, staffs })
                  : FILTER_VALUE_MAP[key]?.[value] ?? value

              return (
                <Chip
                  key={key}
                  label={`${label}: ${displayValue}`}
                  onDelete={
                    key === 'sort_by' ? undefined : () => handleRemoveParam(key)
                  }
                  size="small"
                />
              )
            })}

            <Button
              size="small"
              onClick={handleClearAllFilter}
              sx={{ ml: 'auto' }}
            >
              Clear all
            </Button>
          </Box>
        </Card>
      )}
    </Box>
  )
}

export default VoucherFilter
