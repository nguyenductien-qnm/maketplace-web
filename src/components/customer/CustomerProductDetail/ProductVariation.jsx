import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Grid2 from '@mui/material/Grid2'
import { blue, grey } from '@mui/material/colors'

const Variation = ({ variation, productSKU, handler, ui }) => {
  const { handleSelectItem } = handler
  const { indexSelected } = ui

  return (
    <>
      {variation?.length > 0 && productSKU?.length > 0 && (
        <Box sx={{ marginTop: '20px' }}>
          {variation.map((item, index) => (
            <Grid2 key={index} container sx={{ mt: 2 }}>
              <Grid2 size={2}>
                <Typography
                  sx={{
                    padding: '7px 15px 0 0',
                    color: grey[600],
                    width: '95px'
                  }}
                >
                  {variation[index].name}
                </Typography>
              </Grid2>
              <Grid2 size={10}>
                <Box key={index}>
                  <Box>
                    {item.options.map((value, indexValue) => {
                      const isDisabled =
                        index > 0 &&
                        indexSelected?.[index - 1] !== undefined &&
                        !productSKU.some(
                          (sku) =>
                            sku.sku_tier_indices
                              .slice(0, index)
                              .every(
                                (val, idx) => val === indexSelected?.[idx]
                              ) && sku.sku_tier_indices[index] === indexValue
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
                            sx={{
                              minWidth: '80px',
                              border: '1px solid',
                              borderColor:
                                indexSelected?.[index] === indexValue
                                  ? blue[600]
                                  : grey[300],
                              borderWidth: '1.5px',
                              padding: '7px 15px',
                              borderRadius: '5px',
                              color:
                                indexSelected?.[index] === indexValue
                                  ? blue[600]
                                  : 'black',
                              backgroundColor: isDisabled ? grey[200] : 'white',
                              '&:hover': {
                                cursor: isDisabled ? 'not-allowed' : 'pointer'
                              },
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              height: '40px'
                            }}
                          >
                            {value}
                          </Typography>
                        </Box>
                      )
                    })}
                  </Box>
                </Box>
              </Grid2>
            </Grid2>
          ))}
        </Box>
      )}
    </>
  )
}

export default Variation
