import Box from '@mui/material/Box'
import UploadButton from '~/components/common/UploadButton'
import { Controller } from 'react-hook-form'

function InputUploadButton({ control }) {
  return (
    <Box sx={{ display: 'flex', gap: '10px' }}>
      <Controller
        name="shop_avatar"
        control={control}
        render={({ field }) => (
          <UploadButton
            label="Upload Avatar"
            inputProps={{
              onChange: (e) => {
                const file = e.target.files?.[0]
                if (!file || file.length === 0) return
                field.onChange(file)
              }
            }}
          />
        )}
      />

      <Controller
        name="shop_banner"
        control={control}
        render={({ field }) => (
          <UploadButton
            label="Upload Banner"
            inputProps={{
              onChange: (e) => {
                const file = e.target.files?.[0]
                if (!file || file.length === 0) return
                field.onChange(file)
              }
            }}
          />
        )}
      />
    </Box>
  )
}

export default InputUploadButton
