import { Box, InputLabel, Paper, TextField, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import Grid from '@mui/material/Grid2'
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined'
import {
  handleDeleteProductSKU,
  handleChangeSKUPrice,
  handleChangeSKUStock,
  handleChangeOptionValue
} from '~/redux/formProduct.slice'
import { grey, red } from '@mui/material/colors'
import TypographyLabel from '~/components/user/Common/TypographyLabel'
import { useFormContext } from 'react-hook-form'
import {
  FIELD_REQUIRED_MESSAGE,
  NUMBER_RULE,
  NUMBER_RULE_MESSAGE
} from '~/utils/validators'
function FormProductSKU() {
  const variations = useSelector(
    (state) => state.formProduct.product_classifications
  )

  const productsSKU = useSelector((state) => state.formProduct.product_sku)

  const quantityProductSKU = productsSKU.length

  const dispatch = useDispatch()

  const {
    register,
    formState: { errors }
  } = useFormContext()

  return (
    <Box sx={{ marginBottom: '5px' }}>
      {Array.from({ length: quantityProductSKU }, (_, index) => (
        <Paper
          element={2}
          sx={{ padding: '10px', marginTop: '20px' }}
          key={index}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '15px'
            }}
          >
            <Typography sx={{ fontWeight: '600', color: grey[500] }}>
              Product SKU
            </Typography>
            <HighlightOffOutlinedIcon
              onClick={() => {
                dispatch(handleDeleteProductSKU({ index: index }))
              }}
              sx={{
                color: red[600],
                '&:hover': { cursor: 'pointer' }
              }}
            />
          </Box>

          <Grid container spacing={2} rowSpacing={2} sx={{ marginTop: '20px' }}>
            <Grid size={4}>
              <TypographyLabel>Product price</TypographyLabel>
              <TextField
                {...register(`product_sku_price_index_${index}`, {
                  required: FIELD_REQUIRED_MESSAGE,
                  pattern: {
                    value: NUMBER_RULE,
                    message: NUMBER_RULE_MESSAGE
                  },

                  onChange: (e) => {
                    dispatch(
                      handleChangeSKUPrice({
                        index: index,
                        newValue: e.target?.value
                      })
                    )
                  }
                })}
                error={!!errors[`product_sku_price_index_${index}`]}
                helperText={errors[`product_sku_price_index_${index}`]?.message}
                type="number"
                size="small"
                value={productsSKU[index].price}
              ></TextField>
            </Grid>

            <Grid size={4}>
              <TypographyLabel>Product Stock</TypographyLabel>
              <TextField
                {...register(`product_sku_stock_index_${index}`, {
                  required: FIELD_REQUIRED_MESSAGE,
                  pattern: {
                    value: NUMBER_RULE,
                    message: NUMBER_RULE_MESSAGE
                  },
                  onChange: (e) => {
                    dispatch(
                      handleChangeSKUStock({
                        index: index,
                        newValue: e.target.value
                      })
                    )
                  }
                })}
                error={!!errors[`product_sku_stock_index_${index}`]}
                helperText={errors[`product_sku_stock_index_${index}`]?.message}
                type="number"
                size="small"
                value={productsSKU[index].stock}
              ></TextField>
            </Grid>

            {variations.map((variation) => (
              <Grid size={4} key={variation}>
                <TypographyLabel>{variation}</TypographyLabel>
                <TextField
                  {...register(`product_sku_${variation}_index_${index}`, {
                    required: FIELD_REQUIRED_MESSAGE,
                    onChange: (e) => {
                      dispatch(
                        handleChangeOptionValue({
                          index: index,
                          newValue: e.target.value,
                          key: `${variation}`
                        })
                      )
                    }
                  })}
                  error={!!errors[`product_sku_${variation}_index_${index}`]}
                  helperText={
                    errors[`product_sku_${variation}_index_${index}`]?.message
                  }
                  size="small"
                  value={productsSKU[index][variation]}
                ></TextField>
              </Grid>
            ))}
          </Grid>
        </Paper>
      ))}
    </Box>
  )
}
export default FormProductSKU
