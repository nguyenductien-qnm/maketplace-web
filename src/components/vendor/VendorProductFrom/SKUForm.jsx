import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined'
import {
  useFormContext,
  useFieldArray,
  useWatch,
  Controller
} from 'react-hook-form'
import { grey, red } from '@mui/material/colors'
import TypographyLabel from '~/components/common/TypographyLabel'
import {
  FIELD_REQUIRED_MESSAGE,
  NUMBER_RULE,
  NUMBER_RULE_MESSAGE
} from '~/utils/validators'
import { NumericFormat } from 'react-number-format'

function SKUForm() {
  const {
    control,
    register,
    formState: { errors }
  } = useFormContext()

  const { fields, remove } = useFieldArray({
    control,
    name: 'product_sku'
  })

  const selectedVariations =
    useWatch({ control, name: 'product_classifications' }) || []

  return (
    <Box sx={{ marginBottom: '5px' }}>
      {fields.map((field, index) => (
        <Paper
          elevation={2}
          sx={{ padding: '10px', marginTop: '20px' }}
          key={field.id}
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
            {fields.length > 1 && (
              <HighlightOffOutlinedIcon
                onClick={() => remove(index)}
                sx={{
                  color: red[600],
                  '&:hover': { cursor: 'pointer' }
                }}
              />
            )}
          </Box>

          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
            {/* Product Price */}
            <Box sx={{ flex: 1 }}>
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

            <Box sx={{ flex: 1 }}>
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
            </Box>

            {selectedVariations.map((variation) => (
              <Box sx={{ flex: 1 }} key={variation}>
                <TypographyLabel>{variation}</TypographyLabel>
                <TextField
                  {...register(`product_sku.${index}.${variation}`, {
                    required: FIELD_REQUIRED_MESSAGE
                  })}
                  error={!!errors.product_sku?.[index]?.[variation]}
                  helperText={errors.product_sku?.[index]?.[variation]?.message}
                  size="small"
                  fullWidth
                />
              </Box>
            ))}
          </Box>
        </Paper>
      ))}
    </Box>
  )
}

export default SKUForm
