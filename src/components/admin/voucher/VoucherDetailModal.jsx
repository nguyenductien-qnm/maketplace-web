import Button from '@mui/material/Button'
import TypographyLabel from '~/components/common/TypographyLabel'
import Box from '@mui/material/Box'
import CircularIndeterminate from '~/components/common/CircularIndeterminate'
import capitalizeFirstLetter from '~/utils/capitalizeFirstLetter'
import Alert from '@mui/material/Alert'
import Card from '@mui/material/Card'
import Divider from '@mui/material/Divider'
import Fade from '@mui/material/Fade'
import Grid2 from '@mui/material/Grid2'
import Modal from '@mui/material/Modal'
import TypographyTitle from '~/components/common/TypographyTitle'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import ReadOnlyTextField from '~/components/common/ReadOnlyTextField'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Typography from '@mui/material/Typography'
import TableCellHeader from '~/components/common/TableCellHeader'
import ReactQuill from 'react-quill-new'
import { modalConfig, modalStyle } from '~/config/modal'
import { getVoucherStatus } from '~/utils/voucherStatus'
import 'react-quill-new/dist/quill.snow.css'

function VoucherDetailModal({ ui, data, handler }) {
  const { voucherDetail } = data
  const { loadingDetail, loadingAuditLog, loadingProducts, openDetailModal } =
    ui
  const { voucher, log, products } = voucherDetail || {}
  const {
    handleCloseModal,
    handleGetApplicableProducts,
    handleGetAuditLogDetail
  } = handler
  const voucherStatus = getVoucherStatus({
    start: voucher?.voucher_start_date,
    end: voucher?.voucher_end_date
  })

  const creator =
    voucher?.voucher_creator_role == 'admin'
      ? voucher?.admin_creator
      : voucher?.shop_creator

  const statusColor = () => {
    if (voucher.voucher_disable) return 'error'
    if (voucherStatus == 'UPCOMING') return 'info'
    if (voucherStatus == 'ONGOING') return 'success'
    if (voucherStatus == 'EXPIRED') return 'warning'
  }

  return (
    <Modal open={openDetailModal} onClose={handleCloseModal} {...modalConfig}>
      <Fade in={openDetailModal}>
        <Box sx={modalStyle(900)}>
          <Box sx={{ flexShrink: 0 }}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <TypographyTitle>Voucher Detail Information</TypographyTitle>
              <HighlightOffIcon
                color="error"
                onClick={handleCloseModal}
                sx={{ cursor: 'pointer' }}
              />
            </Box>
            <Divider sx={{ mt: 1, mb: 2 }} />
          </Box>

          <Box
            sx={{
              flex: 1,
              overflowY: 'auto'
            }}
          >
            {loadingDetail && <CircularIndeterminate height={700} />}

            {!loadingDetail && voucher && (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <Card sx={{ p: 3 }}>
                  <TypographyTitle sx={{ mb: 1 }}>Status</TypographyTitle>

                  <Alert severity={statusColor()}>
                    {voucher.voucher_disable == true ? 'BANNED' : voucherStatus}
                  </Alert>

                  {voucher.voucher_disable && !loadingAuditLog && !log && (
                    <Button
                      onClick={handleGetAuditLogDetail}
                      sx={{ mt: 2 }}
                      variant="contained"
                    >
                      View Audit Log
                    </Button>
                  )}

                  {loadingAuditLog && <CircularIndeterminate height={350} />}

                  {!loadingAuditLog && log && (
                    <Grid2 container spacing={3} sx={{ mt: 2 }}>
                      <Grid2 size={6}>
                        <TypographyLabel>Admin Name</TypographyLabel>
                        <ReadOnlyTextField value={log.admin_id.user_name} />
                      </Grid2>

                      <Grid2 size={6}>
                        <TypographyLabel>Admin Email</TypographyLabel>
                        <ReadOnlyTextField value={log.admin_id.user_email} />
                      </Grid2>

                      <Grid2 size={6}>
                        <TypographyLabel>Action Performed</TypographyLabel>
                        <ReadOnlyTextField
                          value={capitalizeFirstLetter(log.action)}
                        />
                      </Grid2>

                      <Grid2 size={6}>
                        <TypographyLabel>Action Timestamp</TypographyLabel>
                        <ReadOnlyTextField value={log.createdAt} />
                      </Grid2>

                      <Grid2 size={12}>
                        <TypographyLabel>Reason / Notes</TypographyLabel>
                        <ReactQuill
                          readOnly={true}
                          theme="snow"
                          value={log?.reason || ''}
                        />
                      </Grid2>
                    </Grid2>
                  )}
                </Card>

                <Card sx={{ p: 3 }}>
                  <TypographyTitle sx={{ mb: 3 }}>Creator</TypographyTitle>
                  <Grid2 container spacing={3} sx={{ mt: 2 }}>
                    <Grid2 size={6}>
                      <TypographyLabel>Creator Role</TypographyLabel>
                      <ReadOnlyTextField
                        value={capitalizeFirstLetter(
                          voucher.voucher_creator_role
                        )}
                      />
                    </Grid2>
                    <Grid2 size={6}>
                      <TypographyLabel>Creator Name</TypographyLabel>
                      <ReadOnlyTextField value={creator.creator_name} />
                    </Grid2>
                    <Grid2 size={6}>
                      <TypographyLabel>Creator CODE</TypographyLabel>
                      <ReadOnlyTextField value={creator.creator_code} />
                    </Grid2>
                  </Grid2>
                </Card>

                <Card sx={{ p: 3 }}>
                  <TypographyTitle sx={{ mb: 3 }}>
                    Basic Information
                  </TypographyTitle>
                  <Grid2 container spacing={3} sx={{ mt: 2 }}>
                    <Grid2 size={12}>
                      <TypographyLabel>Voucher Name</TypographyLabel>
                      <ReadOnlyTextField value={voucher.voucher_name} />
                    </Grid2>
                    <Grid2 size={12}>
                      <TypographyLabel>Voucher CODE</TypographyLabel>
                      <ReadOnlyTextField value={voucher.voucher_code} />
                    </Grid2>

                    <Grid2 size={6}>
                      <TypographyLabel>
                        Voucher Start Date & Time
                      </TypographyLabel>
                      <ReadOnlyTextField value={voucher.voucher_start_date} />
                    </Grid2>

                    <Grid2 size={6}>
                      <TypographyLabel>Voucher End Date & Time</TypographyLabel>
                      <ReadOnlyTextField value={voucher.voucher_end_date} />
                    </Grid2>
                  </Grid2>
                </Card>

                <Card sx={{ p: 3 }}>
                  <TypographyTitle sx={{ mb: 3 }}>
                    Discount Setting
                  </TypographyTitle>
                  <Grid2 container spacing={3} sx={{ mt: 2 }}>
                    <Grid2 size={6}>
                      <TypographyLabel>Voucher Type</TypographyLabel>
                      <ReadOnlyTextField
                        value={capitalizeFirstLetter(voucher.voucher_type)}
                      />
                    </Grid2>
                    <Grid2 size={6}>
                      <TypographyLabel>Voucher Value</TypographyLabel>
                      <ReadOnlyTextField value={voucher.voucher_value} />
                    </Grid2>

                    <Grid2 size={6}>
                      <TypographyLabel>Max Discount Amount</TypographyLabel>
                      <ReadOnlyTextField
                        value={voucher.voucher_max_discount_amount}
                      />
                    </Grid2>

                    <Grid2 size={6}>
                      <TypographyLabel>Voucher Quantity</TypographyLabel>
                      <ReadOnlyTextField value={voucher.voucher_quantity} />
                    </Grid2>

                    <Grid2 size={6}>
                      <TypographyLabel>
                        Max Distribution per Buyer
                      </TypographyLabel>
                      <ReadOnlyTextField
                        value={voucher.voucher_max_distribution_per_buyer}
                      />
                    </Grid2>

                    <Grid2 size={6}>
                      <TypographyLabel>Minimum Order Value</TypographyLabel>
                      <ReadOnlyTextField
                        value={voucher.voucher_min_order_value}
                      />
                    </Grid2>
                  </Grid2>
                </Card>

                <Card sx={{ p: 3 }}>
                  <TypographyTitle sx={{ mb: 3 }}>
                    Applicable & Visibility
                  </TypographyTitle>
                  <Grid2 container spacing={3} sx={{ mt: 2 }}>
                    <Grid2 size={12}>
                      <TypographyLabel>Voucher Visibility</TypographyLabel>
                      <ReadOnlyTextField
                        value={capitalizeFirstLetter(
                          voucher.voucher_visibility
                        )}
                      />
                    </Grid2>
                    <Grid2 size={12}>
                      <TypographyLabel>Voucher Apply</TypographyLabel>
                      <ReadOnlyTextField
                        value={capitalizeFirstLetter(voucher.voucher_apply)}
                      />
                      {voucher.voucher_apply == 'specific' &&
                        !loadingProducts &&
                        !products && (
                          <Button
                            onClick={handleGetApplicableProducts}
                            sx={{ mt: 2 }}
                            variant="contained"
                          >
                            View Products
                          </Button>
                        )}

                      {loadingProducts && (
                        <CircularIndeterminate height={200} />
                      )}
                    </Grid2>
                    {products?.length > 0 && (
                      <Grid2 size={12}>
                        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                          Products
                        </Typography>
                        <TableContainer
                          sx={{ maxHeight: 516, overflowY: 'auto', mt: 2 }}
                        >
                          <Table stickyHeader sx={{ width: '100%' }}>
                            <TableHead>
                              <TableRow>
                                <TableCellHeader>Image</TableCellHeader>
                                <TableCellHeader>Name</TableCellHeader>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {products.map((product) => (
                                <TableRow key={product._id}>
                                  <TableCell sx={{ width: '100px' }}>
                                    <img
                                      src={product.product_image}
                                      style={{ width: '50px', height: '50px' }}
                                    />
                                  </TableCell>
                                  <TableCell sx={{ width: '400px' }}>
                                    <Typography>
                                      {product.product_name}
                                    </Typography>
                                    <Typography
                                      variant="caption"
                                      sx={{ color: 'grey' }}
                                    >
                                      CODE: {product?.product_code}
                                    </Typography>
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

                <Card sx={{ p: 3 }}>
                  <TypographyTitle>Performance</TypographyTitle>
                  <Grid2 container spacing={2} sx={{ mt: 2 }}>
                    <Grid2 size={12}>
                      <TypographyLabel>Voucher Available</TypographyLabel>
                      <ReadOnlyTextField value={voucher.voucher_available} />
                    </Grid2>
                    <Grid2 size={6}>
                      <TypographyLabel>Voucher Used Count</TypographyLabel>
                      <ReadOnlyTextField value={voucher?.voucher_used_count} />
                    </Grid2>

                    <Grid2 size={6}>
                      <TypographyLabel>Voucher Reserved Count</TypographyLabel>
                      <ReadOnlyTextField
                        value={voucher?.voucher_reserved_count}
                      />
                    </Grid2>

                    <Grid2 size={6}>
                      <TypographyLabel>Used Rate</TypographyLabel>
                      <ReadOnlyTextField value={voucher?.voucher_used_rate} />
                    </Grid2>

                    <Grid2 size={6}>
                      <TypographyLabel>Reserved Rate</TypographyLabel>
                      <ReadOnlyTextField
                        value={voucher?.voucher_reserved_rate}
                      />
                    </Grid2>
                  </Grid2>
                </Card>

                <Card sx={{ p: 3 }}>
                  <TypographyTitle>Metadata</TypographyTitle>
                  <Grid2 container spacing={2} sx={{ mt: 2 }}>
                    <Grid2 size={6}>
                      <TypographyLabel>Created At</TypographyLabel>
                      <ReadOnlyTextField value={voucher?.createdAt} />
                    </Grid2>

                    <Grid2 size={6}>
                      <TypographyLabel>Updated At</TypographyLabel>
                      <ReadOnlyTextField value={voucher?.updatedAt} />
                    </Grid2>
                  </Grid2>
                </Card>
              </Box>
            )}
          </Box>

          <Box
            sx={{
              pt: '24px',
              borderTop: '1px solid #e0e0e0',
              display: 'flex',
              justifyContent: 'flex-end',
              flexShrink: 0
            }}
          >
            <Button
              color="secondary"
              variant="outlined"
              onClick={handleCloseModal}
            >
              Close
            </Button>
          </Box>
        </Box>
      </Fade>
    </Modal>
  )
}

export default VoucherDetailModal
