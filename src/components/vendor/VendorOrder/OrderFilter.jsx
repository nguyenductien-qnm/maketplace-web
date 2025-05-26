import { Box, Button, TextField } from '@mui/material'
import { useState } from 'react'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers'

function OrderFilter({ handleFilterOrder }) {
  const [searchValue, setSearchValue] = useState('')
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)

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
        placeholder="Search by customer name, phone number, or order ID"
        hiddenLabel
        size="small"
        sx={{ height: '100%', width: '90%' }}
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="From Date"
          value={startDate}
          onChange={setStartDate}
          slotProps={{ textField: { size: 'small' } }}
        />
        <DatePicker
          label="To Date"
          value={endDate}
          onChange={setEndDate}
          slotProps={{ textField: { size: 'small' } }}
        />
      </LocalizationProvider>

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
