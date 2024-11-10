import { Box, Divider, styled, Typography } from '@mui/material'
import { grey, yellow } from '@mui/material/colors'
import StarIcon from '@mui/icons-material/Star'
import Comment from './Comment'
import Pagination from '@mui/material/Pagination'

function Review() {
  const LineYellowComponent = styled(Box)({
    height: '7px',
    backgroundColor: yellow[700],
    width: '360px',
    borderRadius: '5px'
  })

  const LineGreyComponent = styled(Box)({
    height: '7px',
    backgroundColor: grey[300],
    width: '360px',
    borderRadius: '5px'
  })

  return (
    <Box>
      <Box>
        <Typography sx={{ fontSize: '20px', fontWeight: '600' }}>
          2 reviews for Lenovo IdeaPad 1i 15.6_, Intel Core i5-1235U, 8GB RAM
        </Typography>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'start',
            alignItems: 'center',
            gap: '20px',
            marginTop: '20px',
            marginBottom: '20px'
          }}
        >
          <Typography sx={{ fontSize: '80px', fontWeight: '500' }}>
            5.00
          </Typography>
          <Box sx={{}}>
            <Box sx={{ display: 'flex', justifyContent: 'center', marginY: 1 }}>
              {[...Array(5)].map((_, index) => (
                <StarIcon
                  sx={{ color: yellow[700], fontSize: '30px' }}
                  key={index}
                />
              ))}
            </Box>
            <Typography
              sx={{
                color: grey[600],
                color: 'black',
                display: 'flex',
                gap: '7px'
              }}
            >
              Average of
              <Typography sx={{ fontWeight: '600', color: 'black' }}>
                2 reviews
              </Typography>
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '7px',
              marginLeft: '50px'
            }}
          >
            <Box sx={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <StarIcon sx={{ color: yellow[700], fontSize: '18px' }} />
              <Typography>5</Typography>
              <LineYellowComponent />
              <Typography>2</Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <StarIcon sx={{ color: yellow[700], fontSize: '18px' }} />
              <Typography>4</Typography>
              <LineGreyComponent />
              <Typography>0</Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <StarIcon sx={{ color: yellow[700], fontSize: '18px' }} />
              <Typography>3</Typography>
              <LineGreyComponent />
              <Typography>0</Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <StarIcon sx={{ color: yellow[700], fontSize: '18px' }} />
              <Typography>2</Typography>
              <LineGreyComponent />
              <Typography>0</Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <StarIcon sx={{ color: yellow[700], fontSize: '18px' }} />
              <Typography>1</Typography>
              <LineGreyComponent />
              <Typography>0</Typography>
            </Box>
          </Box>
        </Box>
        <Divider />
        <Box>
          {[...Array(5)].map((_, index) => (
            <Box>
              <Comment key={index} />
              <Divider />
            </Box>
          ))}
        </Box>
        <Pagination
          count={10}
          variant="container"
          sx={{ marginTop: '30px', textAlign: 'center' }}
        />
      </Box>
    </Box>
  )
}
export default Review
