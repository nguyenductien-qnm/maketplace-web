import { experimental_extendTheme as extendTheme } from '@mui/material/styles'

const theme = extendTheme({
  palette: {
    secondary: {
      main: '#9e9e9e',
      dark: '#616161',
      light: '#e0e0e0',
      contrastText: '#fff'
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        outlinedSecondary: {
          color: '#9e9e9e',
          borderColor: '#9e9e9e',
          '&:hover': {
            color: '#616161',
            borderColor: '#616161',
            backgroundColor: '#e0e0e0'
          }
        }
      }
    }
  }
})

export default theme
