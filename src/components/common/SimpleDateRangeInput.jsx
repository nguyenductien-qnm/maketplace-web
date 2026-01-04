import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Popover from '@mui/material/Popover'
import { useState } from 'react'
import { DateRange } from 'react-date-range'
import toDateOnly from '~/utils/toDateOnly'

const isValidDate = (d) => d instanceof Date && !Number.isNaN(d.getTime())

function SimpleDateRangeInput({ label, value, config, onChange }) {
  const [anchorEl, setAnchorEl] = useState(null)

  const [tempRange, setTempRange] = useState([
    {
      startDate: value?.startDate || null,
      endDate: value?.endDate || null,
      key: 'selection'
    }
  ])

  const displayValue = () => {
    const start = isValidDate(value?.startDate)
      ? toDateOnly(value.startDate)
      : null

    const end = isValidDate(value?.endDate) ? toDateOnly(value.endDate) : null

    if (start && end) return `${start} – ${end}`
    if (start) return `From ${start}`
    if (end) return `Until ${end}`
    return ''
  }

  const handleOpen = (e) => {
    setTempRange([
      {
        startDate: value?.startDate || null,
        endDate: value?.endDate || null,
        key: 'selection'
      }
    ])
    setAnchorEl(e.currentTarget)
  }

  const handleClear = () => {
    setTempRange([
      {
        startDate: null,
        endDate: null,
        key: 'selection'
      }
    ])
    onChange(null)
    handleClose()
  }

  const handleClose = () => setAnchorEl(null)

  const handleApply = () => {
    onChange(tempRange[0])
    handleClose()
  }

  return (
    <>
      <TextField
        fullWidth
        label={label}
        value={displayValue()}
        placeholder="Select date range"
        InputProps={{ readOnly: true }}
        onClick={handleOpen}
      />

      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        disableAutoFocus
        disableEnforceFocus
      >
        <Box p={2}>
          <DateRange
            {...config}
            rangeColors={['#1976d2']}
            editableDateInputs={true}
            onChange={(item) => {
              setTempRange([item.selection])
            }}
            moveRangeOnFirstSelection={false}
            ranges={tempRange}
          />

          <Box mt={2} display="flex" justifyContent="space-between">
            <Button size="small" color="error" onClick={handleClear}>
              Clear
            </Button>

            <Box display="flex" gap={1}>
              <Button size="small" onClick={handleClose}>
                Cancel
              </Button>
              <Button
                size="small"
                variant="contained"
                onClick={handleApply}
                disabled={!tempRange[0].startDate || !tempRange[0].endDate}
              >
                Apply
              </Button>
            </Box>
          </Box>
        </Box>
      </Popover>
    </>
  )
}

export default SimpleDateRangeInput
