import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import TypographyLabel from '~/components/common/TypographyLabel'
import TypographyTitle from '~/components/common/TypographyTitle'
import { grey } from '@mui/material/colors'
import { Controller } from 'react-hook-form'
import { FIELD_REQUIRED_MESSAGE } from '~/utils/validators'

function OperationForm({ control, errors, handleFormSubmit }) {
  return (
    <form onSubmit={handleFormSubmit}>
      <Box
        sx={{
          border: '2px dashed',
          borderColor: grey[400],
          borderRadius: 1,
          p: 4,
          mt: 3
        }}
      >
        <TypographyTitle>Operation</TypographyTitle>
        <Box>
          <Box sx={{ display: 'flex', mt: 3, gap: 2 }}>
            <Box flex={1}>
              <TypographyLabel>Status</TypographyLabel>
              <FormControl fullWidth error={!!errors['shop_status']}>
                <Controller
                  name="shop_status"
                  control={control}
                  rules={{ required: FIELD_REQUIRED_MESSAGE }}
                  defaultValue=""
                  render={({ field }) => (
                    <Select {...field}>
                      <MenuItem value="approved">Active</MenuItem>
                      <MenuItem value="paused">Pause</MenuItem>
                    </Select>
                  )}
                />
                {errors['shop_status'] && (
                  <FormHelperText>
                    {errors['shop_status'].message}
                  </FormHelperText>
                )}
              </FormControl>
            </Box>

            <Box flex={1}>
              <TypographyLabel>Refund type</TypographyLabel>
              <FormControl fullWidth error={!!errors['shop_refund_type']}>
                <Controller
                  name="shop_refund_type"
                  control={control}
                  rules={{ required: FIELD_REQUIRED_MESSAGE }}
                  defaultValue=""
                  render={({ field }) => (
                    <Select {...field}>
                      <MenuItem value="auto">Auto</MenuItem>
                      <MenuItem value="manual">Manual</MenuItem>
                    </Select>
                  )}
                />
                {errors['shop_refund_type'] && (
                  <FormHelperText>
                    {errors['shop_refund_type'].message}
                  </FormHelperText>
                )}
              </FormControl>
            </Box>
          </Box>
        </Box>
        <Button
          className="btn-action-setting-owner"
          type="submit"
          sx={{ mt: 5 }}
          variant="contained"
          fullWidth
        >
          Submit
        </Button>
      </Box>
    </form>
  )
}

export default OperationForm
