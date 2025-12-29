import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import Grid2 from '@mui/material/Grid2'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Typography from '@mui/material/Typography'
import TypographyLabel from '~/components/common/TypographyLabel'
import AddIcon from '@mui/icons-material/Add'
import TypographyTitle from '~/components/common/TypographyTitle'
import TableCellHeader from '~/components/common/TableCellHeader'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'
import { Controller } from 'react-hook-form'
import { FIELD_REQUIRED_MESSAGE } from '~/utils/validators'
import FieldErrorAlert from '~/components/common/FieldErrorAlert'
import { VOUCHER_APPLICABLE } from '../../constants/voucherForm.constants'

function VoucherApplicable({ form, data, handler, ui }) {
  const { handleOpenModal, handleRemoveProduct } = handler
  const {
    watch,
    control,
    formState: { errors }
  } = form
  const { selectedProducts } = data
  const { isUpdate, voucherStatus } = ui
  const { LABELS } = VOUCHER_APPLICABLE

  const voucherApply = watch('voucher_apply')

  return (
    <Card sx={{ p: 5 }}>
      <TypographyTitle sx={{ mb: 3 }}>{LABELS.TITLE}</TypographyTitle>
      <Grid2 container rowSpacing={3} columnSpacing={2} sx={{ mt: 2 }}>
        <Grid2 size={12}>
          <TypographyLabel>{LABELS.VOUCHER_VISIBILITY}</TypographyLabel>
          <Controller
            name="voucher_visibility"
            control={control}
            rules={{ required: FIELD_REQUIRED_MESSAGE }}
            render={({ field }) => (
              <Select
                disabled={isUpdate && voucherStatus === 'EXPIRED'}
                fullWidth
                {...field}
                error={!!errors['voucher_visibility']}
                value={field.value ?? 'public'}
              >
                <MenuItem value="public">Public</MenuItem>
                <MenuItem value="private">Private</MenuItem>
              </Select>
            )}
          />
        </Grid2>
        <Grid2 size={12}>
          <TypographyLabel>{LABELS.VOUCHER_APPLY}</TypographyLabel>
          <Controller
            name="voucher_apply"
            control={control}
            rules={{ required: FIELD_REQUIRED_MESSAGE }}
            render={({ field }) => (
              <Select
                disabled={
                  isUpdate &&
                  (voucherStatus === 'EXPIRED' || voucherStatus === 'ONGOING')
                }
                fullWidth
                {...field}
                error={!!errors['voucher_apply']}
                value={field.value || 'all'}
              >
                <MenuItem value="all">All Product</MenuItem>
                <MenuItem value="specific">Specific Product</MenuItem>
              </Select>
            )}
          />
        </Grid2>

        {voucherApply === 'specific' && (
          <Grid2 size={12}>
            <Button
              onClick={handleOpenModal}
              variant="outlined"
              sx={{ width: '200px', height: '50px' }}
            >
              <AddIcon />
              Add product
            </Button>
          </Grid2>
        )}

        <Grid2 size={12}>
          <FieldErrorAlert errors={errors} fieldName="voucher_product_ids" />
        </Grid2>

        {selectedProducts.length > 0 && (
          <Grid2 size={12} sx={{ mt: 2 }}>
            <TypographyLabel
              sx={{ mb: 2 }}
            >{`Selected Products: ${selectedProducts?.length}`}</TypographyLabel>
            <TableContainer sx={{ maxHeight: 516, overflowY: 'auto' }}>
              <Table stickyHeader sx={{ width: '100%' }}>
                <TableHead>
                  <TableRow>
                    <TableCellHeader>Image</TableCellHeader>
                    <TableCellHeader>Name</TableCellHeader>
                    <TableCellHeader>Action</TableCellHeader>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {selectedProducts?.map((product) => (
                    <TableRow key={product._id}>
                      <TableCell sx={{ width: '100px' }}>
                        <img
                          src={product.product_image}
                          style={{ width: '50px', height: '50px' }}
                          alt={product.product_name}
                        />
                      </TableCell>
                      <TableCell sx={{ width: '400px' }}>
                        <Typography>{product.product_name}</Typography>
                        <Typography variant="caption" sx={{ color: 'grey' }}>
                          CODE: {product?.product_code}
                        </Typography>
                      </TableCell>
                      <TableCell
                        sx={{
                          width: '100px',
                          '&:hover': {
                            cursor: 'pointer',
                            color: 'red'
                          }
                        }}
                      >
                        <DeleteOutlinedIcon
                          onClick={() => handleRemoveProduct(product._id)}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid2>
        )}
      </Grid2>
    </Card>
  )
}
export default VoucherApplicable
