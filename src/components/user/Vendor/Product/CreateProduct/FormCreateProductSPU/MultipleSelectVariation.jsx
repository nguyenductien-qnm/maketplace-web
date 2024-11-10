import Box from '@mui/material/Box'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import Chip from '@mui/material/Chip'

const variations = ['Type', 'Size', 'Color', 'Material']
import { handleSelectVariation } from '~/redux/formCreateProduct.slice'
import { useDispatch, useSelector } from 'react-redux'
export default function MultipleSelectVariation() {
  const dispatch = useDispatch()

  const variationSelected = useSelector(
    (state) => state.formCreateProduct.productVariation
  )

  const handleChange = (event) => {
    dispatch(handleSelectVariation(event.target.value))
  }

  return (
    <Box sx={{ marginTop: '20px' }}>
      <InputLabel
        sx={{
          fontSize: '14px',
          fontWeight: '600',
          marginBottom: '5px'
        }}
      >
        Product variations
      </InputLabel>
      <FormControl fullWidth>
        <Select
          size="small"
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={variationSelected}
          onChange={(e) => {
            handleChange(e)
          }}
          input={<OutlinedInput id="select-multiple-chip" />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
        >
          {variations.map((variation) => (
            <MenuItem key={variation} value={variation}>
              {variation}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  )
}
