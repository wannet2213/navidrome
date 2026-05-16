import stylesheet from './modernMinimal.css.js'

const rose = {
  50: '#fff1f2',
  100: '#ffe4e6',
  200: '#fecdd3',
  300: '#fda4af',
  400: '#fb7185',
  500: '#fc3c44',
  600: '#e11d48',
  700: '#be123c',
  800: '#9f1239',
  900: '#881337',
}

const gray = {
  50: '#fafafa',
  100: '#f5f5f5',
  200: '#e5e5e5',
  300: '#d4d4d4',
  400: '#a3a3a3',
  500: '#737373',
  600: '#525252',
  700: '#404040',
  800: '#262626',
  850: '#1c1c1e',
  900: '#171717',
  950: '#0a0a0a',
}

export default {
  themeName: 'Modern Minimal',
  typography: {
    fontFamily:
      "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text', 'Inter', 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif",
    h4: {
      fontWeight: 700,
      letterSpacing: '-0.03em',
    },
    h5: {
      fontWeight: 700,
      letterSpacing: '-0.025em',
    },
    h6: {
      fontWeight: 600,
      letterSpacing: '-0.02em',
    },
    subtitle1: {
      fontWeight: 500,
      letterSpacing: '-0.01em',
    },
    subtitle2: {
      fontWeight: 600,
      letterSpacing: '0.01em',
      textTransform: 'uppercase',
      fontSize: '0.6875rem',
    },
    body1: {
      fontSize: '0.9375rem',
      lineHeight: 1.5,
      fontWeight: 400,
    },
    body2: {
      fontSize: '0.8125rem',
      lineHeight: 1.5,
      fontWeight: 400,
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
      letterSpacing: '-0.01em',
    },
    caption: {
      fontSize: '0.75rem',
      color: gray[500],
      letterSpacing: '0.01em',
    },
  },
  palette: {
    primary: {
      light: rose[300],
      main: rose[500],
      dark: rose[700],
      contrastText: '#fff',
    },
    secondary: {
      main: gray[400],
      contrastText: '#fff',
    },
    background: {
      default: gray[950],
      paper: gray[900],
    },
    text: {
      primary: 'rgba(255, 255, 255, 0.95)',
      secondary: gray[500],
    },
    divider: 'rgba(255, 255, 255, 0.06)',
    action: {
      hover: 'rgba(255, 255, 255, 0.05)',
      selected: 'rgba(252, 60, 68, 0.12)',
    },
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
          scrollbarColor: `${gray[700]} transparent`,
        },
        body: {
          overflow: 'hidden',
        },
      },
    },
    MuiPaper: {
      root: {
        backgroundImage: 'none',
        backgroundColor: gray[900],
      },
      rounded: {
        borderRadius: 16,
      },
      elevation1: {
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
      },
      elevation2: {
        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.4)',
      },
    },
    MuiButton: {
      root: {
        borderRadius: 100,
        textTransform: 'none',
        fontWeight: 600,
        padding: '10px 24px',
        fontSize: '0.9375rem',
        transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
      },
      contained: {
        boxShadow: 'none',
        '&:hover': {
          boxShadow: '0 4px 20px rgba(252, 60, 68, 0.3)',
          transform: 'scale(1.02)',
        },
        '&:active': {
          transform: 'scale(0.98)',
        },
      },
      outlined: {
        borderWidth: 1.5,
        borderColor: gray[700],
        color: 'rgba(255, 255, 255, 0.85)',
        '&:hover': {
          borderWidth: 1.5,
          borderColor: 'rgba(255, 255, 255, 0.3)',
          backgroundColor: 'rgba(255, 255, 255, 0.04)',
        },
      },
      text: {
        '&:hover': {
          backgroundColor: 'rgba(255, 255, 255, 0.06)',
        },
      },
      textPrimary: {
        color: rose[500],
        '&:hover': {
          backgroundColor: 'rgba(252, 60, 68, 0.1)',
        },
      },
    },
    MuiIconButton: {
      root: {
        borderRadius: '50%',
        padding: 10,
        transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
        '&:hover': {
          backgroundColor: 'rgba(255, 255, 255, 0.08)',
          transform: 'scale(1.05)',
        },
        '&:active': {
          transform: 'scale(0.95)',
        },
      },
    },
    MuiAppBar: {
      root: {
        boxShadow: 'none',
        borderBottom: 'none',
      },
      colorDefault: {
        backgroundColor: 'rgba(10, 10, 10, 0.72)',
        backdropFilter: 'saturate(180%) blur(40px)',
        WebkitBackdropFilter: 'saturate(180%) blur(40px)',
      },
    },
    MuiDrawer: {
      root: {
        borderRight: 'none',
      },
      paper: {
        backgroundColor: 'rgba(10, 10, 10, 0.88)',
        backdropFilter: 'saturate(180%) blur(40px)',
        WebkitBackdropFilter: 'saturate(180%) blur(40px)',
        borderRight: 'none',
      },
      paperAnchorDockedLeft: {
        borderRight: 'none',
      },
    },
    MuiListItem: {
      root: {
        borderRadius: 10,
        margin: '1px 10px',
        paddingLeft: 14,
        paddingRight: 14,
        transition: 'all 0.15s cubic-bezier(0.4, 0, 0.2, 1)',
        '&$selected': {
          backgroundColor: 'rgba(252, 60, 68, 0.12)',
          '&:hover': {
            backgroundColor: 'rgba(252, 60, 68, 0.18)',
          },
          '& .MuiListItemIcon-root': {
            color: rose[500],
          },
          '& .MuiListItemText-primary': {
            color: rose[500],
            fontWeight: 600,
          },
        },
      },
    },
    MuiListItemIcon: {
      root: {
        color: gray[500],
        minWidth: 40,
        '& svg': {
          fontSize: 20,
        },
      },
    },
    MuiListItemText: {
      primary: {
        fontSize: '0.9375rem',
        fontWeight: 400,
        color: 'rgba(255, 255, 255, 0.85)',
      },
    },
    MuiMenuItem: {
      root: {
        borderRadius: 8,
        margin: '1px 8px',
        fontSize: '0.9375rem',
        padding: '10px 14px',
        '&:hover': {
          backgroundColor: 'rgba(255, 255, 255, 0.06)',
        },
      },
    },
    MuiTableCell: {
      root: {
        borderBottom: `1px solid rgba(255, 255, 255, 0.04)`,
        padding: '14px 16px',
        color: 'rgba(255, 255, 255, 0.8)',
        fontSize: '0.9375rem',
      },
      head: {
        borderBottom: `1px solid rgba(255, 255, 255, 0.06)`,
        color: gray[500],
        fontSize: '0.75rem',
        fontWeight: 600,
        textTransform: 'uppercase',
        letterSpacing: '0.06em',
      },
    },
    MuiTableRow: {
      root: {
        transition: 'background-color 0.15s cubic-bezier(0.4, 0, 0.2, 1)',
        '&:hover': {
          backgroundColor: 'rgba(255, 255, 255, 0.03) !important',
        },
      },
    },
    MuiDivider: {
      root: {
        backgroundColor: 'rgba(255, 255, 255, 0.06)',
        margin: '8px 0',
      },
    },
    MuiChip: {
      root: {
        borderRadius: 100,
        fontWeight: 500,
        fontSize: '0.8125rem',
      },
    },
    MuiTextField: {
      root: {
        '& .MuiOutlinedInput-root': {
          borderRadius: 12,
          '& fieldset': {
            borderColor: gray[800],
            transition: 'border-color 0.2s ease',
          },
          '&:hover fieldset': {
            borderColor: gray[600],
          },
          '&.Mui-focused fieldset': {
            borderColor: rose[500],
          },
        },
      },
    },
    MuiFilledInput: {
      root: {
        borderRadius: '12px 12px 0 0',
        backgroundColor: gray[850],
        '&:hover': {
          backgroundColor: gray[800],
        },
        '&$focused': {
          backgroundColor: gray[800],
        },
      },
    },
    MuiFab: {
      root: {
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.4)',
        borderRadius: 16,
      },
    },
    MuiCard: {
      root: {
        borderRadius: 16,
        boxShadow: '0 2px 12px rgba(0, 0, 0, 0.3)',
        overflow: 'hidden',
        backgroundColor: gray[850],
      },
    },
    MuiDialog: {
      paper: {
        borderRadius: 20,
        backgroundColor: gray[900],
      },
    },
    MuiTooltip: {
      tooltip: {
        borderRadius: 8,
        fontSize: '0.8125rem',
        fontWeight: 500,
        backgroundColor: gray[800],
        color: 'rgba(255, 255, 255, 0.9)',
        padding: '6px 12px',
      },
    },
    MuiSwitch: {
      root: {
        padding: 8,
      },
      switchBase: {
        '&$checked': {
          color: rose[500],
        },
      },
      colorPrimary: {
        '&$checked': {
          color: rose[500],
        },
      },
      track: {
        borderRadius: 100,
        backgroundColor: gray[700],
        '$checked$data-checked + &': {
          backgroundColor: 'rgba(252, 60, 68, 0.5)',
        },
      },
    },
    MuiSlider: {
      root: {
        color: rose[500],
      },
      thumb: {
        boxShadow: '0 0 0 4px rgba(252, 60, 68, 0.15)',
        transition: 'box-shadow 0.2s ease',
        '&:hover': {
          boxShadow: '0 0 0 6px rgba(252, 60, 68, 0.2)',
        },
      },
    },
    RaLayout: {
      root: {
        backgroundColor: gray[950],
      },
      content: {
        padding: '28px 32px !important',
        backgroundColor: gray[950],
      },
    },
    RaSidebar: {
      root: {
        height: 'initial',
        backgroundColor: 'transparent',
      },
      drawerPaper: {
        backgroundColor: 'transparent',
      },
    },
    RaList: {
      content: {
        backgroundColor: 'transparent',
      },
      main: {
        backgroundColor: 'transparent',
      },
    },
    RaListToolbar: {
      toolbar: {
        padding: '0 4px !important',
        minHeight: 52,
      },
    },
    RaSearchInput: {
      input: {
        '& .MuiInputBase-root': {
          borderRadius: '10px !important',
          backgroundColor: gray[850],
          border: `1px solid ${gray[800]}`,
          color: 'rgba(255, 255, 255, 0.9)',
          transition: 'all 0.2s ease',
          '& fieldset': {
            borderColor: 'transparent',
          },
          '&:hover': {
            borderColor: gray[600],
          },
          '&.Mui-focused': {
            borderColor: rose[500],
            backgroundColor: gray[800],
          },
          '&.Mui-focused fieldset': {
            borderColor: rose[500],
          },
          '& svg': {
            color: `${gray[500]} !important`,
          },
        },
      },
    },
    RaPaginationActions: {
      button: {
        backgroundColor: 'transparent',
        borderRadius: 100,
        margin: '0 3px',
        minWidth: 36,
        height: 36,
        border: `1px solid ${gray[800]}`,
        color: 'rgba(255, 255, 255, 0.7)',
        transition: 'all 0.15s ease',
        '&:hover': {
          backgroundColor: 'rgba(255, 255, 255, 0.05)',
          borderColor: gray[600],
        },
      },
      currentPageButton: {
        backgroundColor: rose[500],
        color: '#fff',
        borderColor: rose[500],
        fontWeight: 600,
        '&:hover': {
          backgroundColor: rose[600],
        },
      },
    },
    NDAlbumGridView: {
      albumContainer: {
        backgroundColor: 'transparent',
        borderRadius: 0,
        padding: '0 0 16px 0',
        transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        cursor: 'pointer',
        '&:hover': {
          backgroundColor: 'transparent',
          transform: 'scale(1.03)',
        },
      },
      albumName: {
        marginTop: 8,
        fontWeight: 600,
        fontSize: '0.9375rem',
        color: 'rgba(255, 255, 255, 0.9)',
        letterSpacing: '-0.01em',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
      },
      albumSubtitle: {
        color: gray[500],
        fontSize: '0.8125rem',
        fontWeight: 400,
        marginTop: 2,
      },
      albumPlayButton: {
        backgroundColor: 'rgba(252, 60, 68, 0.9)',
        borderRadius: '50%',
        boxShadow: '0 8px 24px rgba(252, 60, 68, 0.4)',
        transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
        opacity: 0,
        transform: 'translateY(8px)',
        backdropFilter: 'blur(10px)',
        '&:hover': {
          backgroundColor: `${rose[400]} !important`,
          transform: 'scale(1.1) translateY(4px)',
          boxShadow: '0 12px 32px rgba(252, 60, 68, 0.5)',
        },
      },
      albumContainerHover: {
        '&:hover $albumPlayButton': {
          opacity: 1,
          transform: 'translateY(0)',
        },
      },
    },
    NDAlbumDetails: {
      root: {
        background: `linear-gradient(180deg, ${gray[800]} 0%, transparent 100%)`,
        borderRadius: 0,
        boxShadow: 'none',
        padding: '32px 24px',
      },
      recordName: {
        fontSize: '2.5rem',
        fontWeight: 700,
        letterSpacing: '-0.04em',
        color: 'rgba(255, 255, 255, 0.95)',
        lineHeight: 1.1,
      },
      recordArtist: {
        fontSize: '1.0625rem',
        fontWeight: 500,
        color: rose[500],
        marginTop: 6,
      },
      recordMeta: {
        fontSize: '0.875rem',
        color: gray[500],
        marginTop: 4,
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
        boxShadow: `inset 0 0 0 2000px rgba(10, 10, 10, 0.88)`,
      },
      systemNameLink: {
        color: rose[500],
      },
      welcome: {
        color: 'rgba(255, 255, 255, 0.9)',
        fontWeight: 300,
      },
      card: {
        minWidth: 360,
        backgroundColor: 'rgba(28, 28, 30, 0.92)',
        backdropFilter: 'saturate(180%) blur(40px)',
        WebkitBackdropFilter: 'saturate(180%) blur(40px)',
        borderRadius: 24,
        border: '1px solid rgba(255, 255, 255, 0.06)',
        boxShadow: '0 30px 60px -12px rgba(0, 0, 0, 0.6)',
      },
      avatar: {
        marginBottom: 8,
      },
      button: {
        borderRadius: 100,
        boxShadow: '0 4px 16px rgba(252, 60, 68, 0.3)',
        textTransform: 'none',
        fontWeight: 600,
        fontSize: '1rem',
        padding: '12px 32px',
      },
    },
    NDMobileArtistDetails: {
      bgContainer: {
        background: `linear-gradient(to bottom, rgba(28, 28, 30, 0.88), ${gray[950]})`,
      },
    },
    NDAudioPlayer: {
      audioTitle: {
        color: 'rgba(255, 255, 255, 0.9)',
      },
      songTitle: {
        fontWeight: 600,
        fontSize: '0.9375rem',
        letterSpacing: '-0.01em',
      },
      songInfo: {
        color: gray[500],
        fontSize: '0.8125rem',
      },
    },
    NDPlaylistDetails: {
      container: {
        background: `linear-gradient(180deg, ${gray[800]} 0%, transparent 100%)`,
        borderRadius: 0,
        boxShadow: 'none',
        paddingTop: '2.5rem !important',
      },
      title: {
        fontWeight: 700,
        letterSpacing: '-0.03em',
        fontSize: '2.25rem',
        color: 'rgba(255, 255, 255, 0.95)',
      },
      details: {
        fontSize: '0.875rem',
        color: gray[500],
      },
    },
  },
  player: {
    theme: 'dark',
    stylesheet,
  },
}
