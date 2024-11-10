import { Box, Typography } from '@mui/material'
import StarIcon from '@mui/icons-material/Star'
import { green, grey, red, yellow } from '@mui/material/colors'

function Product() {
  return (
    <Box
      sx={{
        maxWidth: '100%',
        borderRadius: '8px',
        padding: '8px',
        textAlign: 'start',
        '&:hover': {
          border: '1px solid #e0e0e0',
          cursor: 'pointer'
        }
      }}
    >
      <img
        style={{ width: '100%', borderRadius: '8px' }}
        src="https://klbtheme.com/bevesi/wp-content/uploads/2024/04/1-18.jpg"
        alt="Product"
      />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-evenly',
          alignItems: 'center'
        }}
      >
        <Typography
          variant="h7"
          sx={{ color: green[700], fontWeight: '800', marginLeft: '-15px' }}
        >
          $312.25
        </Typography>
        <Typography
          variant="body2"
          sx={{
            textDecoration: 'line-through',
            color: 'gray',
            fontSize: '10px',
            fontWeight: '800'
          }}
        >
          $396.45
        </Typography>
        <Typography
          sx={{
            color: red[900],
            fontSize: '10px',
            fontWeight: '800',
            padding: '3px 5px',
            borderRadius: '3px',
            backgroundColor: red[100]
          }}
        >
          22%
        </Typography>
      </Box>

      <Typography sx={{ paddingTop: '10px', fontSize: '12px' }}>
        Lenovo IdeaPad 1i 15.6_, Intel Core i5-1235U, 8GB RAM
      </Typography>

      <Box sx={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', marginY: 1 }}>
          {[...Array(5)].map((_, index) => (
            <StarIcon
              sx={{ color: yellow[700], fontSize: '15px' }}
              key={index}
            />
          ))}
        </Box>
        <Typography
          sx={{ fontWeight: '700', fontSize: '12px', color: grey[400] }}
        >
          5
        </Typography>
      </Box>

      <Box sx={{ display: 'flex' }}>
        <Typography
          sx={{ fontWeight: '600', fontSize: '12px', color: grey[400] }}
        >
          Store:
        </Typography>
        <Typography sx={{ fontWeight: '700', fontSize: '12px' }}>
          Blonwe
        </Typography>
      </Box>

      <Box sx={{ display: 'flex' }}>
        <Typography
          sx={{ fontWeight: '600', fontSize: '12px', color: grey[400] }}
        >
          Available only:
        </Typography>
        <Typography sx={{ fontWeight: '700', fontSize: '12px' }}>31</Typography>
      </Box>
    </Box>
  )
}

export default Product
