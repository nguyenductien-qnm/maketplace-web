import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import MenuItem from '@mui/material/MenuItem'
import Popover from '@mui/material/Popover'
import Select from '@mui/material/Select'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import FilterListIcon from '@mui/icons-material/FilterList'
import { useState } from 'react'

function VoucherFilter({ handleFilterVoucher }) {
  const [searchValue, setSearchValue] = useState('')
  const [voucherType, setVoucherType] = useState('')
  const [voucherApplies, setVoucherApplies] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [anchorEl, setAnchorEl] = useState(null)

  const handleOpenFilter = (event) => setAnchorEl(event.currentTarget)
  const handleCloseFilter = () => setAnchorEl(null)
  const open = Boolean(anchorEl)

  const handleSearch = () => {
    const payloads = {
      search: searchValue,
      voucher_type: voucherType,
      voucher_applies: voucherApplies,
      start_date: startDate,
      end_date: endDate
    }
    handleFilterVoucher(payloads)
    handleCloseFilter()
  }

  const handleClearFilter = () => {
    setVoucherType('')
    setVoucherApplies('')
    setStartDate('')
    setEndDate('')
  }

  return (
    <Box sx={{ display: 'flex', gap: '10px' }}>
      <TextField
        placeholder="Search by customer name, phone number, or order ID"
        hiddenLabel
        size="small"
        sx={{ height: '100%', width: '90%' }}
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />

      <Button
        onClick={handleSearch}
        variant="contained"
        sx={{ height: '100%', width: '5%' }}
      >
        Search
      </Button>

      <Box>
        <IconButton
          onClick={handleOpenFilter}
          color="primary"
          sx={{ width: '5%' }}
        >
          <FilterListIcon />
        </IconButton>

        <Popover
          open={open}
          anchorEl={anchorEl}
          onClose={handleCloseFilter}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <Box p={2} width={300}>
            <h4>Advanced filters</h4>

            <FormControl size="small" fullWidth sx={{ mt: 2 }}>
              <InputLabel id="voucher-type-label">Voucher type</InputLabel>
              <Select
                labelId="voucher-type-label"
                value={voucherType}
                onChange={(e) => setVoucherType(e.target.value)}
                label="Voucher type"
              >
                <MenuItem value="percent">Percent</MenuItem>
                <MenuItem value="fixed_amount">Fixed amount</MenuItem>
              </Select>
            </FormControl>

            <FormControl size="small" fullWidth sx={{ mt: 2 }}>
              <InputLabel id="voucher-applies-label">
                Voucher applies
              </InputLabel>
              <Select
                labelId="voucher-applies-label"
                value={voucherApplies}
                onChange={(e) => setVoucherApplies(e.target.value)}
                label="Voucher type"
              >
                <MenuItem value="all">All</MenuItem>
                <MenuItem value="specific">Specific</MenuItem>
              </Select>
            </FormControl>

            <TextField
              type="date"
              size="small"
              fullWidth
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              sx={{ mt: 2 }}
              label="Start date"
              InputLabelProps={{ shrink: true }}
            />

            <TextField
              type="date"
              size="small"
              fullWidth
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              sx={{ mt: 2 }}
              label="End date"
              InputLabelProps={{ shrink: true }}
            />

            <Box mt={2} display="flex" justifyContent="flex-end">
              <Button
                onClick={handleClearFilter}
                variant="contained"
                sx={{ ml: 2, backgroundColor: 'black' }}
              >
                Clear
              </Button>
            </Box>
          </Box>
        </Popover>
      </Box>
    </Box>
  )
}

export default VoucherFilter
