import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  typography: {
    fontFamily: 'Poppins, sans-serif',
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          fontFamily: 'Poppins, sans-serif',
          background: 'rgba(248, 248, 248, 1)',
          border :' rgba(229, 229, 229, 1)'
        }
      }
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          width: '100%', 
          alignItems: 'center',
          color: 'rgba(0, 0, 0, 0.6)',
          fontFamily: 'Poppins, sans-serif',  
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          background: 'rgba(0, 107, 206, 1)',
          '&:hover': {  
            background: 'linear-gradient(95.25deg, rgba(135, 206, 250, 1) 0%, rgba(0, 107, 206, 1) 100%)',

          },
        }
      }
    }
  }
});
