import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Typography
} from '@mui/material'
import { useState } from 'react'

import paypalIconSvg from '~/assets/paypal-svgrepo-com.svg'
import AccountModal from './AccountModal'
import { red } from '@mui/material/colors'

function PaymentMethod({
  accounts,
  handleAddAccount,
  handleSetDefault,
  handleDelete
}) {
  const [openModal, setOpenModal] = useState(false)

  const customHandleAddAccount = async (data) => {
    const res = await handleAddAccount(data)
    if (res.status === 200) setOpenModal(false)
  }

  const PaypalCard = ({ account }) => (
    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <img src={paypalIconSvg} alt="PayPal Icon" width={50} height={50} />
        <Typography variant="body1">PayPal</Typography>
        <Typography variant="body2" color="text.secondary">
          {account.account}
        </Typography>
      </Box>
      <Box>
        {!account.is_default && (
          <Button
            className="btn-shop-set-default-payment-method"
            onClick={() => handleSetDefault(account)}
          >
            Set default
          </Button>
        )}
        <Button
          className="btn-shop-delete-payment-method"
          variant="contained"
          sx={{ backgroundColor: red[600], ml: '10px' }}
          onClick={() => handleDelete(account)}
        >
          Delete
        </Button>
      </Box>
    </Box>
  )

  return (
    <Box>
      <Card sx={{ p: '20px' }}>
        <CardHeader
          title="Payment Methods"
          action={
            <Button
              variant="contained"
              color="primary"
              onClick={() => setOpenModal(true)}
            >
              Add Account
            </Button>
          }
        />
        <Divider />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <CardContent sx={{ width: '100%' }}>
            {accounts?.length === 0 && (
              <Alert variant="filled" severity="error">
                You don’t have any withdrawal accounts yet. Please add a payment
                method to withdraw funds.
              </Alert>
            )}
            {accounts?.length > 0 &&
              accounts.map((account, index) => (
                <PaypalCard key={index} account={account} />
              ))}
          </CardContent>
        </Box>
      </Card>
      <AccountModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        handleAddAccount={customHandleAddAccount}
      />
    </Box>
  )
}
export default PaymentMethod
