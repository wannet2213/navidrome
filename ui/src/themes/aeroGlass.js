import stylesheet from './aeroGlass.css.js'

// ──────────────────────────────────────────
// Aero Glass Theme — Elegant Dark Obsidian
// ──────────────────────────────────────────

// Accent: Sky Blue (no purple)
const accent = '#0ea5e9'
const accentLight = '#38bdf8'
const accentDark = '#0284c7'

// Neutral palette — True Obsidian
const n = {
  50: '#fafafa',
  100: '#f4f4f5',
  200: '#e4e4e7',
  300: '#d4d4d8',
  400: '#a1a1aa',
  500: '#71717a',
  600: '#52525b',
  700: '#3f3f46',
  750: '#2e2e33',
  800: '#27272a',
  850: '#1e1e22',
  900: '#18181b',
  925: '#131316',
  950: '#09090b',
}

// Glass tokens
const glass = {
  bg: 'rgba(24, 24, 27, 0.55)',
  bgDark: 'rgba(14, 14, 17, 0.65)',
  border: '1px solid rgba(255, 255, 255, 0.06)',
  shadow: '0 1px 3px rgba(0,0,0,0.3), 0 8px 24px rgba(0,0,0,0.25)',
  blur: 'blur(16px) saturate(180%)',
}

