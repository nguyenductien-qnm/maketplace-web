import Grid from '@mui/material/Grid2'
import { Box, Checkbox, FormControlLabel } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { handleMultiVariation } from '~/redux/formCreateProduct.slice'
import InputStatusProduct from './InputStatusProduct'
import NameInput from './NameInput'
import StockInput from './StockInput'
import PriceInput from './PriceInput'
import ButtonAddAttribute from './ButtonAddAttribute'
import AttributeInput from './AttributeInput'

function FormCreateProductSPU() {
  const spuStatus = useSelector((state) => state.formCreateProduct.spuStatus)

  const dispatch = useDispatch()
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
      <Grid container spacing={2} rowSpacing={2}>
        {/* name  */}
        <Grid size={12}>
          <NameInput />
        </Grid>

        {/* price & stock  */}
        <Grid size={12}>
          <Grid container spacing={2}>
            <Grid size={6}>
              <PriceInput />
            </Grid>
            <Grid size={6}>
              <StockInput />
            </Grid>
          </Grid>
        </Grid>

        {/* attribute  */}
        <Grid size={12}>
          <AttributeInput />
          <ButtonAddAttribute />
        </Grid>

        {/* status  */}
        <Grid size={12}>
          <InputStatusProduct />
        </Grid>

        <Grid size={12}>
          <FormControlLabel
            control={
              <Checkbox
                size="small"
                onClick={() => dispatch(handleMultiVariation())}
              />
            }
            label="Multi variation"
          />
        </Grid>
      </Grid>
    </Box>
  )
}
export default FormCreateProductSPU
