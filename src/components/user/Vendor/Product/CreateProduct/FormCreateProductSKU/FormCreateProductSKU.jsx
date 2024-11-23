import { Box, InputLabel, Paper, TextField, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import Grid from '@mui/material/Grid2'
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined'
import {
  handleDeleteProductSKU,
  handleChangeSKUPrice,
  handleChangeSKUStock,
  handleChangeOptionValue
} from '~/redux/formCreateProduct.slice'
import { red } from '@mui/material/colors'
import TypographyLabel from '~/components/user/Common/TypographyLabel'
function FormCreateProductSKU() {
  const variations = useSelector(
    (state) => state.formCreateProduct.productVariation
  )

  const productsSKU = useSelector(
    (state) => state.formCreateProduct.product_sku
  )

  const quantityProductSKU = productsSKU.length

  const dispatch = useDispatch()

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
            <Typography sx={{ fontWeight: '600' }}>New product SKU</Typography>
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
                onChange={(e) => {
                  dispatch(
                    handleChangeSKUPrice({
                      index: index,
                      newValue: e.target.value
                    })
                  )
                }}
                size="small"
                value={productsSKU[index].price}
              ></TextField>
            </Grid>
            <Grid size={4}>
              <TypographyLabel>Product Stock</TypographyLabel>
              <TextField
                onChange={(e) => {
                  dispatch(
                    handleChangeSKUStock({
                      index: index,
                      newValue: e.target.value
                    })
                  )
                }}
                size="small"
                value={productsSKU[index].stock}
              ></TextField>
            </Grid>
            {variations.map((variation) => (
              <Grid size={4} key={variation}>
                <TypographyLabel>{variation}</TypographyLabel>
                <TextField
                  size="small"
                  value={productsSKU[index][variation]}
                  onChange={(e) => {
                    dispatch(
                      handleChangeOptionValue({
                        index: index,
                        newValue: e.target.value,
                        key: `${variation}`
                      })
                    )
                  }}
                ></TextField>
              </Grid>
            ))}
          </Grid>
        </Paper>
      ))}
    </Box>
  )
}
export default FormCreateProductSKU
