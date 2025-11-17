import TextField from '@mui/material/TextField'

function ReadOnlyTextField({ value, rows = 1 }) {
  return (
    <TextField
      value={value}
      disabled
      fullWidth
      multiline
      rows={rows}
      InputProps={{
        style: { backgroundColor: '#fff' }
      }}
    />
  )
}

export default ReadOnlyTextField
