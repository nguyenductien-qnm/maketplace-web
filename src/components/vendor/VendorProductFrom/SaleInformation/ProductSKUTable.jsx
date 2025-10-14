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
import { FIELD_REQUIRED_MESSAGE } from '~/utils/validators'

function ProductSKUTable({ form }) {
  const renderPriceInput = (index) => (
    <Controller
      name={`product_skus.${index}.price`}
      control={form.control}
      rules={{ required: FIELD_REQUIRED_MESSAGE }}
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
      {...register(`product_skus.${index}.stock`)}
    />
  )

  const { productVariations, productSKUs } = useProductSKUsTable({ form })
  const { register } = form

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
                  <TableCell>{renderPriceInput(index)}</TableCell>
                  <TableCell>{renderStockInput(index)}</TableCell>
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
