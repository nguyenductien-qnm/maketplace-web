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
import ProductVariation from './ProductVariation'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import PriceInput from './input/PriceInput'
import StockInput from './input/StockInput'
import { grey } from '@mui/material/colors'
import { useState } from 'react'
import { Controller } from 'react-hook-form'
import { PRODUCT_SAFE_INTO_TOOLTIP } from '../../../constants/product.constant'
import {
  FIELD_REQUIRED_MESSAGE,
  PRODUCT_PRICE_MAX,
  PRODUCT_PRICE_MESSAGE
} from '~/utils/validators'

function SaleInformation({ form, data, handlers }) {
  const [price, setPrice] = useState('')
  const [stock, setStock] = useState('')

  const { register, control, errors } = form
  const { isEnabled, items } = data
  const { onEnable, onAdd, onChange, onRemove, onApplyAll } = handlers

  return (
    <Card sx={{ p: 3 }}>
      <TypographyTitle sx={{ mb: 3 }}>Sales Information</TypographyTitle>

      <Grid2 container rowSpacing={3}>
        <Grid2 size={12}>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <TypographyLabel>Variations</TypographyLabel>
            <Tooltip
              arrow
              placement="top"
              title={PRODUCT_SAFE_INTO_TOOLTIP.VARIATIONS}
            >
              <InfoOutlinedIcon fontSize="small" sx={{ color: 'grey' }} />
            </Tooltip>
          </Box>
        </Grid2>

        {isEnabled &&
          items?.map((_, variationIndex) => (
            <Grid2 size={12} key={variationIndex}>
              <ProductVariation
                variationIndex={variationIndex}
                form={form}
                handlers={{ onChange, onRemove }}
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
              + Add Variation
            </Button>
          </Grid2>
        )}

        {isEnabled && (
          <Box sx={{ width: '100%' }}>
            <Grid2 size={12} sx={{ display: 'flex', gap: 2, mt: 2, mb: 4 }}>
              <PriceInput
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Price"
              />
              <TextField
                type="number"
                onChange={(e) => setStock(e.target.value)}
                value={stock}
                fullWidth
                placeholder="Stock"
              />
              <Tooltip title={PRODUCT_SAFE_INTO_TOOLTIP.APPLY_ALL}>
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
              <TypographyLabel>Variation List</TypographyLabel>
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
                Enable Variations
              </Button>
            </Grid2>

            <Grid2 size={12}>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <TypographyLabel>Product Price</TypographyLabel>
                <Tooltip
                  arrow
                  placement="top"
                  title={PRODUCT_SAFE_INTO_TOOLTIP.PRICE}
                >
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
                <TypographyLabel>Product Stock</TypographyLabel>
                <Tooltip
                  arrow
                  placement="top"
                  title={PRODUCT_SAFE_INTO_TOOLTIP.STOCK}
                >
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
