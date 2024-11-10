import * as React from 'react'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'

const options = [
  'Default Sorting',
  'Sort by populary',
  'Sort by latest',
  'Sort by price: low to high',
  'Sort by price: high to low'
]

function SortDropdown() {
  const [option, setOption] = React.useState('')

  const handleChange = (event) => {
    setOption(event.target.value)
  }

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300, position: 'relative' }}>
        <Select size="small" value={option} onChange={handleChange}>
          {options.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  )
}

export default SortDropdown
