import React, { useCallback, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslate } from 'react-admin'
import { makeStyles } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import Typography from '@material-ui/core/Typography'
import Fade from '@material-ui/core/Fade'
import { MdPlayArrow, MdQueue, MdClose, MdSkipNext } from 'react-icons/md'
import { LoveButton, useToggleLove } from '../common'
import { addTracks, playTracks, playNext } from '../actions'
import {
  hideRecommendations,
  setAutoplayRecommendations,
} from '../actions/recommendations'
import subsonic from '../subsonic'

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'fixed',
    bottom: 80,
    right: 16,
    width: 380,
    maxWidth: 'calc(100vw - 32px)',
    maxHeight: 'calc(100vh - 160px)',
    backgroundColor: 'rgba(23, 23, 23, 0.92)',
    backdropFilter: 'saturate(180%) blur(40px)',
    WebkitBackdropFilter: 'saturate(180%) blur(40px)',
    borderRadius: 20,
    boxShadow:
      '0 16px 48px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.04)',
    zIndex: 1300,
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    animation: 'slideUp 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    [theme.breakpoints.down('sm')]: {
      right: 8,
      left: 8,
      width: 'auto',
      bottom: 72,
      maxHeight: 'calc(100vh - 140px)',
      borderRadius: 16,
    },
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '14px 16px',
    borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
  },
  headerLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    flex: 1,
    minWidth: 0,
  },
  headerTitle: {
    fontWeight: 700,
    fontSize: '1rem',
    letterSpacing: '-0.02em',
    color: 'rgba(255, 255, 255, 0.95)',
  },
  headerBadge: {
    fontSize: '0.625rem',
    fontWeight: 700,
    color: '#fc3c44',
    backgroundColor: 'rgba(252, 60, 68, 0.12)',
    padding: '2px 8px',
    borderRadius: 6,
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  },
  autoplayToggle: {
    display: 'flex',
    alignItems: 'center',
    gap: 6,
    cursor: 'pointer',
    padding: '4px 10px',
    borderRadius: 8,
    transition: 'background-color 0.15s ease',
    '&:hover': {
      backgroundColor: 'rgba(252, 60, 68, 0.08)',
    },
  },
  autoplayLabel: {
    fontSize: '0.625rem',
    fontWeight: 700,
    color: (props) =>
      props.autoplay
        ? theme.palette.primary.main
        : theme.palette.text.secondary,
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  },
  autoplaySwitch: {
    width: 28,
    height: 16,
    borderRadius: 8,
    backgroundColor: (props) =>
      props.autoplay ? '#fc3c44' : 'rgba(115, 115, 115, 0.2)',
    position: 'relative',
    transition: 'background-color 0.2s ease',
    flexShrink: 0,
  },
  autoplayKnob: {
    width: 12,
    height: 12,
    borderRadius: '50%',
    backgroundColor: '#fff',
    position: 'absolute',
    top: 2,
    left: (props) => (props.autoplay ? 14 : 2),
    transition: 'left 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
    boxShadow: '0 1px 3px rgba(0,0,0,0.3)',
  },
  headerActions: {
    display: 'flex',
    alignItems: 'center',
    gap: 2,
  },
  iconButton: {
    padding: 5,
    color: theme.palette.text.secondary,
    borderRadius: 8,
    '&:hover': {
      color: 'rgba(255, 255, 255, 0.95)',
      backgroundColor: 'rgba(255, 255, 255, 0.06)',
    },
  },
  listContainer: {
    overflowY: 'auto',
    overflowX: 'hidden',
    flex: 1,
    padding: '6px 0',
    '&::-webkit-scrollbar': {
      width: 3,
    },
    '&::-webkit-scrollbar-track': {
      background: 'transparent',
    },
    '&::-webkit-scrollbar-thumb': {
      background: 'rgba(115, 115, 115, 0.2)',
      borderRadius: 2,
    },
  },
  songItem: {
    display: 'flex',
    alignItems: 'center',
    padding: '8px 12px',
    gap: 10,
    cursor: 'pointer',
    transition: 'background-color 0.15s cubic-bezier(0.4, 0, 0.2, 1)',
    borderLeft: '2px solid transparent',
    '&:hover': {
      backgroundColor: 'rgba(252, 60, 68, 0.06)',
      borderLeftColor: '#fc3c44',
    },
    '&:hover $songActions': {
      opacity: 1,
    },
  },
  songIndex: {
    fontSize: '0.6875rem',
    fontWeight: 500,
    color: theme.palette.text.secondary,
    width: 18,
    textAlign: 'center',
    flexShrink: 0,
  },
  coverArt: {
    width: 40,
    height: 40,
    borderRadius: 8,
    objectFit: 'cover',
    flexShrink: 0,
    backgroundColor: 'rgba(115, 115, 115, 0.06)',
  },
  songInfo: {
    flex: 1,
    minWidth: 0,
  },
  songTitle: {
    fontSize: '0.875rem',
    fontWeight: 500,
    color: 'rgba(255, 255, 255, 0.9)',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    lineHeight: 1.4,
  },
  songArtist: {
    fontSize: '0.6875rem',
    color: theme.palette.text.secondary,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    lineHeight: 1.4,
  },
  songActions: {
    display: 'flex',
    alignItems: 'center',
    gap: 0,
    opacity: 0,
    transition: 'opacity 0.15s ease',
    flexShrink: 0,
  },
  actionButton: {
    padding: 4,
    color: theme.palette.text.secondary,
    borderRadius: 6,
    '&:hover': {
      color: 'rgba(255, 255, 255, 0.95)',
      backgroundColor: 'rgba(252, 60, 68, 0.08)',
    },
  },
  playNextButton: {
    padding: 4,
    color: '#fc3c44',
    borderRadius: 6,
    '&:hover': {
      backgroundColor: 'rgba(252, 60, 68, 0.12)',
    },
  },
  emptyState: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '32px 24px',
    gap: 10,
  },
  emptyIcon: {
    fontSize: 28,
    color: theme.palette.text.secondary,
    opacity: 0.4,
    animation: '$spin 2s linear infinite',
  },
  '@keyframes spin': {
    from: { transform: 'rotate(0deg)' },
    to: { transform: 'rotate(360deg)' },
  },
  emptyText: {
    fontSize: '0.8125rem',
    color: theme.palette.text.secondary,
  },
}))

