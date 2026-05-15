import stylesheet from './modernMinimal.css.js'

const indigo = {
  50: '#eef2ff',
  100: '#e0e7ff',
  200: '#c7d2fe',
  300: '#a5b4fc',
  400: '#818cf8',
  500: '#6366f1',
  600: '#4f46e5',
  700: '#4338ca',
  800: '#3730a3',
  900: '#312e81',
}

const slate = {
  50: '#f8fafc',
  100: '#f1f5f9',
  200: '#e2e8f0',
  300: '#cbd5e1',
  400: '#94a3b8',
  500: '#64748b',
  600: '#475569',
  700: '#334155',
  800: '#1e293b',
  900: '#0f172a',
  950: '#020617',
}

export default {
  themeName: 'Modern Minimal',
  typography: {
    fontFamily:
      "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif",
    h4: {
      fontWeight: 600,
      letterSpacing: '-0.02em',
    },
    h5: {
      fontWeight: 600,
      letterSpacing: '-0.01em',
    },
    h6: {
      fontWeight: 600,
      letterSpacing: '-0.01em',
    },
    subtitle1: {
      fontWeight: 500,
    },
    body1: {
      fontSize: '0.875rem',
      lineHeight: 1.6,
    },
    body2: {
      fontSize: '0.8125rem',
      lineHeight: 1.5,
    },
    caption: {
      fontSize: '0.75rem',
      color: slate[400],
    },
  },
  palette: {
    primary: {
      light: indigo[300],
      main: indigo[500],
      dark: indigo[700],
    },
    secondary: {
      main: slate[300],
      contrastText: slate[900],
    },
    background: {
      default: slate[950],
      paper: slate[900],
    },
    text: {
      primary: slate[100],
      secondary: slate[400],
    },
    divider: 'rgba(148, 163, 184, 0.08)',
    type: 'dark',
  },
  shape: {
    borderRadius: 12,
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        '*': {
          scrollbarWidth: 'thin',
          scrollbarColor: `${slate[600]} transparent`,
        },
      },
    },
    MuiPaper: {
      root: {
        backgroundImage: 'none',
      },
      rounded: {
        borderRadius: 16,
      },
      elevation1: {
        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)',
      },
      elevation2: {
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
      },
    },
    MuiButton: {
      root: {
        borderRadius: 10,
        textTransform: 'none',
        fontWeight: 500,
        padding: '8px 20px',
      },
      contained: {
        boxShadow: 'none',
        '&:hover': {
          boxShadow: '0 4px 12px rgba(99, 102, 241, 0.25)',
        },
      },
      outlined: {
        borderWidth: 1,
        borderColor: slate[700],
        '&:hover': {
          borderWidth: 1,
          borderColor: indigo[500],
          backgroundColor: 'rgba(99, 102, 241, 0.08)',
        },
      },
      textPrimary: {
        color: indigo[400],
      },
    },
    MuiIconButton: {
      root: {
        borderRadius: 10,
        padding: 8,
        transition: 'all 0.2s ease-in-out',
        '&:hover': {
          backgroundColor: 'rgba(99, 102, 241, 0.12)',
        },
      },
    },
    MuiAppBar: {
      root: {
        boxShadow: 'none',
        borderBottom: `1px solid rgba(148, 163, 184, 0.06)`,
      },
      colorDefault: {
        backgroundColor: 'rgba(15, 23, 42, 0.85)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
      },
    },
    MuiDrawer: {
      root: {
        borderRight: `1px solid rgba(148, 163, 184, 0.06)`,
      },
      paper: {
        backgroundColor: slate[950],
        borderRight: 'none',
      },
    },
    MuiListItem: {
      root: {
        borderRadius: 10,
        margin: '2px 8px',
        paddingLeft: 12,
        paddingRight: 12,
        '&$selected': {
          backgroundColor: 'rgba(99, 102, 241, 0.12)',
          '&:hover': {
            backgroundColor: 'rgba(99, 102, 241, 0.18)',
          },
        },
      },
    },
    MuiMenuItem: {
      root: {
        borderRadius: 8,
        margin: '2px 6px',
        fontSize: '0.875rem',
        '&:hover': {
          backgroundColor: 'rgba(99, 102, 241, 0.08)',
        },
      },
    },
    MuiTableCell: {
      root: {
        borderBottom: `1px solid rgba(148, 163, 184, 0.06)`,
        padding: '12px 16px',
        color: slate[300],
        fontSize: '0.8125rem',
      },
      head: {
        borderBottom: `1px solid rgba(148, 163, 184, 0.1)`,
        color: slate[500],
        fontSize: '0.6875rem',
        fontWeight: 600,
        textTransform: 'uppercase',
        letterSpacing: '0.08em',
      },
    },
    MuiTableRow: {
      root: {
        transition: 'background-color 0.15s ease',
        '&:hover': {
          backgroundColor: 'rgba(99, 102, 241, 0.04) !important',
        },
      },
    },
    MuiDivider: {
      root: {
        backgroundColor: 'rgba(148, 163, 184, 0.08)',
        margin: '8px 0',
      },
    },
    MuiChip: {
      root: {
        borderRadius: 8,
        fontWeight: 500,
      },
    },
    MuiTextField: {
      root: {
        '& .MuiOutlinedInput-root': {
          borderRadius: 10,
          '& fieldset': {
            borderColor: slate[700],
          },
          '&:hover fieldset': {
            borderColor: slate[500],
          },
          '&.Mui-focused fieldset': {
            borderColor: indigo[500],
          },
        },
      },
    },
    MuiFilledInput: {
      root: {
        borderRadius: '10px 10px 0 0',
        backgroundColor: slate[800],
        '&:hover': {
          backgroundColor: slate[800],
        },
        '&$focused': {
          backgroundColor: slate[800],
        },
      },
    },
    MuiFab: {
      root: {
        boxShadow: '0 4px 14px rgba(0, 0, 0, 0.25)',
        borderRadius: 14,
      },
    },
    MuiCard: {
      root: {
        borderRadius: 16,
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.12)',
        overflow: 'hidden',
      },
    },
    MuiDialog: {
      paper: {
        borderRadius: 16,
      },
    },
    MuiTooltip: {
      tooltip: {
        borderRadius: 8,
        fontSize: '0.75rem',
        backgroundColor: slate[800],
        color: slate[100],
      },
    },
    MuiFormControlLabel: {
      root: {
        borderRadius: 8,
      },
    },
    MuiSwitch: {
      root: {
        padding: 8,
      },
      switchBase: {
        '&$checked': {
          color: indigo[500],
        },
      },
      colorPrimary: {
        '&$checked': {
          color: indigo[500],
        },
      },
      track: {
        borderRadius: 12,
        backgroundColor: slate[600],
      },
    },
    MuiSlider: {
      root: {
        color: indigo[500],
      },
      thumb: {
        boxShadow: '0 0 0 4px rgba(99, 102, 241, 0.2)',
      },
    },
    MuiFormGroup: {
      root: {
        color: indigo[400],
      },
    },
    RaLayout: {
      root: {
        backgroundColor: slate[950],
      },
      content: {
        padding: '24px !important',
        backgroundColor: slate[950],
      },
    },
    RaSidebar: {
      root: {
        height: 'initial',
        backgroundColor: slate[950],
      },
      drawerPaper: {
        backgroundColor: slate[950],
      },
    },
    RaList: {
      content: {
        backgroundColor: 'transparent',
      },
    },
    RaListToolbar: {
      toolbar: {
        padding: '0 8px !important',
        minHeight: 48,
      },
    },
    RaSearchInput: {
      input: {
        '& .MuiInputBase-root': {
          borderRadius: '12px !important',
          backgroundColor: slate[800],
          border: `1px solid ${slate[700]}`,
          color: slate[100],
          '& fieldset': {
            borderColor: 'transparent',
          },
          '&:hover fieldset': {
            borderColor: slate[600],
          },
          '&.Mui-focused fieldset': {
            borderColor: indigo[500],
          },
          '& svg': {
            color: `${slate[400]} !important`,
          },
        },
      },
    },
    RaPaginationActions: {
      button: {
        backgroundColor: 'transparent',
        borderRadius: 10,
        margin: '0 2px',
        minWidth: 36,
        border: `1px solid ${slate[700]}`,
        color: slate[300],
        '&:hover': {
          backgroundColor: 'rgba(99, 102, 241, 0.08)',
          borderColor: indigo[500],
        },
      },
      currentPageButton: {
        backgroundColor: indigo[500],
        color: '#fff',
        borderColor: indigo[500],
        '&:hover': {
          backgroundColor: indigo[600],
        },
      },
    },
    NDAlbumGridView: {
      albumContainer: {
        backgroundColor: slate[900],
        borderRadius: 14,
        padding: 16,
        transition: 'all 0.2s ease',
        cursor: 'pointer',
        '&:hover': {
          backgroundColor: slate[800],
          transform: 'translateY(-2px)',
        },
      },
      albumName: {
        marginTop: 10,
        fontWeight: 600,
        fontSize: '0.875rem',
        color: slate[100],
        letterSpacing: '-0.01em',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
      },
      albumSubtitle: {
        color: slate[500],
        fontSize: '0.8125rem',
        marginTop: 2,
      },
      albumPlayButton: {
        backgroundColor: indigo[500],
        borderRadius: '50%',
        boxShadow: '0 6px 16px rgba(99, 102, 241, 0.35)',
        transition: 'all 0.2s ease',
        opacity: 0,
        '&:hover': {
          backgroundColor: `${indigo[400]} !important`,
          transform: 'scale(1.08)',
        },
      },
      albumContainerHover: {
        '&:hover $albumPlayButton': {
          opacity: 1,
        },
      },
    },
    NDAlbumDetails: {
      root: {
        background: `linear-gradient(180deg, ${slate[800]} 0%, transparent 100%)`,
        borderRadius: 16,
        boxShadow: 'none',
        padding: 24,
      },
      recordName: {
        fontSize: '2rem',
        fontWeight: 700,
        letterSpacing: '-0.03em',
        color: slate[100],
      },
      recordArtist: {
        fontSize: '0.9375rem',
        fontWeight: 500,
        color: indigo[400],
      },
      recordMeta: {
        fontSize: '0.8125rem',
        color: slate[400],
      },
    },
    NDArtistShow: {
      actions: {
        padding: '1.5rem 0',
        alignItems: 'center',
      },
    },
    NDLogin: {
      main: {
        boxShadow: `inset 0 0 0 2000px rgba(2, 6, 23, 0.85)`,
      },
      systemNameLink: {
        color: indigo[400],
      },
      welcome: {
        color: slate[100],
        fontWeight: 300,
      },
      card: {
        minWidth: 340,
        backgroundColor: 'rgba(30, 41, 59, 0.9)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        borderRadius: 20,
        border: `1px solid ${slate[700]}`,
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
      },
      avatar: {
        marginBottom: 8,
      },
      button: {
        borderRadius: 12,
        boxShadow: '0 4px 14px rgba(99, 102, 241, 0.3)',
        textTransform: 'none',
        fontWeight: 600,
      },
    },
    NDMobileArtistDetails: {
      bgContainer: {
        background: `linear-gradient(to bottom, rgba(30, 41, 59, 0.85), ${slate[950]})`,
      },
    },
    NDAudioPlayer: {
      audioTitle: {
        color: slate[100],
      },
      songTitle: {
        fontWeight: 600,
        fontSize: '0.875rem',
      },
      songInfo: {
        color: slate[400],
        fontSize: '0.75rem',
      },
    },
    NDPlaylistDetails: {
      container: {
        background: `linear-gradient(180deg, ${slate[800]} 0%, transparent 100%)`,
        borderRadius: 16,
        boxShadow: 'none',
        paddingTop: '2rem !important',
      },
      title: {
        fontWeight: 700,
        letterSpacing: '-0.02em',
        color: slate[100],
      },
      details: {
        fontSize: '0.8125rem',
        color: slate[400],
      },
    },
  },
  player: {
    theme: 'dark',
    stylesheet,
  },
}
