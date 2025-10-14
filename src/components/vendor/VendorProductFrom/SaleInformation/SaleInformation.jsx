import Box from '@mui/material/Box'
import Tooltip from '@mui/material/Tooltip'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import TextField from '@mui/material/TextField'
import Grid2 from '@mui/material/Grid2'
import TypographyLabel from '~/components/common/TypographyLabel'
import TypographyTitle from '~/components/common/TypographyTitle'
import AddIcon from '@mui/icons-material/Add'
import ProductSKUTable from './ProductSKUTable'
import ProductVariationItem from './ProductVariationItem'
import { Controller } from 'react-hook-form'
import { NumericFormat } from 'react-number-format'
import { grey } from '@mui/material/colors'
import { useState } from 'react'
import {
  FIELD_REQUIRED_MESSAGE,
  NUMBER_RULE,
  NUMBER_RULE_MESSAGE
} from '~/utils/validators'

const MESSAGES = {
  TITLE: 'Sales Information',
  VARIATIONS: 'Variations',
  ADD_VARIATION: '+ Add Variation',
  ENABLE_VARIATIONS: 'Enable Variations',
  PRODUCT_PRICE: 'Product Price',
  PRODUCT_STOCK: 'Product Stock',
  VARIATION_LIST: 'Variation List',
  APPLY_ALL_TOOLTIP: 'Apply price and stock to all SKU combinations'
}

const PriceInput = (props) => (
  <NumericFormat
    fullWidth
    allowNegative={false}
    prefix="$"
    decimalScale={2}
    fixedDecimalScale
    thousandSeparator
    customInput={TextField}
    {...props}
  />
)

const StockInput = ({ register, name, error, helperText, ...props }) => (
  <TextField
    fullWidth
    type="number"
    {...register(name, {
      required: FIELD_REQUIRED_MESSAGE,
      pattern: {
        value: NUMBER_RULE,
        message: NUMBER_RULE_MESSAGE
      }
    })}
    error={!!error}
    helperText={helperText}
    {...props}
  />
)

function SaleInformation({ form, variations, variationHandlers, onApplyAll }) {
  const [price, setPrice] = useState('')
  const [stock, setStock] = useState('')

  const { register, control, errors } = form
  const { isEnabled, items } = variations
  const { onEnable, onAdd, onChange, onRemove } = variationHandlers

  return (
    <Card sx={{ p: 3 }}>
      <TypographyTitle>{MESSAGES.TITLE}</TypographyTitle>

      <Grid2 container rowSpacing={2}>
        <Grid2 size={12}>
          <TypographyLabel sx={{ mt: 3 }}>
            {MESSAGES.VARIATIONS}
          </TypographyLabel>
        </Grid2>

        {isEnabled &&
          items?.map((_, variationIndex) => (
            <Grid2 size={12} key={variationIndex}>
              <ProductVariationItem
                form={form}
                variationIndex={variationIndex}
                handleChangeVariation={onChange}
                handleRemoveVariation={onRemove}
              />
            </Grid2>
          ))}

        {isEnabled && items?.length < 2 && (
          <Grid2
            size={12}
            sx={{
              backgroundColor: grey[100],
              p: '10px 36px',
              borderRadius: '5px'
            }}
          >
            <Button
              variant="outlined"
              color="primary"
              onClick={onAdd}
              sx={{ backgroundColor: 'white' }}
            >
              {MESSAGES.ADD_VARIATION}
            </Button>
          </Grid2>
        )}

        {isEnabled && (
          <Box sx={{ width: '100%' }}>
            <Grid2 size={12} sx={{ display: 'flex', gap: 2, mt: 2, mb: 4 }}>
              <PriceInput
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                size="small"
                placeholder="Price"
              />
              <TextField
                type="number"
                onChange={(e) => setStock(e.target.value)}
                value={stock}
                fullWidth
                size="small"
                placeholder="Stock"
              />
              <Tooltip title={MESSAGES.APPLY_ALL_TOOLTIP}>
                <Button
                  onClick={() => onApplyAll(price, stock)}
                  variant="contained"
                  sx={{ flexShrink: 0 }}
                >
                  Apply All
                </Button>
              </Tooltip>
            </Grid2>

            <Grid2 size={12}>
              <TypographyLabel>{MESSAGES.VARIATION_LIST}</TypographyLabel>
              <ProductSKUTable form={form} />
            </Grid2>
          </Box>
        )}

        {!isEnabled && (
          <>
            <Grid2 size={12}>
              <Button
                variant="outlined"
                onClick={() => {
                  onEnable()
                  onAdd()
                }}
              >
                <AddIcon />
                {MESSAGES.ENABLE_VARIATIONS}
              </Button>
            </Grid2>

            <Grid2 size={12}>
              <TypographyLabel>{MESSAGES.PRODUCT_PRICE}</TypographyLabel>
              <Controller
                name="product_price"
                control={control}
                rules={{ required: FIELD_REQUIRED_MESSAGE }}
                render={({ field: { ref, ...field } }) => (
                  <PriceInput
                    {...field}
                    error={!!errors.product_price}
                    helperText={errors?.product_price?.message}
                    size="medium"
                    placeholder="Price"
                    onValueChange={(values) => {
                      field.onChange(values.value || '')
                    }}
                  />
                )}
              />
            </Grid2>

            <Grid2 size={12}>
              <TypographyLabel>{MESSAGES.PRODUCT_STOCK}</TypographyLabel>
              <StockInput
                register={register}
                name="product_stock"
                error={!!errors?.product_stock}
                helperText={errors?.product_stock?.message}
                placeholder="Stock"
              />
            </Grid2>
          </>
        )}
      </Grid2>
    </Card>
  )
}

export default SaleInformation
