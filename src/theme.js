import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#238636', // GitHub Action Green
      light: '#2ea043',
      dark: '#1a6428',
      contrastText: '#fff',
    },
    secondary: {
      main: '#58a6ff', // GitHub Action Blue
      light: '#79c0ff',
      dark: '#316dca',
      contrastText: '#fff',
    },
    background: {
      default: '#0d1117', // GitHub Dark Background
      paper: '#161b22', // GitHub Card Background
    },
    success: {
      main: '#3fb950', // Passed Test Green
    },
    warning: {
      main: '#d29922', // Pending/Warning Yellow
    },
    error: {
      main: '#f85149', // Failed Test Red
    },
    info: {
      main: '#a371f7', // Info Purple
    },
    text: {
      primary: '#c9d1d9',
      secondary: '#8b949e',
    },
    divider: 'rgba(240, 246, 252, 0.1)',
  },
  typography: {
    fontFamily: '"Inter", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Helvetica", "Arial", sans-serif',
    h1: { fontWeight: 700, letterSpacing: '-0.02em' },
    h2: { fontWeight: 600, letterSpacing: '-0.02em' },
    h3: { fontWeight: 600, letterSpacing: '-0.01em' },
    h4: { fontWeight: 600 },
    h5: { fontWeight: 600 },
    h6: { fontWeight: 600 },
    button: { fontWeight: 600, textTransform: 'none' },
    body1: { fontSize: '0.95rem' },
    body2: { fontSize: '0.85rem' }
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: '#0d1117',
          color: '#c9d1d9',
          minHeight: '100vh',
          margin: 0,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: '#161b22',
          border: '1px solid #30363d',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            borderColor: '#8b949e',
          }
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '6px',
          textTransform: 'none',
          fontWeight: 600,
          padding: '6px 16px',
        },
        containedPrimary: {
          background: '#238636',
          border: '1px solid rgba(240, 246, 252, 0.1)',
          boxShadow: '0 1px 0 rgba(27, 31, 36, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.03)',
          '&:hover': {
            background: '#2ea043',
            borderColor: 'rgba(240, 246, 252, 0.1)',
          }
        },
        containedSecondary: {
          background: '#21262d',
          color: '#c9d1d9',
          border: '1px solid rgba(240, 246, 252, 0.1)',
          boxShadow: '0 1px 0 rgba(27, 31, 36, 0.04), inset 0 1px 0 rgba(255, 255, 255, 0.25)',
          '&:hover': {
            background: '#30363d',
            borderColor: '#8b949e',
          }
        },
        outlined: {
          borderColor: 'rgba(240, 246, 252, 0.1)',
          color: '#c9d1d9',
          '&:hover': {
            backgroundColor: '#30363d',
            borderColor: '#8b949e',
          }
        }
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#010409',
          borderBottom: '1px solid rgba(240, 246, 252, 0.1)',
          boxShadow: 'none',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: '#010409',
          borderRight: '1px solid rgba(240, 246, 252, 0.1)',
        }
      }
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 600,
          borderRadius: '2em',
        },
        outlined: {
          borderWidth: '1px',
        }
      }
    }
  },
});