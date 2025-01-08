import { Box, TextField, Paper, Typography } from '@mui/material'
import Grid from '@mui/material/Grid2'
import { useDispatch, useSelector } from 'react-redux'
import {
  handleChangeSPUAttribute,
  handleDeleteSPUAttribute
} from '~/redux/formProduct.slice'
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined'
import { red } from '@mui/material/colors'
import TypographyLabel from '~/components/user/Common/TypographyLabel'
import { useFormContext } from 'react-hook-form'
import { FIELD_REQUIRED_MESSAGE } from '~/utils/validators'
import Skeleton from '@mui/material/Skeleton'
import { useParams } from 'react-router-dom'
function AttributeInput({ isLoading }) {
  const { page } = useParams()
  const spuAttribute = useSelector((state) => state.formProduct.product_specs)
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

  const {
    register,
    formState: { errors }
  } = useFormContext()

  return (
    <Box>
      {isLoading ? (
        <Box>
          <Skeleton variant="rectangular" height={200} />
        </Box>
      ) : (
        <Box>
          <TypographyLabel>Product Attribute</TypographyLabel>
          <Grid container spacing={2} rowSpacing={3}>
            {Array.from({ length: spuAttribute.length }, (_, index) => (
              <Grid size={12} key={index}>
                <Paper elevation={2} sx={{ padding: '10px' }}>
                  <Grid container spacing={3}>
                    <Grid size={5}>
                      <TextField
                        {...register(`attribute_key_index_${index}`, {
                          required: FIELD_REQUIRED_MESSAGE,
                          onChange: (e) => hanldeChangeKey(e, index)
                        })}
                        error={!!errors[`attribute_key_index_${index}`]}
                        fullWidth
                        size="small"
                        placeholder="Key"
                        value={spuAttribute[index].key}
                        helperText={
                          errors[`attribute_key_index_${index}`]?.message
                        }
                      ></TextField>
                    </Grid>

                    <Grid size={5}>
                      <TextField
                        {...register(`attribute_value_index_${index}`, {
                          required: FIELD_REQUIRED_MESSAGE,
                          onChange: (e) => hanldeChangeValue(e, index)
                        })}
                        error={!!errors[`attribute_value_index_${index}`]}
                        fullWidth
                        size="small"
                        placeholder="Value"
                        value={spuAttribute[index].value}
                        helperText={
                          errors[`attribute_value_index_${index}`]?.message
                        }
                      ></TextField>
                    </Grid>

                    <Grid
                      size={1}
                      sx={{
                        display: 'flex',
                        alignItems: 'center'
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
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </Box>
  )
}
export default AttributeInput
