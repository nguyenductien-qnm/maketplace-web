import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Switch from '@mui/material/Switch'
import TextField from '@mui/material/TextField'
import TypographyLabel from '~/components/common/TypographyLabel'
import TypographyTitle from '~/components/common/TypographyTitle'
import { styled } from '@mui/material/styles'
import { grey } from '@mui/material/colors'
import { Controller } from 'react-hook-form'
import {
  FIELD_REQUIRED_MESSAGE,
  NUMBER_RULE,
  NUMBER_RULE_MESSAGE
} from '~/utils/validators'
import { Typography } from '@mui/material'
import InfoIcon from '@mui/icons-material/Info'

const FlexBox = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: 2
})

function AlertsForm({
  register,
  control,
  errors,
  handleOpenDialog,
  handleFormSubmit
}) {
  const AlertItem = ({ label, name, flex = 1 }) => {
    return (
      <FlexBox flex={flex}>
        <TypographyLabel>{label}</TypographyLabel>
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <Switch
              {...field}
              checked={field.value}
              onChange={(e) => {
                field.onChange(e.target.checked)
              }}
            />
          )}
        />
      </FlexBox>
    )
  }

  return (
    <form onSubmit={handleFormSubmit}>
      <Box
        sx={{
          border: '2px dashed',
          borderColor: grey[400],
          borderRadius: 1,
          p: 4,
        }}
      >
        <TypographyTitle>Alerts</TypographyTitle>

        <FlexBox sx={{ mt: 2 }}>
          <AlertItem
            label="Alert Low Stock"
            flex={1}
            name="alert_low_stock_enabled"
          />
          <Box flex={3} sx={{ display: 'flex', alignItems: 'center' }}>
            <TypographyLabel>Threshold</TypographyLabel>
            <TextField
              size="small"
              sx={{ ml: 2 }}
              {...register('alert_low_stock_threshold', {
                required: FIELD_REQUIRED_MESSAGE,
                pattern: {
                  value: NUMBER_RULE,
                  message: NUMBER_RULE_MESSAGE
                }
              })}
              error={!!errors?.alert_low_stock_threshold?.message}
            />
          </Box>
        </FlexBox>

        <FlexBox sx={{ mt: 3 }}>
          <AlertItem label="Alert New Order" name="alert_new_order" />
          <AlertItem label="Alert Order Cancel" name="alert_order_cancelled" />
          <AlertItem
            label="Alert Order Delivered"
            name="alert_order_delivered"
          />
          <AlertItem label="Alert New Review" name="alert_new_review" />
        </FlexBox>

        <Box
          onClick={() => handleOpenDialog('ALERT')}
          sx={{
            mt: 3,
            display: 'flex',
            gap: 1,
            alignItems: 'center',
            cursor: 'pointer',
            justifyContent: 'end'
          }}
        >
          <InfoIcon sx={{ fontSize: '16px' }} />
          <Typography
            variant="subtitle2"
            sx={{ ':hover': { textDecoration: 'underLine' } }}
          >
            Learn more about shop alerts
          </Typography>
        </Box>

        <Button
          className="btn-action-setting-owner"
          sx={{ mt: 3 }}
          variant="contained"
          fullWidth
          type="submit"
        >
          Submit
        </Button>
      </Box>
    </form>
  )
}

export default AlertsForm
