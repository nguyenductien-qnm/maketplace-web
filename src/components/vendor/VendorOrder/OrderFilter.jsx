import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import { useState } from 'react'

function OrderFilter({ handleFilterOrder }) {
  const [searchValue, setSearchValue] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')

  const handleSearch = () => {
    const payloads = {
      search: searchValue,
      startDate,
      endDate
    }
    handleFilterOrder(payloads)
  }

  return (
    <Box sx={{ height: '40px', display: 'flex', gap: '7px', mb: '10px' }}>
      <TextField
        placeholder="Search by customer name, phone number"
        hiddenLabel
        size="small"
        sx={{ height: '100%', width: '70%' }}
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />

      <TextField
        sx={{ height: '100%', width: '20%' }}
        type="date"
        size="small"
        fullWidth
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
        label="Start date"
        InputLabelProps={{ shrink: true }}
      />

      <TextField
        sx={{ height: '100%', width: '20%' }}
        type="date"
        size="small"
        fullWidth
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
        label="End date"
        InputLabelProps={{ shrink: true }}
      />

      <Button
        onClick={handleSearch}
        variant="contained"
        sx={{ height: '100%', width: '10%' }}
      >
        Search
      </Button>
    </Box>
  )
}

export default OrderFilter
