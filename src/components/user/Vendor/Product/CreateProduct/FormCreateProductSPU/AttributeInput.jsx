import { Box, InputLabel, TextField, Paper } from '@mui/material'
import Grid from '@mui/material/Grid2'
import { useDispatch, useSelector } from 'react-redux'
import {
  handleChangeSPUAttribute,
  handleDeleteSPUAttribute
} from '~/redux/formCreateProduct.slice'
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined'
import { red } from '@mui/material/colors'
function AttributeInput() {
  const spuAttribute = useSelector(
    (state) => state.formCreateProduct.spu_attribute
  )
  const dispatch = useDispatch()

  const hanldeChangeKey = (e, index) => {
    dispatch(
      handleChangeSPUAttribute({
        index: index,
        newValue: e.target.value,
        keyOrValue: 'key'
      })
    )
  }
  const hanldeChangeValue = (e, index) => {
    dispatch(
      handleChangeSPUAttribute({
        index: index,
        newValue: e.target.value,
        keyOrValue: 'value'
      })
    )
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
        Product Attribute
      </InputLabel>
      <Grid container spacing={2} rowSpacing={3}>
        {Array.from({ length: spuAttribute.length }, (_, index) => (
          <Grid item size={12}>
            <Paper elevation={2} sx={{ padding: '10px' }} key={index}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'end',
                  marginBottom: '10px'
                }}
              >
                <HighlightOffOutlinedIcon
                  onClick={() => {
                    dispatch(handleDeleteSPUAttribute({ index: index }))
                  }}
                  sx={{
                    color: red[600],
                    '&:hover': { cursor: 'pointer' }
                  }}
                />
              </Box>

              <Box
                sx={{
                  display: 'flex',
                  gap: '15px',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <TextField
                  fullWidth
                  size="small"
                  placeholder="Key"
                  value={spuAttribute[index].key}
                  onChange={(e) => hanldeChangeKey(e, index)}
                ></TextField>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="Value"
                  value={spuAttribute[index].value}
                  onChange={(e) => hanldeChangeValue(e, index)}
                ></TextField>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}
export default AttributeInput
