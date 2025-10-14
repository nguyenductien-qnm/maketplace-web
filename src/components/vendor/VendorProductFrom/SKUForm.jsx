import Box from '@mui/material/Box'
import Grid2 from '@mui/material/Grid2'
import TextField from '@mui/material/TextField'
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined'
import TypographyLabel from '~/components/common/TypographyLabel'
import { grey, red } from '@mui/material/colors'
import { useFormContext, useFieldArray, useWatch } from 'react-hook-form'
import { FIELD_REQUIRED_MESSAGE } from '~/utils/validators'

function SKUForm() {
  const {
    register,
    control,
    watch,
    formState: { errors }
  } = useFormContext()

  const { fields, remove } = useFieldArray({
    control,
    name: 'product_sku'
  })

  const selectedVariations =
    useWatch({ control, name: 'product_classifications' }) || []

  const productClassifications = watch('product_classifications')

  return (
    <Grid2 container rowSpacing={2} mt={2}>
      {fields.map((field, index) => (
        <Grid2
          key={index}
          size={12}
          sx={{
            borderRadius: '5px',
            p: 3,
            backgroundColor: grey[100],
            boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
          }}
        >
          <Box
            key={field.id}
            sx={{
              display: 'flex',
              justifyContent: 'flex-end'
            }}
          >
            <HighlightOffOutlinedIcon
              onClick={() => remove(index)}
              sx={{
                color: red[500],
                '&:hover': { cursor: 'pointer' }
              }}
            />
          </Box>

          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            {/* {selectedVariations.map((variation) => ( */}
            <Box
              sx={{ flex: 1, maxWidth: '300px', minWidth: '200px' }}
              // key={variation}
            >
              <TypographyLabel>Variation 1</TypographyLabel>
              <TextField
                {...register(`product_sku.${index}.${variation}`, {
                  required: FIELD_REQUIRED_MESSAGE
                })}
                error={!!errors.product_sku?.[index]?.[variation]}
                helperText={errors.product_sku?.[index]?.[variation]?.message}
                fullWidth
                sx={{
                  '& .MuiInputBase-root': {
                    backgroundColor: 'white',
                    borderRadius: 1
                  }
                }}
              />
            </Box>
            {/* ))} */}
          </Box>
        </Grid2>
      ))}
    </Grid2>
  )
}

export default SKUForm

{
  /* <Box sx={{ flex: 1, maxWidth: '300px', minWidth: '200px' }}>
              <TypographyLabel>Product Price</TypographyLabel>
              <Controller
                name={`product_sku.${index}.price`}
                control={control}
                rules={{ required: FIELD_REQUIRED_MESSAGE }}
                render={({ field: { ref, ...field } }) => (
                  <NumericFormat
                    {...field}
                    error={!!errors.product_sku?.[index]?.price}
                    helperText={errors.product_sku?.[index]?.price?.message}
                    size="small"
                    allowNegative={false}
                    prefix="$"
                    decimalScale={2}
                    fixedDecimalScale
                    fullWidth
                    thousandSeparator
                    customInput={TextField}
                    onValueChange={(values) => {
                      field.onChange(values.value || '')
                    }}
                  />
                )}
              />
            </Box>

            <Box sx={{ flex: 1, maxWidth: '300px', minWidth: '200px' }}>
              <TypographyLabel>Product Stock</TypographyLabel>
              <TextField
                {...register(`product_sku.${index}.stock`, {
                  required: FIELD_REQUIRED_MESSAGE,
                  pattern: {
                    value: NUMBER_RULE,
                    message: NUMBER_RULE_MESSAGE
                  }
                })}
                error={!!errors.product_sku?.[index]?.stock}
                helperText={errors.product_sku?.[index]?.stock?.message}
                type="number"
                size="small"
                fullWidth
              />
            </Box> */
}
