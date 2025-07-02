import { Box, Button, Typography } from '@mui/material'
import AddOutlinedIcon from '@mui/icons-material/AddOutlined'

function CategoryHeader({ handleOpenModal }) {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
      <Box>
        <Typography
          variant="body2"
          sx={{ fontSize: '1.5rem', fontWeight: 'bold' }}
        >
          Categories
        </Typography>
      </Box>
      <Box>
        <Button
          variant="contained"
          onClick={() => {
            handleOpenModal({ action: 'create-root' })
          }}
        >
          <AddOutlinedIcon />
          Add new category root
        </Button>
      </Box>
    </Box>
  )
}
export default CategoryHeader
