import { Box, TextField } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import { useState } from 'react'

function QuantitySelector({ disableAction }) {
  const [quantity, setQuantity] = useState(1)

  const handleReduceQuantity = () => {
    setQuantity(quantity + 1)
  }

  const handleAddQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1)
  }

  const handleAdjustQuantity = (e) => {
    const value = e.target.value
    if (value === '') {
      setQuantity('')
      return
    }

    if (Number(value) === 0) return

    if (/^\d*$/.test(value)) {
      setQuantity(Number(value))
    }
  }

  const handleBlur = () => {
    if (quantity === '') {
      setQuantity(1)
    }
  }

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        border: '1px solid black',
        height: '40px',
        borderRadius: '5px',
        justifyContent: 'space-around',
        padding: '0 5px',
        pointerEvents: disableAction ? 'none' : 'auto',
        opacity: disableAction ? 0.5 : 1
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
          handleAddQuantity()
        }}
      />
      <TextField
        size="small"
        value={quantity}
        onChange={(e) => handleAdjustQuantity(e)}
        onBlur={() => handleBlur()}
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
          handleReduceQuantity()
        }}
      />
    </Box>
  )
}
export default QuantitySelector
