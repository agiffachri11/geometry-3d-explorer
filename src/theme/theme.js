import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2B3A67', // Navy blue - profesional
      light: '#506099',
      dark: '#1A2749',
    },
    secondary: {
      main: '#E84855', // Coral red - energetik
      light: '#FF6B77',
      dark: '#B33640',
    },
    background: {
      default: '#F5F7FA',
      paper: '#FFFFFF',
    },
    accent: {
      main: '#57BBB0', // Turquoise - modern
      light: '#78DDD2',
      dark: '#408B83',
    },
  },
  typography: {
    fontFamily: "'Poppins', 'Roboto', sans-serif",
    h1: {
      fontWeight: 600,
    },
    h2: {
      fontWeight: 600,
    },
    h3: {
      fontWeight: 600,
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          padding: '8px 16px',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
        },
      },
    },
  },
});

export default theme;