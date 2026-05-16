import { makeStyles } from '@material-ui/core/styles'

const useStyle = makeStyles(
  (theme) => ({
    audioTitle: {
      textDecoration: 'none',
      color: theme.palette.text.primary,
    },
    songTitle: {
      fontWeight: 600,
      fontSize: '0.875rem',
      letterSpacing: '-0.01em',
      '&:hover + $qualityInfo': {
        opacity: 1,
      },
    },
    songInfo: {
      display: 'block',
      marginTop: '2px',
      color: theme.palette.text.secondary,
    },
    songAlbum: {
      fontStyle: 'normal',
      fontSize: '0.8125rem',
    },
    qualityInfo: {
      marginTop: '-4px',
      opacity: 0,
      transition: 'all 500ms ease-out',
    },
    player: {
      display: (props) => (props.visible ? 'block' : 'none'),
      '@media screen and (max-width:810px)': {
        '& .sound-operation': {
          display: 'none',
        },
      },
      '@media (prefers-reduced-motion)': {
        '& .music-player-panel .panel-content div.img-rotate': {
          animation: 'none',
        },
      },
      '& .progress-bar-content': {
        display: 'flex',
        flexDirection: 'column',
      },
      '& .play-mode-title': {
        'pointer-events': 'none',
      },
      '& .music-player-panel .panel-content div.img-rotate': {
        animationDuration: (props) => !props.enableCoverAnimation && '0s',
        borderRadius: (props) => (!props.enableCoverAnimation ? '0' : '20px'),
        backgroundSize: 'contain',
        backgroundPosition: 'center',
        boxShadow: '0 12px 40px rgba(0, 0, 0, 0.5)',
      },
      '& .react-jinke-music-player-mobile .react-jinke-music-player-mobile-cover':
        {
          borderRadius: (props) => (!props.enableCoverAnimation ? '0' : '20px'),
          width: (props) => (!props.enableCoverAnimation ? '85%' : '75%'),
          maxWidth: (props) => (!props.enableCoverAnimation ? '600px' : '500px'),
          height: (props) => (!props.enableCoverAnimation && 'auto'),
          aspectRatio: '1/1',
          display: 'flex',
          boxShadow: '0 16px 48px rgba(0, 0, 0, 0.5)',
          overflow: 'hidden',
        },
      '& .react-jinke-music-player-mobile .react-jinke-music-player-mobile-cover img.cover':
        {
          animationDuration: (props) => !props.enableCoverAnimation && '0s',
          objectFit: 'contain',
          borderRadius: (props) => (!props.enableCoverAnimation ? '0' : '20px'),
        },
      '& .react-jinke-music-player-mobile .react-jinke-music-player-mobile-singer':
        {
          display: 'none',
        },
      '& .react-jinke-music-player-mobile .react-jinke-music-player-mobile-switch':
        {
          display: 'none',
        },
      '& .music-player-panel .panel-content .progress-bar-content section.audio-main':
        {
          display: (props) => (props.isRadio ? 'none' : 'inline-flex'),
        },
      '& .react-jinke-music-player-mobile-progress': {
        display: (props) => (props.isRadio ? 'none' : 'flex'),
      },
      '& .music-player-panel': {
        borderRadius: '20px 20px 0 0',
      },
      '& .audio-lists-panel': {
        borderRadius: '20px 20px 0 0',
        overflow: 'hidden',
      },
      '& .audio-lists-panel .audio-lists-panel-header': {
        borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
        padding: '16px 20px',
      },
      '& .audio-lists-panel .audio-lists-panel-header .header-title': {
        fontWeight: 700,
        fontSize: '1.125rem',
        letterSpacing: '-0.02em',
      },
      '& .audio-lists-panel .audio-item': {
        padding: '10px 16px',
        transition: 'all 0.15s cubic-bezier(0.4, 0, 0.2, 1)',
        borderLeft: '2px solid transparent',
        '&:hover': {
          backgroundColor: 'rgba(252, 60, 68, 0.06)',
        },
        '&.playing': {
          borderLeftColor: '#fc3c44',
          backgroundColor: 'rgba(252, 60, 68, 0.08)',
        },
      },
      '& .audio-lists-panel .audio-item .group .player-singer': {
        fontSize: '0.6875rem',
        color: theme.palette.text.secondary,
      },
      '& .audio-lists-panel .audio-item .player-name': {
        fontWeight: 500,
        fontSize: '0.8125rem',
      },
      '& .audio-lists-panel-content': {
        padding: '4px 0',
      },
      '& .react-jinke-music-player-main .music-player-controller': {
        borderRadius: '50%',
        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.3)',
      },
      '& .music-player-panel .panel-content .progress-bar-content .progress': {
        transition: 'width 0.3s linear',
      },
      '& .react-jinke-music-player-mobile .react-jinke-music-player-mobile-toggle': {
        opacity: 0.9,
      },
      '& .music-player-panel .panel-content .rc-slider-handle': {
        border: 'none',
        boxShadow: '0 0 0 4px rgba(252, 60, 68, 0.15)',
        transition: 'box-shadow 0.2s ease',
        '&:active': {
          boxShadow: '0 0 0 6px rgba(252, 60, 68, 0.25)',
        },
      },
      '& .music-player-panel .panel-content .rc-slider-track': {
        height: 4,
      },
      '& .music-player-panel .panel-content .rc-slider-rail': {
        height: 4,
      },
    },
  }),
  { name: 'NDAudioPlayer' },
)

export default useStyle
