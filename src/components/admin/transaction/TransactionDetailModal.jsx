import Divider from '@mui/material/Divider'
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

function TransactionDetailModal({ open, onClose, transaction, type }) {
  const isShop = type === 'VENDOR'
  const detail = transaction?.withdrawal_details
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>Transaction Detail</DialogTitle>
      <DialogContent>
        {!transaction && (
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

        {transaction && (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Box flex={1}>
                <TypographyLabel>
                  {isShop ? 'Shop name' : 'User name'}
                </TypographyLabel>
                <ReadOnlyTextField
                  value={
                    isShop
                      ? transaction?.shop_id?.shop_name
                      : transaction?.user_id?.user_name
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
                      ? transaction?.shop_id?.shop_email
                      : transaction?.user_id?.user_email
                  }
                />
              </Box>
            </Box>
            <Divider />
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Box flex={1}>
                <TypographyLabel>Amount</TypographyLabel>
                <ReadOnlyTextField
                  value={formatCurrency(transaction?.amount)}
                />
              </Box>

              <Box flex={1}>
                <TypographyLabel>Type</TypographyLabel>
                <ReadOnlyTextField
                  value={capitalizeFirstLetter(transaction?.type)}
                />
              </Box>

              <Box flex={1}>
                <TypographyLabel>Status</TypographyLabel>
                <ReadOnlyTextField
                  value={capitalizeFirstLetter(transaction?.status)}
                />
              </Box>
            </Box>

            <Box sx={{ display: 'flex', gap: 2 }}>
              <Box flex={1}>
                <TypographyLabel>Created at</TypographyLabel>
                <ReadOnlyTextField value={transaction?.createdAt} />
              </Box>

              <Box flex={1}>
                <TypographyLabel>Processed at</TypographyLabel>
                <ReadOnlyTextField value={transaction?.processed_at} />
              </Box>
            </Box>

            <Divider />

            <Box sx={{ display: 'flex', gap: 2 }}>
              <Box flex={2}>
                <TypographyLabel>Paypal email</TypographyLabel>
                <ReadOnlyTextField value={detail?.email || 'NAN'} />
              </Box>

              <Box flex={1}>
                <TypographyLabel>Payout batch ID</TypographyLabel>
                <ReadOnlyTextField value={detail?.payout_batch_id || 'NAN'} />
              </Box>
            </Box>

            <Box flex={1}>
              <TypographyLabel>Transaction ID of paypal</TypographyLabel>
              <ReadOnlyTextField
                value={
                  (isShop
                    ? detail?.transaction_id
                    : transaction?.transaction_id) || 'NAN'
                }
              />
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
export default TransactionDetailModal
