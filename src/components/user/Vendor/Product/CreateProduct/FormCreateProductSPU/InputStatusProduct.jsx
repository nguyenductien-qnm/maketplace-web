import * as React from 'react'
import Box from '@mui/material/Box'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import { InputLabel } from '@mui/material'

export default function InputStatusProduct() {
  const [status, setStatus] = React.useState('')

  const handleChange = (event) => {
    setStatus(event.target.value)
  }

  return (
    <Box>
      <InputLabel
        sx={{
          fontSize: '14px',
          fontWeight: '600',
          marginBottom: '5px'
        }}
      >
        Product Status
      </InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={status}
        onChange={handleChange}
        fullWidth
        size="small"
      >
        <MenuItem value={'Draft'}>Draft</MenuItem>
        <MenuItem value={'Publish'}>Publish</MenuItem>
      </Select>
    </Box>
  )
}
