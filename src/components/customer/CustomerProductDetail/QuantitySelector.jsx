import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'

function QuantitySelector({
  disableAction,
  quantityAvailable,
  quantitySelected,
  setQuantitySelected
}) {
  const handleReduceQuantity = () => {
    if (quantitySelected > 1) setQuantitySelected(quantitySelected - 1)
  }

  const handleAddQuantity = () => {
    if (!quantityAvailable) setQuantitySelected(quantitySelected + 1)

    if (quantityAvailable && quantityAvailable > quantitySelected)
      setQuantitySelected(quantitySelected + 1)
  }

  const handleAdjustQuantity = (e) => {
    const value = e.target.value
    if (value === '') {
      setQuantitySelected('')
      return
    }

    if (Number(value) === 0) return

    if (Number(value) > quantityAvailable) {
      setQuantitySelected(quantityAvailable)
      return
    }

    if (/^\d*$/.test(value)) {
      setQuantitySelected(Number(value))
    }
  }

  const handleBlurInputQuantity = () => {
    if (quantitySelected === '') {
      setQuantitySelected(1)
    }
  }

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          border: '1px solid black',
          borderRadius: '5px',
          justifyContent: 'space-around',
          padding: '0 5px',
          pointerEvents: disableAction ? 'none' : 'auto',
          opacity: disableAction ? 0.5 : 1,
          height: '50px'
        }}
      >
        <RemoveIcon
          sx={{
            '&:hover': {
              cursor: 'pointer'
            }
          }}
          fontSize="small"
          onClick={() => {
            handleReduceQuantity()
          }}
        />
        <TextField
          size="small"
          value={quantitySelected}
          onChange={(e) => handleAdjustQuantity(e)}
          onBlur={() => handleBlurInputQuantity()}
          sx={{
            width: '50px',
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                border: 'none'
              }
            },
            '& .MuiInputBase-input': {
              padding: '0',
              fontSize: '16px',
              textAlign: 'center'
            }
          }}
        />

        <AddIcon
          sx={{
            '&:hover': {
              cursor: 'pointer'
            }
          }}
          fontSize="small"
          onClick={() => {
            handleAddQuantity()
          }}
        />
      </Box>
    </Box>
  )
}
export default QuantitySelector
