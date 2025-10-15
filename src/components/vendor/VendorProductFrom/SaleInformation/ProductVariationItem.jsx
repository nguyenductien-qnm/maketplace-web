import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Grid2 from '@mui/material/Grid2'
import InputAdornment from '@mui/material/InputAdornment'
import Typography from '@mui/material/Typography'
import TypographyLabel from '~/components/common/TypographyLabel'
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined'
import ProductOptionItem from './ProductOptionItem/ProductOptionItem'
import DividerVertical from '~/components/common/DividerVertical'
import { grey, red } from '@mui/material/colors'
import {
  FIELD_REQUIRED_MESSAGE,
  PRODUCT_VARIATION_NAME_MESSAGE,
  PRODUCT_VARIATION_NAME_RULE
} from '~/utils/validators'

function ProductVariationItem({
  form,
  variationIndex,
  handleChangeVariation,
  handleRemoveVariation
}) {
  const { register, errors, watch } = form
  return (
    <Grid2
      container
      spacing={2}
      rowSpacing={2}
      mt={2}
      sx={{ backgroundColor: grey[100], p: 3, borderRadius: '5px' }}
    >
      <Grid2 size={12} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <CancelOutlinedIcon
          sx={{ color: red[500], '&:hover': { cursor: 'pointer' } }}
          onClick={() => handleRemoveVariation(variationIndex)}
        />
      </Grid2>

      <Grid2 size={12}>
        <TypographyLabel>{`Variation ${variationIndex + 1}`}</TypographyLabel>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: 1,
              alignItems: 'center'
            }}
          >
            <TextField
              {...register(`product_variations.${variationIndex}.name`, {
                required: FIELD_REQUIRED_MESSAGE,
                pattern: {
                  value: PRODUCT_VARIATION_NAME_RULE,
                  message: PRODUCT_VARIATION_NAME_MESSAGE
                }
              })}
              size="small"
              onChange={(e) => handleChangeVariation(e, variationIndex)}
              error={!!errors?.product_variations?.[variationIndex]?.name}
              sx={{
                width: '365px',
                backgroundColor: 'white',
                '& .MuiOutlinedInput-root': {
                  backgroundColor: 'white'
                }
              }}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <DividerVertical />
                      <Typography sx={{ ml: '10px' }}>
                        {watch(`product_variations.${variationIndex}.name`)
                          ?.length || 0}
                        /14
                      </Typography>
                    </InputAdornment>
                  )
                }
              }}
            />
          </Box>

          <Box
            sx={{ minHeight: 20, color: 'error.main', fontSize: 12, mt: -1 }}
          >
            {errors?.product_variations?.[variationIndex]?.name?.message || ' '}
          </Box>
        </Box>
      </Grid2>

      <Grid2 size={12} sx={{ mt: -1 }}>
        <TypographyLabel>Options</TypographyLabel>
        <ProductOptionItem form={form} variationIndex={variationIndex} />
      </Grid2>
    </Grid2>
  )
}
export default ProductVariationItem
