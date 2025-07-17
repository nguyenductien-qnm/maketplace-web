import { Divider } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import CircularIndeterminate from '~/components/common/CircularIndeterminate'
import ReadOnlyTextField from '~/components/common/ReadOnlyTextField'
import TypographyLabel from '~/components/common/TypographyLabel'
import capitalizeFirstLetter from '~/utils/capitalizeFirstLetter'
import formatCurrency from '~/utils/formatCurrency'

function WithdrawRequestDetailModal({ open, onClose, withdrawRequest }) {
  const isShop = withdrawRequest?.type === 'shop'
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>Withdraw Request Detail</DialogTitle>
      <DialogContent>
        {!withdrawRequest && (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              mt: 5
            }}
          >
            <CircularIndeterminate />
          </Box>
        )}

        {withdrawRequest && (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Box flex={1}>
                <TypographyLabel>
                  {isShop ? 'Shop name' : 'User name'}
                </TypographyLabel>
                <ReadOnlyTextField
                  value={
                    isShop
                      ? withdrawRequest?.shop?.shop_name
                      : withdrawRequest?.user?.user_name
                  }
                />
              </Box>

              <Box flex={1}>
                <TypographyLabel>
                  {isShop ? 'Shop email' : 'User email'}
                </TypographyLabel>
                <ReadOnlyTextField
                  value={
                    isShop
                      ? withdrawRequest?.shop?.shop_email
                      : withdrawRequest?.user?.user_email
                  }
                />
              </Box>

              <Box flex={1}>
                <TypographyLabel>Balance account</TypographyLabel>
                <ReadOnlyTextField
                  value={formatCurrency(
                    isShop
                      ? withdrawRequest?.wallet?.shop_balance
                      : withdrawRequest?.wallet?.user_balance
                  )}
                />
              </Box>
            </Box>
            <Divider />
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Box flex={2}>
                <TypographyLabel>Paypal email</TypographyLabel>
                <ReadOnlyTextField value={withdrawRequest?.paypal_email} />
              </Box>

              <Box flex={1}>
                <TypographyLabel>Method</TypographyLabel>
                <ReadOnlyTextField
                  value={capitalizeFirstLetter(withdrawRequest?.payment_method)}
                />
              </Box>

              <Box flex={1}>
                <TypographyLabel>Amount</TypographyLabel>
                <ReadOnlyTextField
                  value={formatCurrency(withdrawRequest?.amount)}
                />
              </Box>
            </Box>

            <Box sx={{ display: 'flex', gap: 2 }}>
              <Box flex={1}>
                <TypographyLabel>Status</TypographyLabel>
                <ReadOnlyTextField
                  value={capitalizeFirstLetter(withdrawRequest?.status)}
                />
              </Box>

              <Box flex={1}>
                <TypographyLabel>Created at</TypographyLabel>
                <ReadOnlyTextField value={withdrawRequest?.createdAt} />
              </Box>

              <Box flex={1}>
                <TypographyLabel>Processed at</TypographyLabel>
                <ReadOnlyTextField
                  value={withdrawRequest?.processed_at || 'NAN'}
                />
              </Box>
            </Box>

            <Divider />

            <Box sx={{ display: 'flex', gap: 2 }}>
              <Box flex={1}>
                <TypographyLabel>Transaction ID</TypographyLabel>
                <ReadOnlyTextField
                  value={withdrawRequest?.transaction_id || 'NAN'}
                />
              </Box>

              <Box flex={1}>
                <TypographyLabel>Transaction ID of paypal</TypographyLabel>
                <ReadOnlyTextField
                  value={
                    withdrawRequest?.transaction?.withdrawal_details
                      ?.transaction_id || 'NAN'
                  }
                />
              </Box>
            </Box>
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  )
}
export default WithdrawRequestDetailModal
