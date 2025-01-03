import Box from '@mui/material/Box'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import Chip from '@mui/material/Chip'

const variations = ['Type', 'Size', 'Color', 'Material']
import { handleSelectVariation } from '~/redux/formProduct.slice'
import { useDispatch, useSelector } from 'react-redux'
import TypographyLabel from '~/components/user/Common/TypographyLabel'
export default function MultipleSelectVariation() {
  const dispatch = useDispatch()

  const variationSelected = useSelector(
    (state) => state.formProduct.product_classifications
  )

  const handleChange = (event) => {
    dispatch(handleSelectVariation(event.target.value))
  }

  return (
    <Box sx={{ marginTop: '20px' }}>
      <TypographyLabel> Product variations</TypographyLabel>
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
