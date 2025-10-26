import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import MenuItem from '@mui/material/MenuItem'
import Popover from '@mui/material/Popover'
import Select from '@mui/material/Select'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import FilterListOutlinedIcon from '@mui/icons-material/FilterListOutlined'
import { useState } from 'react'

function VoucherFilter({ handleFilterVoucher }) {
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
        <Box p={2} width={300}>
          <h4>Advanced filters</h4>

          <FormControl size="small" fullWidth sx={{ mt: 2 }}>
            <InputLabel id="voucher-type-label">Voucher type</InputLabel>
            <Select
              labelId="voucher-type-label"
              // value={voucherType}
              // onChange={(e) => setVoucherType(e.target.value)}
              label="Voucher type"
            >
              <MenuItem value="percent">Percent</MenuItem>
              <MenuItem value="fixed_amount">Fixed amount</MenuItem>
            </Select>
          </FormControl>

          <FormControl size="small" fullWidth sx={{ mt: 2 }}>
            <InputLabel id="voucher-applies-label">Voucher applies</InputLabel>
            <Select
              labelId="voucher-applies-label"
              // value={voucherApplies}
              // onChange={(e) => setVoucherApplies(e.target.value)}
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
            // value={startDate}
            // onChange={(e) => setStartDate(e.target.value)}
            sx={{ mt: 2 }}
            label="Start date"
            InputLabelProps={{ shrink: true }}
          />

          <TextField
            type="date"
            size="small"
            fullWidth
            // value={endDate}
            // onChange={(e) => setEndDate(e.target.value)}
            sx={{ mt: 2 }}
            label="End date"
            InputLabelProps={{ shrink: true }}
          />

          <Box mt={2} display="flex" justifyContent="flex-end">
            <Button
              // onClick={handleClearFilter}
              variant="contained"
              sx={{ ml: 2, backgroundColor: 'black' }}
            >
              Clear
            </Button>
          </Box>
        </Box>
      </Popover>
    </Box>
  )
}

export default VoucherFilter
