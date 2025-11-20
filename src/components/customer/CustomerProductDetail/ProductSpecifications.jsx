import { Grid2, Typography } from '@mui/material'
import React from 'react'
import TypographyTitle from '~/components/common/TypographyTitle'

function ProductSpecifications({ specifications }) {
  return (
    <Grid2 container rowSpacing={5}>
      <Grid2 size={12}>
        <TypographyTitle>Product Specifications</TypographyTitle>
      </Grid2>
      <Grid2 size={12}>
        <Grid2 container rowSpacing={4}>
          {specifications?.map((spec) => (
            <React.Fragment key={spec.key}>
              <Grid2 size={3}>
                <Typography color="grey">{spec.key}</Typography>
              </Grid2>
              <Grid2 size={9}>
                <Typography>{spec.value}</Typography>
              </Grid2>
            </React.Fragment>
          ))}
        </Grid2>
      </Grid2>
    </Grid2>
  )
}
export default ProductSpecifications
