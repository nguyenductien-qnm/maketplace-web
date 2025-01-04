import * as React from 'react'
import Box from '@mui/material/Box'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import TypographyLabel from '~/components/user/Common/TypographyLabel'
import { useDispatch, useSelector } from 'react-redux'
import { handleChangeProductStatus } from '~/redux/formProduct.slice'
import SkeletonLoaderInput from '~/components/SkeletonLoaderInput'

export default function InputStatusProduct({ page }) {
  const product_status = useSelector(
    (state) => state.formProduct.product_status
  )

  const dispatch = useDispatch()

  const input = (
    <Box>
      <TypographyLabel>Product Status</TypographyLabel>
      <Select
        value={product_status}
        onChange={(e) => {
          dispatch(handleChangeProductStatus(e.target?.value))
        }}
        fullWidth
        size="small"
      >
        <MenuItem value={'Draft'}>Draft</MenuItem>
        <MenuItem value={'Publish'}>Publish</MenuItem>
      </Select>
    </Box>
  )

  return (
    <Box>
      {page == 'create-product' ? (
        input
      ) : product_status ? (
        input
      ) : (
        <SkeletonLoaderInput />
      )}
    </Box>
  )
}
