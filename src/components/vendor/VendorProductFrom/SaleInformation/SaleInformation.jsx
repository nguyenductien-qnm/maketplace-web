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
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import { grey } from '@mui/material/colors'
import { useState } from 'react'
import { Controller } from 'react-hook-form'
import { NumericFormat } from 'react-number-format'
import {
  FIELD_REQUIRED_MESSAGE,
  PRODUCT_PRICE_MAX,
  PRODUCT_PRICE_MESSAGE,
  PRODUCT_STOCK_MAX,
  PRODUCT_STOCK_MESSAGE,
  PRODUCT_STOCK_MIN
} from '~/utils/validators'

const MESSAGES = {
  TITLE: 'Sales Information',
  VARIATIONS: 'Variations',
  ADD_VARIATION: '+ Add Variation',
  ENABLE_VARIATIONS: 'Enable Variations',
  PRODUCT_PRICE: 'Product Price',
  PRODUCT_STOCK: 'Product Stock',
  VARIATION_LIST: 'Variation List'
}

const TOOLTIP = {
  VARIATIONS:
    'Maximum 2 variations. Total variants (option combinations) cannot exceed 96.',
  APPLY_ALL: 'Apply price and stock to all SKU combinations',
  PRICE:
    'Enter product price. Maximum: $2,000 USD. Price must be greater than 0.',
  STOCK:
    'Enter available stock quantity. Must be between 1 and 10,000,000 units.'
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
      min: {
        value: PRODUCT_STOCK_MIN,
        message: PRODUCT_STOCK_MESSAGE
      },
      max: {
        value: PRODUCT_STOCK_MAX,
        message: PRODUCT_STOCK_MESSAGE
      },
      validate: (value) =>
        Number.isInteger(Number(value)) || 'Stock must be a whole number'
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
      <TypographyTitle sx={{ mb: 3 }}>{MESSAGES.TITLE}</TypographyTitle>

      <Grid2 container rowSpacing={3}>
        <Grid2 size={12}>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <TypographyLabel>{MESSAGES.VARIATIONS}</TypographyLabel>
            <Tooltip arrow placement="top" title={TOOLTIP.VARIATIONS}>
              <InfoOutlinedIcon fontSize="small" sx={{ color: 'grey' }} />
            </Tooltip>
          </Box>
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
              <Box sx={{ display: 'flex', gap: 1 }}>
                <TypographyLabel>{MESSAGES.PRODUCT_PRICE}</TypographyLabel>
                <Tooltip arrow placement="top" title={TOOLTIP.PRICE}>
                  <InfoOutlinedIcon fontSize="small" sx={{ color: 'grey' }} />
                </Tooltip>
              </Box>
              <Controller
                name="product_price"
                control={control}
                rules={{
                  required: FIELD_REQUIRED_MESSAGE,
                  validate: {
                    positive: (value) => {
                      const numValue = parseFloat(
                        String(value).replace(/[$,]/g, '')
                      )
                      return numValue > 0 || PRODUCT_PRICE_MESSAGE
                    },
                    maxPrice: (value) => {
                      const numValue = parseFloat(
                        String(value).replace(/[$,]/g, '')
                      )
                      return (
                        numValue <= PRODUCT_PRICE_MAX || PRODUCT_PRICE_MESSAGE
                      )
                    }
                  }
                }}
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
              <Box sx={{ display: 'flex', gap: 1 }}>
                <TypographyLabel>{MESSAGES.PRODUCT_STOCK}</TypographyLabel>
                <Tooltip arrow placement="top" title={TOOLTIP.STOCK}>
                  <InfoOutlinedIcon fontSize="small" sx={{ color: 'grey' }} />
                </Tooltip>
              </Box>
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
