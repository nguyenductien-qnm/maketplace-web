import { Box, Button, TextField } from '@mui/material'
import { useState } from 'react'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers'

function SearchInput({ customHandleSearch }) {
  const [searchValue, setSearchValue] = useState()
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)
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
          onChange={(newValue) => setStartDate(newValue)}
          slotProps={{ textField: { size: 'small' } }}
          renderInput={(params) => <TextField {...params} />}
        />
        <DatePicker
          label="To Date"
          value={endDate}
          onChange={(newValue) => setEndDate(newValue)}
          slotProps={{ textField: { size: 'small' } }}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>

      <Button
        onClick={() =>
          customHandleSearch({ search: searchValue, startDate, endDate })
        }
        variant="contained"
        sx={{ height: '100%', width: '10%' }}
      >
        Search
      </Button>
    </Box>
  )
}
export default SearchInput
