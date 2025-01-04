import Grid from '@mui/material/Grid2'
import { Box, Checkbox, FormControlLabel, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { handleMultiVariation } from '~/redux/formProduct.slice'
import InputStatusProduct from './InputStatusProduct'
import NameInput from './NameInput'
import StockInput from './StockInput'
import PriceInput from './PriceInput'
import ButtonAddAttribute from './ButtonAddAttribute'
import AttributeInput from './AttributeInput'
import CategoriesSelected from './CategoriesSelected'

function FormProductSPU({ page }) {
  const dispatch = useDispatch()
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
      <Grid container spacing={2} rowSpacing={2}>
        {/* name  */}
        <Grid size={12}>
          <NameInput page={page} />
        </Grid>

        {/* price & stock  */}
        <Grid size={12}>
          <Grid container spacing={2}>
            <Grid size={6}>
              <PriceInput page={page} />
            </Grid>
            <Grid size={6}>
              <StockInput page={page} />
            </Grid>
          </Grid>
        </Grid>

        <Grid size={12}>
          <CategoriesSelected page={page} />
        </Grid>

        {/* attribute  */}
        <Grid size={12}>
          <AttributeInput />
          <ButtonAddAttribute />
        </Grid>

        {/* status  */}
        <Grid size={12}>
          <InputStatusProduct page={page} />
        </Grid>

        <Grid size={12}>
          <FormControlLabel
            control={
              <Checkbox
                size="small"
                onClick={() => dispatch(handleMultiVariation())}
              />
            }
            label={
              <Typography style={{ fontSize: '14px' }}>
                Multi variation
              </Typography>
            }
          />
        </Grid>
      </Grid>
    </Box>
  )
}
export default FormProductSPU
