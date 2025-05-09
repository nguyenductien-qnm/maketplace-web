import React, { useEffect, useState } from 'react'
import { Box, Typography } from '@mui/material'
import { blue, grey } from '@mui/material/colors'

const Variation = ({ variation, productSKU, handleSelectProduct }) => {
  const [indexSelected, setIndexSelected] = useState([])

  const handleSelectItem = (optionIndex, valueIndex) => {
    setIndexSelected((prev) => {
      let newSelected = [...prev]

      if (newSelected[optionIndex] === valueIndex) {
        delete newSelected[optionIndex]
      } else {
        newSelected[optionIndex] = valueIndex

        for (let i = optionIndex + 1; i < variation.length; i++) {
          if (
            !productSKU.some(
              (sku) =>
                sku.sku_tier_indices
                  .slice(0, i)
                  .every((val, idx) => val === newSelected[idx]) &&
                sku.sku_tier_indices[i] === newSelected[i]
            )
          ) {
            newSelected[i] = undefined
          }
        }
      }

      return newSelected
    })
  }

  useEffect(() => {
    const allValuesFilled = indexSelected.every((val) => val !== undefined)
    if (allValuesFilled && indexSelected.length === variation?.length) {
      const selectedSKU = productSKU.find((sku) =>
        sku.sku_tier_indices.every((val, idx) => val === indexSelected[idx])
      )
      handleSelectProduct(selectedSKU)
    } else {
      handleSelectProduct(null)
    }
  }, [indexSelected])

  return (
    <>
      {variation?.length > 0 && productSKU?.length > 0 && (
        <Box sx={{ marginTop: '20px' }}>
          {variation.map((item, index) => (
            <Box sx={{ display: 'flex', marginBottom: '10px' }} key={index}>
              <Typography
                variant="body2"
                sx={{
                  padding: '7px 15px 0 0',
                  color: grey[600],
                  width: '95px'
                }}
              >
                {variation[index].name}
              </Typography>
              <Box key={index}>
                <Box>
                  {item.options.map((value, indexValue) => {
                    const isDisabled =
                      index > 0 &&
                      indexSelected[index - 1] !== undefined &&
                      !productSKU.some(
                        (sku) =>
                          sku.sku_tier_indices
                            .slice(0, index)
                            .every((val, idx) => val === indexSelected[idx]) &&
                          sku.sku_tier_indices[index] === indexValue
                      )

                    return (
                      <Box
                        key={indexValue}
                        sx={{
                          display: 'inline-block',
                          mx: '5px',
                          pointerEvents: isDisabled ? 'none' : 'auto',
                          marginBottom: '10px'
                        }}
                        onClick={() =>
                          !isDisabled && handleSelectItem(index, indexValue)
                        }
                      >
                        <Typography
                          variant="body2"
                          sx={{
                            border: '1px solid',
                            borderColor:
                              indexSelected[index] === indexValue
                                ? blue[600]
                                : grey[600],
                            borderWidth:
                              indexSelected[index] === indexValue
                                ? '2px'
                                : '1px',
                            padding: '7px',
                            borderRadius: '5px',
                            color:
                              indexSelected[index] === indexValue
                                ? blue[600]
                                : grey[600],
                            backgroundColor: isDisabled ? grey[200] : 'white',
                            '&:hover': {
                              cursor: isDisabled ? 'not-allowed' : 'pointer'
                            }
                          }}
                        >
                          {value}
                        </Typography>
                      </Box>
                    )
                  })}
                </Box>
              </Box>
            </Box>
          ))}
        </Box>
      )}
    </>
  )
}

export default Variation
