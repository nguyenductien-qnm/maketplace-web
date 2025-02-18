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
import DimensionsInput from './DimensionsInput'

function FormProductSPU({ isLoading }) {
  const dispatch = useDispatch()
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
      <Grid container spacing={2} rowSpacing={2}>
        {/* name  */}
        <Grid size={12}>
          <NameInput isLoading={isLoading} />
        </Grid>

        {/* price & stock  */}
        <Grid size={12}>
          <Grid container spacing={2}>
            <Grid size={6}>
              <PriceInput isLoading={isLoading} />
            </Grid>
            <Grid size={6}>
              <StockInput isLoading={isLoading} />
            </Grid>
          </Grid>
        </Grid>

        <Grid size={12}>
          <DimensionsInput isLoading={isLoading} />
        </Grid>

        <Grid size={12}>
          <CategoriesSelected isLoading={isLoading} />
        </Grid>

        {/* attribute  */}
        <Grid size={12}>
          <AttributeInput isLoading={isLoading} />
          <ButtonAddAttribute />
        </Grid>

        {/* status  */}
        <Grid size={12}>
          <InputStatusProduct isLoading={isLoading} />
        </Grid>

        <Grid size={12}>
          <FormControlLabel
            control={
              <Checkbox
                checked={useSelector(
                  (state) => state.formProduct.isMultiVariation
                )}
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
