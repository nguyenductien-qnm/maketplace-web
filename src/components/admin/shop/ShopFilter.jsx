import Box from '@mui/material/Box'
import MenuItem from '@mui/material/MenuItem'
import Popover from '@mui/material/Popover'
import Select from '@mui/material/Select'
import Slider from '@mui/material/Slider'
import { useEffect, useState } from 'react'
import FilterListOutlinedIcon from '@mui/icons-material/FilterListOutlined'
import { Button, Divider, TextField } from '@mui/material'
import { apiGetProvinces } from '~/helpers/getAddress'
import TypographyLabel from '../../common/TypographyLabel'

function ShopFilter({ filters, handleFilter, handleClearFilter }) {
  const [anchorEl, setAnchorEl] = useState(null)
  const [provinces, setProvinces] = useState([])

  const handleOpenFilter = (event) => setAnchorEl(event.currentTarget)
  const handleCloseFilter = () => setAnchorEl(null)
  const [localFilters, setLocalFilters] = useState(filters)
  const open = Boolean(anchorEl)

  useEffect(() => {
    const fetchProvinces = async () => {
      const res = await apiGetProvinces()
      setProvinces(res)
    }
    fetchProvinces()
  }, [])

  useEffect(() => {
    const handler = setTimeout(() => {
      handleFilter(localFilters)
    }, 500)

    return () => clearTimeout(handler)
  }, [localFilters])

  useEffect(() => {
    setLocalFilters(filters)
  }, [filters])

  const handleSearchChange = (e) => {
    setLocalFilters((prev) => ({ ...prev, search: e.target.value }))
  }

  const handleProductCountChange = (newValue) => {
    setLocalFilters((prev) => ({ ...prev, productCountRange: newValue }))
  }

  const handleFollowerCountChange = (newValue) => {
    setLocalFilters((prev) => ({ ...prev, followerCountRange: newValue }))
  }

  const handleRatingChange = (newValue) => {
    setLocalFilters((prev) => ({ ...prev, ratingRange: newValue }))
  }

  const handleProvinceChange = (e) => {
    setLocalFilters((prev) => ({ ...prev, province: e.target.value }))
  }

  const handleSearch = () => {
    const data = { ...localFilters }
    handleFilter(data)
  }

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
            placeholder="Enter shop name, phone, email"
            size="small"
            value={localFilters.search}
            onChange={(e) => handleSearchChange(e)}
          />
          <Box>
            <TypographyLabel>Shop province</TypographyLabel>
            <Select
              size="small"
              fullWidth
              value={localFilters.province || ''}
              onChange={(e) => handleProvinceChange(e)}
              displayEmpty
            >
              {provinces?.map((province) => (
                <MenuItem key={province.ProvinceID} value={province.ProvinceID}>
                  {province.ProvinceName}
                </MenuItem>
              ))}
            </Select>
          </Box>

          <Box width="100%">
            <TypographyLabel>
              Product count range:{' '}
              {localFilters.productCountRange[0].toLocaleString()} -{' '}
              {localFilters.productCountRange[1].toLocaleString()} $
            </TypographyLabel>
            <Slider
              value={localFilters.productCountRange}
              onChange={(e, newValue) => handleProductCountChange(newValue)}
              valueLabelDisplay="auto"
              min={0}
              max={500}
              step={10}
            />
          </Box>

          <Box width="100%">
            <TypographyLabel>
              Follower count range:{' '}
              {localFilters.followerCountRange[0].toLocaleString()} -{' '}
              {localFilters.followerCountRange[1].toLocaleString()} $
            </TypographyLabel>
            <Slider
              value={localFilters.followerCountRange}
              onChange={(e, newValue) => handleFollowerCountChange(newValue)}
              valueLabelDisplay="auto"
              min={0}
              max={1000}
              step={10}
            />
          </Box>

          <Box width="100%">
            <TypographyLabel>
              Rating range: {localFilters.ratingRange[0].toLocaleString()} -{' '}
              {localFilters.ratingRange[1].toLocaleString()} $
            </TypographyLabel>
            <Slider
              value={localFilters.ratingRange}
              onChange={(e, newValue) => handleRatingChange(newValue)}
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
                handleSearch()
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