const RecommendationItem = ({ song, index }) => {
  const classes = useStyles({})
  const dispatch = useDispatch()
  const translate = useTranslate()
  const [toggling, toggleLove] = useToggleLove('song', song)

  const handlePlay = useCallback(
    (e) => {
      e.stopPropagation()
      const data = { [song.id]: song }
      dispatch(playTracks(data, [song.id], song.id))
    },
    [dispatch, song],
  )

  const handleAddToQueue = useCallback(
    (e) => {
      e.stopPropagation()
      const data = { [song.id]: song }
      dispatch(addTracks(data, [song.id]))
    },
    [dispatch, song],
  )

  const handlePlayNext = useCallback(
    (e) => {
      e.stopPropagation()
      const data = { [song.id]: song }
      dispatch(playNext(data, [song.id]))
    },
    [dispatch, song],
  )

  const coverUrl = subsonic.getCoverArtUrl(
    { id: song.id, updatedAt: song.updatedAt, album: song.album },
    80,
  )

  return (
    <div className={classes.songItem} onClick={handlePlay}>
      <span className={classes.songIndex}>{index + 1}</span>
      <img
        className={classes.coverArt}
        src={coverUrl}
        alt={song.album}
        loading="lazy"
      />
      <div className={classes.songInfo}>
        <div className={classes.songTitle}>{song.title}</div>
        <div className={classes.songArtist}>
          {song.artist}
          {song.album && <span> · {song.album}</span>}
        </div>
      </div>
      <div className={classes.songActions}>
        <Tooltip
          title={translate('resources.song.actions.playNext')}
          enterDelay={400}
        >
          <IconButton
            size="small"
            className={classes.playNextButton}
            onClick={handlePlayNext}
          >
            <MdSkipNext size={16} />
          </IconButton>
        </Tooltip>
        <Tooltip
          title={translate('resources.song.actions.addToQueue')}
          enterDelay={400}
        >
          <IconButton
            size="small"
            className={classes.actionButton}
            onClick={handleAddToQueue}
          >
            <MdQueue size={15} />
          </IconButton>
        </Tooltip>
        <LoveButton
          record={song}
          resource="song"
          size="small"
          disabled={toggling}
          className={classes.actionButton}
        />
      </div>
    </div>
  )
}

const SimilarSongsPanel = () => {
  const dispatch = useDispatch()
  const translate = useTranslate()
  const recommendations = useSelector((state) => state.recommendations)
  const { songs, autoplay, loading, visible } = recommendations || {}
  const classes = useStyles({ autoplay })
  const panelRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (panelRef.current && !panelRef.current.contains(event.target)) {
        dispatch(hideRecommendations())
      }
    }
    if (visible) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [visible, dispatch])

  const handleClose = useCallback(() => {
    dispatch(hideRecommendations())
  }, [dispatch])

  const handleToggleAutoplay = useCallback(() => {
    dispatch(setAutoplayRecommendations(!autoplay))
  }, [dispatch, autoplay])

  if (!visible || (!loading && (!songs || songs.length === 0))) {
    return null
  }

  return (
    <Fade in={visible} timeout={250}>
      <div className={classes.root} ref={panelRef}>
        <div className={classes.header}>
          <div className={classes.headerLeft}>
            <Typography className={classes.headerTitle}>
              {translate('resources.song.actions.similarSongs', {
                _: 'Up Next',
              })}
            </Typography>
            <span className={classes.headerBadge}>Auto</span>
          </div>
          <div
            className={classes.autoplayToggle}
            onClick={handleToggleAutoplay}
            role="switch"
            aria-checked={autoplay}
            tabIndex={0}
          >
            <span className={classes.autoplayLabel}>
              {autoplay ? 'ON' : 'OFF'}
            </span>
            <div className={classes.autoplaySwitch}>
              <div className={classes.autoplayKnob} />
            </div>
          </div>
          <div className={classes.headerActions}>
            <IconButton
              size="small"
              className={classes.iconButton}
              onClick={handleClose}
            >
              <MdClose size={16} />
            </IconButton>
          </div>
        </div>
        <div className={classes.listContainer}>
          {loading && (
            <div className={classes.emptyState}>
              <MdSkipNext size={24} className={classes.emptyIcon} />
              <Typography className={classes.emptyText}>
                Finding similar songs...
              </Typography>
            </div>
          )}
          {!loading &&
            songs &&
            songs.map((song, idx) => (
              <RecommendationItem
                key={song.id || idx}
                song={song}
                index={idx}
              />
            ))}
        </div>
      </div>
    </Fade>
  )
}

export default SimilarSongsPanel
