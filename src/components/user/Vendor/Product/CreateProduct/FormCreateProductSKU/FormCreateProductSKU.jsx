import { Box, InputLabel, Paper, TextField, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import Grid from '@mui/material/Grid2'
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined'
import {
  handleDeleteProductSKU,
  handleChangeSKUPrice,
  handleChangeSKUStock,
  handleChangeOptionValue
} from '~/redux/formCreateProduct.slice'
import { red } from '@mui/material/colors'
function FormCreateProductSKU() {
  const variations = useSelector(
    (state) => state.formCreateProduct.productVariation
  )

  const productsSKU = useSelector(
    (state) => state.formCreateProduct.product_sku
  )

  const quantityProductSKU = productsSKU.length

  const dispatch = useDispatch()

  const CustomInputLabel = styled(InputLabel)({
    fontSize: '14px',
    fontWeight: '600',
    marginBottom: '5px'
  })

  return (
    <Box sx={{ marginBottom: '5px' }}>
      {Array.from({ length: quantityProductSKU }, (_, index) => (
        <Paper element={2} sx={{ padding: '10px', marginTop: '20px' }}>
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
            <Grid item size={4}>
              <CustomInputLabel>Product price</CustomInputLabel>
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
            <Grid item size={4}>
              <CustomInputLabel>Product Stock</CustomInputLabel>
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
              <Grid item size={4}>
                <CustomInputLabel>{variation}</CustomInputLabel>
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
