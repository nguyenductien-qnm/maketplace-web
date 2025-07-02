import TextField from '@mui/material/TextField'

function ReadOnlyTextField({ value, rows = 1 }) {
  return (
    <TextField
      size="small"
      value={value}
      disabled
      fullWidth
      multiline
      rows={rows}
    />
  )
}

export default ReadOnlyTextField
