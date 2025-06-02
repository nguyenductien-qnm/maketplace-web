import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import Divider from '@mui/material/Divider'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import MenuItem from '@mui/material/MenuItem'
import OutlinedInput from '@mui/material/OutlinedInput'
import Select from '@mui/material/Select'
import Switch from '@mui/material/Switch'
import Typography from '@mui/material/Typography'

import { Controller, FormProvider } from 'react-hook-form'
import { toast } from 'react-toastify'
import { useLocation, useParams } from 'react-router-dom'

import ProductFormSkeleton from '~/components/vendor/VendorProductFrom/ProductFormSkeleton'
import SKUForm from '~/components/vendor/VendorProductFrom/SKUForm'
import SPUForm from '~/components/vendor/VendorProductFrom/SPUForm'
import TypographyLabel from '~/components/common/TypographyLabel'
import { useVendorProductForm } from '~/hooks/vendor/product.hook'

const variations = ['Type', 'Size', 'Color', 'Material']
function VendorProductForm() {
  const { pathname } = useLocation()
  const { _id } = useParams()

  const { methods, loading, isMultiVariation, productSKU, onSubmit } =
    useVendorProductForm(_id, pathname)

  return (
    <FormProvider {...methods}>
      <form onSubmit={onSubmit}>
        {pathname === '/vendor/create-product' && (
          <Typography sx={{ fontSize: '30px', fontWeight: '600' }}>
            Create Product
          </Typography>
        )}

        {pathname === '/vendor/update-product' && (
          <Typography sx={{ fontSize: '30px', fontWeight: '600' }}>
            Update Product
          </Typography>
        )}

        <Divider sx={{ mt: '10px', mb: '30px' }} />
        {loading && <ProductFormSkeleton />}
        {!loading && (
          <Box>
            <SPUForm />

            <FormControlLabel
              control={
                <Switch
                  checked={isMultiVariation}
                  onChange={() =>
                    methods.setValue('isMultiVariation', !isMultiVariation)
                  }
                  color="primary"
                />
              }
              label="Multi variation"
            />

            {isMultiVariation && (
              <Box sx={{ marginTop: '20px' }}>
                <TypographyLabel>Product variations</TypographyLabel>
                <FormControl fullWidth>
                  <Controller
                    name="product_classifications"
                    control={methods.control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        size="small"
                        multiple
                        value={variationSelected}
                        onChange={(event) =>
                          methods.setValue(
                            'product_classifications',
                            event.target.value
                          )
                        }
                        input={<OutlinedInput id="select-multiple-chip" />}
                        renderValue={(selected) => (
                          <Box
                            sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}
                          >
                            {selected.map((value) => (
                              <Chip key={value} label={value} />
                            ))}
                          </Box>
                        )}
                      >
                        {variations.map((variation) => (
                          <MenuItem key={variation} value={variation}>
                            {variation}
                          </MenuItem>
                        ))}
                      </Select>
                    )}
                  />
                </FormControl>
              </Box>
            )}

            {productSKU.length > 0 && <SKUForm />}

            {isMultiVariation && (
              <Button
                variant="contained"
                color="primary"
                sx={{ mt: 2 }}
                onClick={() => {
                  const currentVariations =
                    methods.getValues('product_classifications') || []

                  if (currentVariations.length === 0) {
                    toast.error('Please select variation first')
                    return
                  }

                  let newProductSKU = { price: '', stock: '' }

                  currentVariations.forEach((variation) => {
                    newProductSKU[variation] = ''
                  })

                  const currentProductSKU = methods.getValues('product_sku') || []
                  methods.setValue('product_sku', [
                    ...currentProductSKU,
                    newProductSKU
                  ])
                }}
              >
                + Add Variation
              </Button>
            )}

            <Box sx={{ mt: '20px' }}>
              <Button
                className="btn-shop-create-product"
                type="submit"
                variant="contained"
                sx={{ width: '100%' }}
              >
                Submit
              </Button>
            </Box>
          </Box>
        )}
      </form>
    </FormProvider>
  )
}
export default VendorProductForm
