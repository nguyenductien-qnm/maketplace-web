import TextField from '@mui/material/TextField'
import { NumericFormat } from 'react-number-format'

function PriceInput(props) {
  return (
    <NumericFormat
      fullWidth
      allowNegative={false}
      prefix="$"
      decimalScale={2}
      fixedDecimalScale
      thousandSeparator
      customInput={TextField}
      {...props}
    />
  )
}

export default PriceInput
