import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#FFD700', // Ekesta yellow
      light: '#FFEB3B',
      dark: '#B8860B',
      contrastText: '#0D0D0D',
    },
    secondary: {
      main: '#E0E0E0', // Light gray
      light: '#F5F5F5',
      dark: '#BDBDBD',
      contrastText: '#0D0D0D',
    },
    error: {
      main: '#FF6B6B',
      light: '#FF8A80',
      dark: '#C62828',
    },
    warning: {
      main: '#FFB74D',
      light: '#FFCC02',
      dark: '#F57C00',
    },
    info: {
      main: '#64B5F6',
      light: '#90CAF9',
      dark: '#1976D2',
    },
    success: {
      main: '#81C784',
      light: '#A5D6A7',
      dark: '#388E3C',
    },
    background: {
      default: '#0D0D0D', // Deep black
      paper: '#1A1A1A',   // Slightly lighter for cards/panels
    },
    text: {
      primary: '#E0E0E0',   // Light gray
      secondary: '#BDBDBD', // Medium gray
      disabled: '#757575',  // Dark gray
    },
    action: {
      hover: 'rgba(255, 215, 0, 0.08)',
      selected: 'rgba(255, 215, 0, 0.16)',
      disabled: 'rgba(224, 224, 224, 0.26)',
      disabledBackground: 'rgba(224, 224, 224, 0.12)',
    },
    divider: '#333333',
  },
  typography: {
    fontFamily: "'Montserrat', 'Roboto', 'Helvetica', 'Arial', sans-serif",
    h1: {
      fontFamily: "'Montserrat', sans-serif",
      fontWeight: 800,
      fontSize: '3.5rem',
      lineHeight: 1.2,
      letterSpacing: '-0.02em',
      '@media (max-width:768px)': {
        fontSize: '2.5rem',
      },
    },
    h2: {
      fontFamily: "'Montserrat', sans-serif",
      fontWeight: 700,
      fontSize: '2.5rem',
      lineHeight: 1.3,
      letterSpacing: '-0.01em',
      '@media (max-width:768px)': {
        fontSize: '2rem',
      },
    },
    h3: {
      fontFamily: "'Montserrat', sans-serif",
      fontWeight: 600,
      fontSize: '2rem',
      lineHeight: 1.4,
      '@media (max-width:768px)': {
        fontSize: '1.5rem',
      },
    },
    h4: {
      fontFamily: "'Montserrat', sans-serif",
      fontWeight: 600,
      fontSize: '1.5rem',
      lineHeight: 1.4,
      '@media (max-width:768px)': {
        fontSize: '1.25rem',
      },
    },
    h5: {
      fontFamily: "'Montserrat', sans-serif",
      fontWeight: 500,
      fontSize: '1.25rem',
      lineHeight: 1.5,
    },
    h6: {
      fontFamily: "'Montserrat', sans-serif",
      fontWeight: 500,
      fontSize: '1rem',
      lineHeight: 1.6,
    },
    body1: {
      fontFamily: "'Montserrat', sans-serif",
      fontSize: '1rem',
      lineHeight: 1.6,
      fontWeight: 400,
    },
    body2: {
      fontFamily: "'Montserrat', sans-serif",
      fontSize: '0.875rem',
      lineHeight: 1.5,
      fontWeight: 400,
    },
    button: {
      fontFamily: "'Montserrat', sans-serif",
      fontWeight: 600,
      textTransform: 'uppercase',
      letterSpacing: '0.05em',
    },
    caption: {
      fontFamily: "'Roboto Mono', monospace",
      fontSize: '0.75rem',
      lineHeight: 1.4,
      fontWeight: 400,
    },
    overline: {
      fontFamily: "'Roboto Mono', monospace",
      fontSize: '0.75rem',
      lineHeight: 1.4,
      fontWeight: 400,
      textTransform: 'uppercase',
      letterSpacing: '0.1em',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          scrollbarColor: '#FFD700 #0D0D0D',
          '&::-webkit-scrollbar, & *::-webkit-scrollbar': {
            width: 8,
          },
          '&::-webkit-scrollbar-track, & *::-webkit-scrollbar-track': {
            backgroundColor: '#0D0D0D',
          },
          '&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb': {
            borderRadius: 4,
            backgroundColor: '#FFD700',
          },
          '&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover': {
            backgroundColor: '#FFEB3B',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '10px 24px',
          transition: 'all 0.3s ease',
          '&:focus': {
            outline: 'none',
            boxShadow: 'none',
          },
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 4px 16px rgba(255, 215, 0, 0.3)',
          },
        },
        contained: {
          background: 'linear-gradient(45deg, #FFD700, #FFEB3B)',
          color: '#0D0D0D',
          '&:hover': {
            background: 'linear-gradient(45deg, #FFEB3B, #FFD700)',
            boxShadow: '0 4px 20px rgba(255, 215, 0, 0.4)',
          },
        },
        outlined: {
          borderColor: '#FFD700',
          color: '#FFD700',
          '&:hover': {
            borderColor: '#FFEB3B',
            backgroundColor: 'rgba(255, 215, 0, 0.08)',
            boxShadow: '0 0 10px rgba(255, 215, 0, 0.3)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: '#1A1A1A',
          borderRadius: 12,
          border: '1px solid #333333',
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-4px)',
            borderColor: '#FFD700',
            boxShadow: '0 8px 32px rgba(255, 215, 0, 0.1)',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            backgroundColor: '#1A1A1A',
            borderRadius: 8,
            '& fieldset': {
              borderColor: '#333333',
              borderRadius: 8,
            },
            '&:hover fieldset': {
              borderColor: '#FFD700',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#333333',
              boxShadow: 'none',
            },
            '&.Mui-focused': {
              outline: 'none',
              boxShadow: 'none',
            },
          },
          '& .MuiInputBase-root': {
            borderRadius: 8,
            '&:focus': {
              outline: 'none',
              boxShadow: 'none',
            },
            '&.Mui-focused': {
              outline: 'none',
              boxShadow: 'none',
            },
          },
          '& .MuiInputBase-input': {
            '&:focus': {
              outline: 'none',
              boxShadow: 'none',
            },
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(13, 13, 13, 0.95)',
          backdropFilter: 'blur(10px)',
          borderBottom: '1px solid #333333',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          backgroundColor: '#333333',
          color: '#E0E0E0',
          '&:hover': {
            backgroundColor: '#FFD700',
            color: '#0D0D0D',
          },
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: '#1A1A1A',
          borderRight: '1px solid #333333',
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          '&:focus': {
            outline: 'none',
            boxShadow: 'none',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          '&:focus': {
            outline: 'none',
            boxShadow: 'none',
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          '&:focus': {
            outline: 'none',
            boxShadow: 'none',
          },
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          '&:focus': {
            outline: 'none',
            boxShadow: 'none',
          },
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          '&:focus': {
            outline: 'none',
            boxShadow: 'none',
          },
        },
      },
    },
    MuiPaginationItem: {
      styleOverrides: {
        root: {
          '&:focus': {
            outline: 'none',
            boxShadow: 'none',
          },
        },
      },
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
  spacing: 8,
  shape: {
    borderRadius: 8,
  },
  shadows: [
    'none',
    '0px 2px 4px rgba(0,0,0,0.2)',
    '0px 4px 8px rgba(0,0,0,0.2)',
    '0px 8px 16px rgba(0,0,0,0.2)',
    '0px 16px 32px rgba(0,0,0,0.2)',
    '0px 2px 4px rgba(255,215,0,0.1)',
    '0px 4px 8px rgba(255,215,0,0.1)',
    '0px 8px 16px rgba(255,215,0,0.1)',
    '0px 16px 32px rgba(255,215,0,0.1)',
    ...Array(15).fill('none'),
  ],
});

export default theme; 