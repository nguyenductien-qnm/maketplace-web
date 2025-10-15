import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TextField from '@mui/material/TextField'
import { grey } from '@mui/material/colors'
import { Controller } from 'react-hook-form'
import { NumericFormat } from 'react-number-format'
import { useProductSKUsTable } from '~/hooks/vendor/product/productSKUsTable'
import {
  FIELD_REQUIRED_MESSAGE,
  PRODUCT_PRICE_MAX,
  PRODUCT_PRICE_MESSAGE,
  PRODUCT_STOCK_MAX,
  PRODUCT_STOCK_MESSAGE,
  PRODUCT_STOCK_MIN
} from '~/utils/validators'

function ProductSKUTable({ form }) {
  const renderPriceInput = (index) => (
    <Controller
      name={`product_skus.${index}.price`}
      control={form.control}
      rules={{
        required: FIELD_REQUIRED_MESSAGE,
        validate: {
          positive: (value) => {
            const numValue = parseFloat(String(value).replace(/[$,]/g, ''))
            return numValue > 0 || PRODUCT_PRICE_MESSAGE
          },
          maxPrice: (value) => {
            const numValue = parseFloat(String(value).replace(/[$,]/g, ''))
            return numValue <= PRODUCT_PRICE_MAX || PRODUCT_PRICE_MESSAGE
          }
        }
      }}
      render={({ field: { ref, ...field } }) => (
        <NumericFormat
          placeholder="Price"
          size="small"
          fullWidth
          {...field}
          allowNegative={false}
          prefix="$"
          decimalScale={2}
          fixedDecimalScale
          thousandSeparator
          customInput={TextField}
          error={!!errors.product_skus?.[index]?.price}
          helperText={errors.product_skus?.[index]?.price?.message}
          onValueChange={(values) => {
            field.onChange(values.value || '')
          }}
        />
      )}
    />
  )

  const renderStockInput = (index) => (
    <TextField
      type="number"
      size="small"
      fullWidth
      placeholder="Stock"
      {...register(`product_skus.${index}.stock`, {
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
      error={!!errors.product_skus?.[index]?.stock}
      helperText={errors.product_skus?.[index]?.stock?.message}
    />
  )

  const { productVariations, productSKUs } = useProductSKUsTable({ form })
  const { register, errors } = form

  return (
    <>
      <TableContainer>
        <Table sx={{ borderCollapse: 'collapse !important' }}>
          <TableHead sx={{ backgroundColor: grey[100] }}>
            <TableRow>
              {productVariations?.map((variation, index) => (
                <TableCell key={index}>
                  {variation.name || `Variation ${index + 1}`}
                </TableCell>
              ))}
              <TableCell>Price</TableCell>
              <TableCell>Stock</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {productSKUs.map((sku, index) => {
              const [idx1, idx2] = sku.sku_tier_indices
              const option1 = productVariations[0]?.options[idx1]
              const option2 = productVariations[1]?.options[idx2]

              const isFirstRowOfOption1 =
                index === 0 ||
                productSKUs[index - 1].sku_tier_indices[0] !== idx1

              const rowSpanCount = productSKUs.filter(
                (s) => s.sku_tier_indices[0] === idx1
              ).length

              return (
                <TableRow key={index}>
                  {isFirstRowOfOption1 && (
                    <TableCell rowSpan={rowSpanCount}>
                      {option1?.value}
                    </TableCell>
                  )}
                  {option2 && <TableCell>{option2.value}</TableCell>}
                  <TableCell
                    style={{
                      verticalAlign: 'top',
                      minWidth: '300px',
                      width: '350px'
                    }}
                  >
                    {renderPriceInput(index)}
                  </TableCell>
                  <TableCell
                    style={{
                      verticalAlign: 'top',
                      minWidth: '300px',
                      width: '350px'
                    }}
                  >
                    {renderStockInput(index)}
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}
export default ProductSKUTable
