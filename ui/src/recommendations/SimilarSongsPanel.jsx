import React, { useCallback, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslate } from 'react-admin'
import { makeStyles } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import Typography from '@material-ui/core/Typography'
import Fade from '@material-ui/core/Fade'
import { MdPlayArrow, MdQueue, MdClose, MdAutorenew } from 'react-icons/md'
import { IoMdHeartEmpty, IoMdHeart } from 'react-icons/io'
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
    backgroundColor: theme.palette.background.paper,
    borderRadius: 16,
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(148, 163, 184, 0.06)',
    zIndex: 1300,
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    [theme.breakpoints.down('sm')]: {
      right: 8,
      left: 8,
      width: 'auto',
      bottom: 72,
      maxHeight: 'calc(100vh - 140px)',
    },
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '14px 16px',
    borderBottom: '1px solid rgba(148, 163, 184, 0.08)',
    backgroundColor: theme.palette.background.default,
  },
  headerLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    flex: 1,
    minWidth: 0,
  },
  headerTitle: {
    fontWeight: 600,
    fontSize: '0.9375rem',
    letterSpacing: '-0.01em',
    color: theme.palette.text.primary,
  },
  autoplayToggle: {
    display: 'flex',
    alignItems: 'center',
    gap: 4,
    cursor: 'pointer',
    padding: '4px 10px',
    borderRadius: 8,
    transition: 'background-color 0.15s ease',
    '&:hover': {
      backgroundColor: 'rgba(99, 102, 241, 0.08)',
    },
  },
  autoplayLabel: {
    fontSize: '0.6875rem',
    fontWeight: 500,
    color: theme.palette.text.secondary,
    textTransform: 'uppercase',
    letterSpacing: '0.04em',
  },
  autoplaySwitch: {
    width: 32,
    height: 18,
    borderRadius: 9,
    backgroundColor: (props) =>
      props.autoplay ? theme.palette.primary.main : theme.palette.action.disabled,
    position: 'relative',
    transition: 'background-color 0.2s ease',
    flexShrink: 0,
  },
  autoplayKnob: {
    width: 14,
    height: 14,
    borderRadius: '50%',
    backgroundColor: '#fff',
    position: 'absolute',
    top: 2,
    left: (props) => (props.autoplay ? 16 : 2),
    transition: 'left 0.2s ease',
    boxShadow: '0 1px 3px rgba(0,0,0,0.3)',
  },
  headerActions: {
    display: 'flex',
    alignItems: 'center',
    gap: 2,
  },
  iconButton: {
    padding: 6,
    color: theme.palette.text.secondary,
    '&:hover': {
      color: theme.palette.text.primary,
    },
  },
  listContainer: {
    overflowY: 'auto',
    overflowX: 'hidden',
    flex: 1,
    padding: '8px 0',
    '&::-webkit-scrollbar': {
      width: 4,
    },
    '&::-webkit-scrollbar-track': {
      background: 'transparent',
    },
    '&::-webkit-scrollbar-thumb': {
      background: theme.palette.action.disabled,
      borderRadius: 2,
    },
  },
  songItem: {
    display: 'flex',
    alignItems: 'center',
    padding: '8px 14px',
    gap: 12,
    cursor: 'pointer',
    transition: 'background-color 0.12s ease',
    '&:hover': {
      backgroundColor: 'rgba(99, 102, 241, 0.06)',
    },
    '&:hover $songActions': {
      opacity: 1,
    },
  },
  coverArt: {
    width: 44,
    height: 44,
    borderRadius: 8,
    objectFit: 'cover',
    flexShrink: 0,
    backgroundColor: theme.palette.action.hover,
  },
  songInfo: {
    flex: 1,
    minWidth: 0,
  },
  songTitle: {
    fontSize: '0.8125rem',
    fontWeight: 500,
    color: theme.palette.text.primary,
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
    gap: 1,
    opacity: 0,
    transition: 'opacity 0.15s ease',
    flexShrink: 0,
  },
  actionButton: {
    padding: 4,
    color: theme.palette.text.secondary,
    '&:hover': {
      color: theme.palette.text.primary,
      backgroundColor: 'rgba(99, 102, 241, 0.1)',
    },
  },
  emptyState: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '32px 24px',
    gap: 12,
  },
  emptyIcon: {
    fontSize: 32,
    color: theme.palette.text.secondary,
    opacity: 0.5,
  },
  emptyText: {
    fontSize: '0.8125rem',
    color: theme.palette.text.secondary,
    textAlign: 'center',
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
        <Tooltip title={translate('resources.song.actions.addToQueue')} enterDelay={300}>
          <IconButton
            size="small"
            className={classes.actionButton}
            onClick={handleAddToQueue}
          >
            <MdQueue size={16} />
          </IconButton>
        </Tooltip>
        <Tooltip title={translate('resources.song.actions.playNext')} enterDelay={300}>
          <IconButton
            size="small"
            className={classes.actionButton}
            onClick={handlePlayNext}
          >
            <MdAutorenew size={14} />
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
      return () =>
        document.removeEventListener('mousedown', handleClickOutside)
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
          </div>
          <div
            className={classes.autoplayToggle}
            onClick={handleToggleAutoplay}
          >
            <span className={classes.autoplayLabel}>
              {autoplay ? 'Auto' : 'Manual'}
            </span>
            <div className={classes.autoplaySwitch}>
              <div className={classes.autoplayKnob} />
            </div>
          </div>
          <div className={classes.headerActions}>
            <IconButton size="small" className={classes.iconButton} onClick={handleClose}>
              <MdClose size={18} />
            </IconButton>
          </div>
        </div>
        <div className={classes.listContainer}>
          {loading && (
            <div className={classes.emptyState}>
              <MdAutorenew size={28} className={classes.emptyIcon} />
              <Typography className={classes.emptyText}>
                Loading recommendations...
              </Typography>
            </div>
          )}
          {!loading &&
            songs &&
            songs.map((song, idx) => (
              <RecommendationItem key={song.id || idx} song={song} index={idx} />
            ))}
        </div>
      </div>
    </Fade>
  )
}

export default SimilarSongsPanel
