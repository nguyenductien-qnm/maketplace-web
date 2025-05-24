import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'

export const CustomPrevArrow = (props) => {
  const { onClick } = props
  return (
    <KeyboardArrowLeftIcon
      onClick={onClick}
      sx={{
        position: 'absolute',
        border: '1px solid',
        borderRadius: '999px',
        padding: '5px',
        borderColor: 'grey.300',
        color: 'grey.700',
        '&:hover': {
          borderColor: 'grey.700',
          cursor: 'pointer'
        },
        top: '100px',
        zIndex: '1',
        left: '-20px',
        backgroundColor: 'white'
      }}
    />
  )
}

export const CustomNextArrow = (props) => {
  const { onClick } = props
  return (
    <KeyboardArrowRightIcon
      onClick={onClick}
      sx={{
        position: 'absolute',
        border: '1px solid',
        borderRadius: '999px',
        padding: '5px',
        borderColor: 'grey.300',
        color: 'grey.700',
        '&:hover': {
          borderColor: 'grey.700',
          cursor: 'pointer'
        },
        top: '100px',
        right: '-20px',
        backgroundColor: 'white'
      }}
    />
  )
}
