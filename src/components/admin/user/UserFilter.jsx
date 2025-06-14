import Box from '@mui/material/Box'
import MenuItem from '@mui/material/MenuItem'
import Popover from '@mui/material/Popover'
import Select from '@mui/material/Select'
import FilterListOutlinedIcon from '@mui/icons-material/FilterListOutlined'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import Divider from '@mui/material/Divider'
import FormControlLabel from '@mui/material/FormControlLabel'
import TextField from '@mui/material/TextField'
import { useState } from 'react'
import TypographyLabel from '../../common/TypographyLabel'

function UserFilter({
  status,
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
          <TextField
            fullWidth
            placeholder="Enter user name, phone, email"
            size="small"
            value={filters.search}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, search: e.target.value }))
            }
          />

          <Box>
            <TypographyLabel>Gender</TypographyLabel>
            <Select
              size="small"
              fullWidth
              value={filters.gender || ''}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  gender: e.target.value
                }))
              }
              displayEmpty
            >
              <MenuItem value="male">Male</MenuItem>

              <MenuItem value="female">Female</MenuItem>
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

          <Box>
            <FormControlLabel
              control={
                <Checkbox
                  checked={filters.isShop}
                  onChange={(e) =>
                    setFilters((prev) => ({
                      ...prev,
                      isShop: e.target.checked
                    }))
                  }
                />
              }
              label="Only show users with a shop"
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
export default UserFilter