export default {
  themeName: 'Aero Glass',
  typography: {
    fontFamily:
      "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    h4: {
      fontWeight: 700,
      letterSpacing: '-0.025em',
    },
    h5: {
      fontWeight: 700,
      letterSpacing: '-0.02em',
    },
    h6: {
      fontWeight: 600,
      letterSpacing: '-0.01em',
    },
    subtitle1: {
      fontWeight: 500,
      letterSpacing: '-0.005em',
    },
    subtitle2: {
      fontWeight: 600,
      letterSpacing: '0.04em',
      textTransform: 'uppercase',
      fontSize: '0.6875rem',
    },
    body1: {
      fontSize: '0.9375rem',
      lineHeight: 1.55,
      fontWeight: 400,
    },
    body2: {
      fontSize: '0.8125rem',
      lineHeight: 1.55,
      fontWeight: 400,
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
      letterSpacing: '-0.005em',
    },
    caption: {
      fontSize: '0.75rem',
      color: n[500],
      letterSpacing: '0.01em',
    },
  },
  palette: {
    primary: {
      light: accentLight,
      main: accent,
      dark: accentDark,
      contrastText: '#fff',
    },
    secondary: {
      main: n[400],
      contrastText: '#fff',
    },
    background: {
      default: n[950],
      paper: n[900],
    },
    text: {
      primary: 'rgba(255, 255, 255, 0.95)',
      secondary: n[500],
    },
    divider: 'rgba(255, 255, 255, 0.06)',
    action: {
      hover: 'rgba(255, 255, 255, 0.05)',
      selected: 'rgba(14, 165, 233, 0.12)',
    },
    type: 'dark',
  },
  shape: {
    borderRadius: 12,
  },
  overrides: {
    // ───── Global ─────
    MuiCssBaseline: {
      '@global': {
        '*': {
          scrollbarWidth: 'thin',
          scrollbarColor: `${n[700]} transparent`,
        },
        body: {
          backgroundColor: n[950],
          backgroundImage: `radial-gradient(circle at 50% 0%, ${n[850]} 0%, ${n[950]} 70%)`,
          backgroundAttachment: 'fixed',
        },
      },
    },

    // ───── Paper / Card surfaces ─────
    MuiPaper: {
      root: {
        backgroundImage: 'none',
        backgroundColor: glass.bg,
        backdropFilter: glass.blur,
        WebkitBackdropFilter: glass.blur,
        border: glass.border,
      },
      rounded: {
        borderRadius: 16,
      },
      elevation1: {
        boxShadow: glass.shadow,
      },
      elevation2: {
        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.4)',
      },
    },

    // ───── Buttons ─────
    MuiButton: {
      root: {
        borderRadius: 8,
        textTransform: 'none',
        fontWeight: 600,
        padding: '8px 20px',
        fontSize: '0.875rem',
        transition: 'all 0.2s ease',
      },
      contained: {
        boxShadow: 'none',
        '&:hover': {
          boxShadow: `0 4px 14px rgba(14, 165, 233, 0.35)`,
          transform: 'translateY(-1px)',
        },
        '&:active': {
          transform: 'scale(0.98)',
        },
      },
      containedPrimary: {
        backgroundColor: accent,
        '&:hover': {
          backgroundColor: accentLight,
        },
      },
      outlined: {
        borderWidth: 1,
        borderColor: n[700],
        color: 'rgba(255, 255, 255, 0.85)',
        '&:hover': {
          borderWidth: 1,
          borderColor: 'rgba(255, 255, 255, 0.25)',
          backgroundColor: 'rgba(255, 255, 255, 0.04)',
        },
      },
      text: {
        '&:hover': {
          backgroundColor: 'rgba(255, 255, 255, 0.06)',
        },
      },
      textPrimary: {
        color: accent,
        '&:hover': {
          backgroundColor: 'rgba(14, 165, 233, 0.08)',
        },
      },
    },

    // ───── Icon buttons ─────
    MuiIconButton: {
      root: {
        borderRadius: '50%',
        padding: 10,
        transition: 'all 0.2s ease',
        '&:hover': {
          backgroundColor: 'rgba(255, 255, 255, 0.08)',
          transform: 'scale(1.05)',
        },
        '&:active': {
          transform: 'scale(0.95)',
        },
      },
    },

    // ───── App Bar ─────
    MuiAppBar: {
      root: {
        boxShadow: 'none',
        borderBottom: glass.border,
      },
      colorDefault: {
        backgroundColor: 'rgba(9, 9, 11, 0.75)',
        backdropFilter: glass.blur,
        WebkitBackdropFilter: glass.blur,
      },
      colorSecondary: {
        backgroundColor: 'rgba(9, 9, 11, 0.75)',
        backdropFilter: glass.blur,
        WebkitBackdropFilter: glass.blur,
      },
    },

    // ───── Sidebar / Drawer ─────
    MuiDrawer: {
      root: {
        borderRight: 'none',
      },
      paper: {
        backgroundColor: 'rgba(14, 14, 17, 0.5)',
        backdropFilter: glass.blur,
        WebkitBackdropFilter: glass.blur,
        borderRight: glass.border,
      },
      paperAnchorDockedLeft: {
        borderRight: glass.border,
      },
    },

    // ───── List items (sidebar navigation) ─────
    MuiListItem: {
      root: {
        borderRadius: 8,
        margin: '2px 8px',
        paddingLeft: 12,
        paddingRight: 12,
        transition: 'all 0.15s ease',
        '&$selected': {
          backgroundColor: 'rgba(14, 165, 233, 0.12)',
          '&:hover': {
            backgroundColor: 'rgba(14, 165, 233, 0.18)',
          },
          '& .MuiListItemIcon-root': {
            color: accent,
          },
          '& .MuiListItemText-primary': {
            color: accent,
            fontWeight: 600,
          },
        },
      },
    },
    MuiListItemIcon: {
      root: {
        color: n[500],
        minWidth: 36,
        '& svg': {
          fontSize: 20,
        },
      },
    },
    MuiListItemText: {
      primary: {
        fontSize: '0.875rem',
        fontWeight: 400,
        color: 'rgba(255, 255, 255, 0.8)',
      },
    },

    // ───── Menu items ─────
    MuiMenuItem: {
      root: {
        borderRadius: 8,
        margin: '1px 8px',
        fontSize: '0.875rem',
        padding: '8px 12px',
        '&:hover': {
          backgroundColor: 'rgba(255, 255, 255, 0.05)',
        },
      },
    },

    // ───── Tables ─────
    MuiTableCell: {
      root: {
        borderBottom: '1px solid rgba(255, 255, 255, 0.04)',
        padding: '12px 16px',
        color: 'rgba(255, 255, 255, 0.8)',
        fontSize: '0.875rem',
      },
      head: {
        borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
        color: n[500],
        fontSize: '0.6875rem',
        fontWeight: 600,
        textTransform: 'uppercase',
        letterSpacing: '0.06em',
      },
    },
    MuiTableRow: {
      root: {
        transition: 'background-color 0.15s ease',
        '&:hover': {
          backgroundColor: 'rgba(255, 255, 255, 0.03) !important',
        },
      },
    },

    // ───── Dividers ─────
    MuiDivider: {
      root: {
        backgroundColor: 'rgba(255, 255, 255, 0.06)',
        margin: '8px 0',
      },
    },

    // ───── Chips ─────
    MuiChip: {
      root: {
        borderRadius: 6,
        fontWeight: 500,
        fontSize: '0.75rem',
        backgroundColor: 'rgba(255, 255, 255, 0.06)',
        color: 'rgba(255, 255, 255, 0.8)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
      },
    },

    // ───── Text fields ─────
    MuiTextField: {
      root: {
        '& .MuiOutlinedInput-root': {
          borderRadius: 8,
          '& fieldset': {
            borderColor: n[750],
            transition: 'border-color 0.2s ease',
          },
          '&:hover fieldset': {
            borderColor: n[600],
          },
          '&.Mui-focused fieldset': {
            borderColor: accent,
          },
        },
      },
    },
    MuiFilledInput: {
      root: {
        borderRadius: '8px 8px 0 0',
        backgroundColor: n[850],
        '&:hover': {
          backgroundColor: n[800],
        },
        '&$focused': {
          backgroundColor: n[800],
        },
      },
    },

    // ───── FABs ─────
    MuiFab: {
      root: {
        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.4)',
        borderRadius: 12,
      },
    },

    // ───── Cards ─────
    MuiCard: {
      root: {
        borderRadius: 12,
        boxShadow: glass.shadow,
        overflow: 'hidden',
        backgroundColor: glass.bg,
        backdropFilter: glass.blur,
        border: glass.border,
      },
    },

    // ───── Dialogs ─────
    MuiDialog: {
      paper: {
        borderRadius: 16,
        backgroundColor: glass.bgDark,
        backdropFilter: glass.blur,
        border: glass.border,
      },
    },

    // ───── Tooltips ─────
    MuiTooltip: {
      tooltip: {
        borderRadius: 6,
        fontSize: '0.75rem',
        fontWeight: 500,
        backgroundColor: n[800],
        color: 'rgba(255, 255, 255, 0.9)',
        padding: '6px 10px',
        border: glass.border,
      },
    },

    // ───── Switches ─────
    MuiSwitch: {
      root: {
        padding: 8,
      },
      switchBase: {
        '&$checked': {
          color: accent,
        },
      },
      colorPrimary: {
        '&$checked': {
          color: accent,
        },
      },
      track: {
        borderRadius: 100,
        backgroundColor: n[700],
      },
    },

    // ───── Sliders ─────
    MuiSlider: {
      root: {
        color: accent,
      },
      thumb: {
        boxShadow: '0 0 0 4px rgba(14, 165, 233, 0.15)',
        transition: 'box-shadow 0.2s ease',
        '&:hover': {
          boxShadow: '0 0 0 6px rgba(14, 165, 233, 0.2)',
        },
      },
    },

    // ───── Popover / Menus ─────
    MuiPopover: {
      paper: {
        backgroundColor: glass.bgDark,
        backdropFilter: glass.blur,
        border: glass.border,
      },
    },
    MuiMenu: {
      paper: {
        backgroundColor: glass.bgDark,
        backdropFilter: glass.blur,
        border: glass.border,
      },
    },

    // ───── Autocomplete ─────
    MuiAutocomplete: {
      popper: {
        background: n[900],
      },
    },

    // ───── Tabs ─────
    MuiTab: {
      root: {
        textTransform: 'none',
        fontWeight: 500,
      },
    },

    // ═══════════════════════════════════════
    // React-Admin specific overrides
    // ═══════════════════════════════════════
    RaLayout: {
      root: {
        backgroundColor: 'transparent',
      },
      appFrame: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      },
      contentWithSidebar: {
        display: 'flex',
        flexGrow: 1,
        overflow: 'hidden',
      },
      content: {
        padding: '24px 28px !important',
        backgroundColor: 'transparent',
        flexGrow: 1,
        overflowY: 'auto',
        overflowX: 'hidden',
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
        boxShadow: 'none',
        border: 'none',
      },
      main: {
        backgroundColor: 'transparent',
      },
    },
    RaListToolbar: {
      toolbar: {
        padding: '0 4px !important',
        minHeight: 48,
      },
    },
    RaSearchInput: {
      input: {
        '& .MuiInputBase-root': {
          borderRadius: '8px !important',
          backgroundColor: n[850],
          border: `1px solid ${n[750]}`,
          color: 'rgba(255, 255, 255, 0.9)',
          transition: 'all 0.2s ease',
          '& fieldset': {
            borderColor: 'transparent',
          },
          '&:hover': {
            borderColor: n[600],
          },
          '&.Mui-focused': {
            borderColor: accent,
            backgroundColor: n[800],
          },
          '& svg': {
            color: `${n[500]} !important`,
          },
        },
      },
    },
    RaPaginationActions: {
      button: {
        backgroundColor: 'transparent',
        borderRadius: 8,
        margin: '0 3px',
        minWidth: 34,
        height: 34,
        border: `1px solid ${n[750]}`,
        color: 'rgba(255, 255, 255, 0.65)',
        transition: 'all 0.15s ease',
        '&:hover': {
          backgroundColor: 'rgba(255, 255, 255, 0.05)',
          borderColor: n[600],
        },
      },
      currentPageButton: {
        backgroundColor: accent,
        color: '#fff',
        borderColor: accent,
        fontWeight: 600,
        '&:hover': {
          backgroundColor: accentDark,
        },
      },
    },
    RaMenuItemLink: {
      active: {
        color: `${accent} !important`,
        fontWeight: 600,
        '& .MuiListItemIcon-root': {
          color: accent,
        },
      },
    },

    // ═══════════════════════════════════════
    // Navidrome custom component overrides
    // ═══════════════════════════════════════

    // ───── Album Grid ─────
    NDAlbumGridView: {
      albumContainer: {
        backgroundColor: 'transparent',
        borderRadius: 0,
        padding: '0 0 16px 0',
        transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        cursor: 'pointer',
        '&:hover': {
          backgroundColor: 'transparent',
          transform: 'scale(1.03)',
        },
      },
      albumName: {
        marginTop: 8,
        fontWeight: 600,
        fontSize: '0.875rem',
        color: 'rgba(255, 255, 255, 0.9)',
        letterSpacing: '-0.01em',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
      },
      albumSubtitle: {
        color: n[500],
        fontSize: '0.8125rem',
        fontWeight: 400,
        marginTop: 2,
      },
      albumPlayButton: {
        backgroundColor: 'rgba(14, 165, 233, 0.9)',
        borderRadius: '50%',
        boxShadow: '0 6px 20px rgba(14, 165, 233, 0.4)',
        transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
        opacity: 0,
        transform: 'translateY(8px)',
        '&:hover': {
          backgroundColor: `${accentLight} !important`,
          transform: 'scale(1.1) translateY(4px)',
          boxShadow: '0 10px 28px rgba(14, 165, 233, 0.5)',
        },
      },
      albumContainerHover: {
        '&:hover $albumPlayButton': {
          opacity: 1,
          transform: 'translateY(0)',
        },
      },
    },

    // ───── Album Details ─────
    NDAlbumDetails: {
      root: {
        background: `linear-gradient(180deg, ${n[800]} 0%, transparent 100%)`,
        borderRadius: 0,
        boxShadow: 'none',
        border: 'none',
        padding: '32px 24px',
      },
      recordName: {
        fontSize: '2.25rem',
        fontWeight: 700,
        letterSpacing: '-0.03em',
        color: 'rgba(255, 255, 255, 0.95)',
        lineHeight: 1.1,
      },
      recordArtist: {
        fontSize: '1rem',
        fontWeight: 500,
        color: accent,
        marginTop: 6,
      },
      recordMeta: {
        fontSize: '0.8125rem',
        color: n[500],
        marginTop: 4,
      },
    },

    // ───── Artist Pages ─────
    NDArtistShow: {
      actions: {
        padding: '1.5rem 0',
        alignItems: 'center',
      },
    },

    // ───── Login Page ─────
    NDLogin: {
      main: {
        boxShadow: `inset 0 0 0 2000px rgba(9, 9, 11, 0.85)`,
      },
      systemNameLink: {
        color: accent,
      },
      welcome: {
        color: 'rgba(255, 255, 255, 0.8)',
        fontWeight: 300,
      },
      card: {
        minWidth: 360,
        backgroundColor: 'rgba(24, 24, 27, 0.55)',
        backdropFilter: 'blur(20px) saturate(180%)',
        WebkitBackdropFilter: 'blur(20px) saturate(180%)',
        borderRadius: 20,
        border: '1px solid rgba(255, 255, 255, 0.06)',
        boxShadow: '0 25px 50px rgba(0, 0, 0, 0.5)',
      },
      avatar: {
        marginBottom: 8,
      },
      button: {
        borderRadius: 8,
        boxShadow: `0 4px 14px rgba(14, 165, 233, 0.3)`,
        textTransform: 'none',
        fontWeight: 600,
        fontSize: '1rem',
        padding: '12px 32px',
      },
    },

    // ───── Mobile Artist ─────
    NDMobileArtistDetails: {
      bgContainer: {
        background: `linear-gradient(to bottom, rgba(24, 24, 27, 0.85), ${n[950]})`,
      },
    },

    // ───── Audio Player ─────
    NDAudioPlayer: {
      audioTitle: {
        color: 'rgba(255, 255, 255, 0.9)',
      },
      songTitle: {
        fontWeight: 600,
        fontSize: '0.875rem',
        letterSpacing: '-0.01em',
      },
      songInfo: {
        color: n[500],
        fontSize: '0.8125rem',
      },
    },

    // ───── Playlist Details ─────
    NDPlaylistDetails: {
      container: {
        background: `linear-gradient(180deg, ${n[800]} 0%, transparent 100%)`,
        borderRadius: 0,
        boxShadow: 'none',
        border: 'none',
        paddingTop: '2.5rem !important',
      },
      title: {
        fontWeight: 700,
        letterSpacing: '-0.03em',
        fontSize: '2rem',
        color: 'rgba(255, 255, 255, 0.95)',
      },
      details: {
        fontSize: '0.8125rem',
        color: n[500],
      },
    },

    // ───── SubMenu ─────
    NDSubMenu: {
      icon: {
        color: n[500],
      },
    },
  },
  player: {
    theme: 'dark',
    stylesheet,
  },
}
