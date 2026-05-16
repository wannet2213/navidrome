import React, { useCallback, useEffect, useMemo, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslate } from 'react-admin'
import { makeStyles } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import Typography from '@material-ui/core/Typography'
import Fade from '@material-ui/core/Fade'
import {
  MdClose,
  MdSkipNext,
  MdQueue,
  MdMusicNote,
  MdRefresh,
} from 'react-icons/md'
import { LoveButton, useToggleLove } from '../common'
import { addTracks, playNext, playFromQueue, playNow } from '../actions'
import {
  hideRecommendations,
  setAutoplayRecommendations,
  refreshRecommendations,
  consumeRecommendation,
} from '../actions/recommendations'
import subsonic from '../subsonic'

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'fixed',
    bottom: 80,
    right: 16,
    width: 400,
    maxWidth: 'calc(100vw - 32px)',
    maxHeight: 'calc(100vh - 160px)',
    backgroundColor: 'rgba(23, 23, 23, 0.95)',
    backdropFilter: 'saturate(180%) blur(40px)',
    WebkitBackdropFilter: 'saturate(180%) blur(40px)',
    borderRadius: 20,
    boxShadow:
      '0 20px 60px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.04)',
    zIndex: 1300,
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    animation: '$slideUp 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    [theme.breakpoints.down('sm')]: {
      right: 8,
      left: 8,
      width: 'auto',
      bottom: 72,
      maxHeight: 'calc(100vh - 140px)',
      borderRadius: 16,
    },
  },
  '@keyframes slideUp': {
    from: { opacity: 0, transform: 'translateY(20px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '12px 16px',
    flexShrink: 0,
    borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
  },
  headerLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    flex: 1,
    minWidth: 0,
  },
  headerTitle: {
    fontWeight: 700,
    fontSize: '1.0625rem',
    letterSpacing: '-0.02em',
    color: 'rgba(255, 255, 255, 0.95)',
  },
  headerBadge: {
    fontSize: '0.625rem',
    fontWeight: 700,
    color: 'rgba(255, 255, 255, 0.45)',
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    padding: '2px 7px',
    borderRadius: 6,
  },
  iconButton: {
    padding: 6,
    color: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 8,
    transition: 'all 0.15s cubic-bezier(0.4, 0, 0.2, 1)',
    '&:hover': {
      color: 'rgba(255, 255, 255, 0.95)',
      backgroundColor: 'rgba(255, 255, 255, 0.06)',
    },
  },
  controlsRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '8px 16px',
    flexShrink: 0,
    minHeight: 40,
  },
  autoplayToggle: {
    display: 'flex',
    alignItems: 'center',
    gap: 6,
    cursor: 'pointer',
    padding: '3px 8px',
    borderRadius: 8,
    transition: 'background-color 0.15s ease',
    '&:hover': {
      backgroundColor: 'rgba(252, 60, 68, 0.08)',
    },
  },
  autoplayLabel: {
    fontSize: '0.6875rem',
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '0.04em',
  },
  autoplayLabelOn: {
    color: '#fc3c44',
  },
  autoplayLabelOff: {
    color: 'rgba(255, 255, 255, 0.35)',
  },
  autoplaySwitch: {
    width: 28,
    height: 16,
    borderRadius: 8,
    position: 'relative',
    transition: 'background-color 0.2s ease',
    flexShrink: 0,
  },
  autoplaySwitchOn: {
    backgroundColor: '#fc3c44',
  },
  autoplaySwitchOff: {
    backgroundColor: 'rgba(115, 115, 115, 0.25)',
  },
  autoplayKnob: {
    width: 12,
    height: 12,
    borderRadius: '50%',
    backgroundColor: '#fff',
    position: 'absolute',
    top: 2,
    transition: 'left 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
    boxShadow: '0 1px 3px rgba(0,0,0,0.3)',
  },
  autoplayKnobOn: {
    left: 14,
  },
  autoplayKnobOff: {
    left: 2,
  },
  addAllButton: {
    fontSize: '0.6875rem',
    fontWeight: 600,
    color: '#fc3c44',
    cursor: 'pointer',
    padding: '3px 8px',
    borderRadius: 6,
    transition: 'all 0.15s ease',
    display: 'flex',
    alignItems: 'center',
    gap: 4,
    '&:hover': {
      backgroundColor: 'rgba(252, 60, 68, 0.1)',
    },
  },
  refreshButton: {
    padding: 4,
    color: 'rgba(255, 255, 255, 0.4)',
    borderRadius: 8,
    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
    display: 'flex',
    alignItems: 'center',
    gap: 4,
    fontSize: '0.6875rem',
    fontWeight: 600,
    cursor: 'pointer',
    '&:hover': {
      color: 'rgba(255, 255, 255, 0.9)',
      backgroundColor: 'rgba(252, 60, 68, 0.08)',
    },
  },
  refreshSpin: {
    animation: '$spin 0.8s linear infinite',
  },
  '@keyframes spin': {
    from: { transform: 'rotate(0deg)' },
    to: { transform: 'rotate(360deg)' },
  },
  scrollContainer: {
    overflowY: 'auto',
    overflowX: 'hidden',
    flex: 1,
    '&::-webkit-scrollbar': {
      width: 4,
    },
    '&::-webkit-scrollbar-track': {
      background: 'transparent',
    },
    '&::-webkit-scrollbar-thumb': {
      background: 'rgba(115, 115, 115, 0.2)',
      borderRadius: 2,
    },
  },
  sectionLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: 6,
    padding: '10px 14px 6px 14px',
    fontSize: '0.6875rem',
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '0.06em',
    color: 'rgba(255, 255, 255, 0.35)',
  },
  divider: {
    height: 1,
    margin: '4px 16px 0 16px',
    background:
      'linear-gradient(to right, transparent, rgba(252, 60, 68, 0.3), rgba(255, 255, 255, 0.08), transparent)',
    flexShrink: 0,
  },
  songItem: {
    display: 'flex',
    alignItems: 'center',
    padding: '7px 12px',
    gap: 10,
    cursor: 'pointer',
    transition: 'all 0.15s cubic-bezier(0.4, 0, 0.2, 1)',
    borderLeft: '2px solid transparent',
    '&:hover': {
      backgroundColor: 'rgba(252, 60, 68, 0.06)',
      borderLeftColor: '#fc3c44',
    },
    '&:hover $songActions': {
      opacity: 1,
    },
  },
  songItemPlaying: {
    backgroundColor: 'rgba(252, 60, 68, 0.08)',
    borderLeftColor: '#fc3c44',
  },
  songIndex: {
    fontSize: '0.6875rem',
    fontWeight: 500,
    width: 18,
    textAlign: 'center',
    flexShrink: 0,
  },
  songIndexPlaying: {
    color: '#fc3c44',
  },
  songIndexDefault: {
    color: 'rgba(255, 255, 255, 0.35)',
  },
  coverArt: {
    width: 38,
    height: 38,
    borderRadius: 8,
    objectFit: 'cover',
    flexShrink: 0,
    backgroundColor: 'rgba(115, 115, 115, 0.06)',
  },
  coverArtPlaying: {
    boxShadow: '0 4px 16px rgba(252, 60, 68, 0.3)',
  },
  songInfo: {
    flex: 1,
    minWidth: 0,
  },
  songTitle: {
    fontSize: '0.8125rem',
    fontWeight: 500,
    color: 'rgba(255, 255, 255, 0.85)',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    lineHeight: 1.4,
  },
  songTitlePlaying: {
    color: '#fc3c44',
    fontWeight: 600,
  },
  songArtist: {
    fontSize: '0.6875rem',
    color: 'rgba(255, 255, 255, 0.4)',
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
    color: 'rgba(255, 255, 255, 0.45)',
    borderRadius: 6,
    transition: 'all 0.15s ease',
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
    padding: '24px 20px',
    gap: 8,
  },
  emptyIcon: {
    fontSize: 24,
    color: 'rgba(255, 255, 255, 0.12)',
  },
  emptyText: {
    fontSize: '0.8125rem',
    color: 'rgba(255, 255, 255, 0.25)',
    fontWeight: 500,
  },
  nowPlayingBars: {
    display: 'inline-flex',
    alignItems: 'flex-end',
    gap: 2,
    height: 12,
  },
  nowPlayingBar: {
    width: 3,
    backgroundColor: '#fc3c44',
    borderRadius: 1,
    animation: '$barPulse 1.2s ease-in-out infinite',
  },
  '@keyframes barPulse': {
    '0%, 100%': { height: '3px' },
    '50%': { height: '12px' },
  },
}))

const QueueItem = ({ item, index, isPlaying }) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const translate = useTranslate()
  const song = item.song || item
  const [toggling, toggleLove] = useToggleLove('song', song)

  const handlePlay = useCallback(
    (e) => {
      e.stopPropagation()
      dispatch(playFromQueue(item.uuid))
    },
    [dispatch, item],
  )

  const handlePlayNext = useCallback(
    (e) => {
      e.stopPropagation()
      const data = { [song.id]: song }
      dispatch(playNext(data, [song.id]))
    },
    [dispatch, song],
  )

  const coverUrl =
    item.cover ||
    subsonic.getCoverArtUrl(
      { id: song.id, updatedAt: song.updatedAt, album: song.album },
      80,
    )

  return (
    <div
      className={`${classes.songItem} ${isPlaying ? classes.songItemPlaying : ''}`}
      onClick={handlePlay}
    >
      <span
        className={`${classes.songIndex} ${isPlaying ? classes.songIndexPlaying : classes.songIndexDefault}`}
      >
        {isPlaying ? (
          <span className={classes.nowPlayingBars}>
            <span
              className={classes.nowPlayingBar}
              style={{ animationDelay: '0s' }}
            />
            <span
              className={classes.nowPlayingBar}
              style={{ animationDelay: '0.2s' }}
            />
            <span
              className={classes.nowPlayingBar}
              style={{ animationDelay: '0.4s' }}
            />
          </span>
        ) : (
          index + 1
        )}
      </span>
      <img
        className={`${classes.coverArt} ${isPlaying ? classes.coverArtPlaying : ''}`}
        src={coverUrl}
        alt=""
        loading="lazy"
      />
      <div className={classes.songInfo}>
        <div
          className={`${classes.songTitle} ${isPlaying ? classes.songTitlePlaying : ''}`}
        >
          {song.title}
        </div>
        <div className={classes.songArtist}>
          {song.artist}
          {song.album && <span> · {song.album}</span>}
        </div>
      </div>
      {!isPlaying && (
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
          <LoveButton
            record={song}
            resource="song"
            size="small"
            disabled={toggling}
            className={classes.actionButton}
          />
        </div>
      )}
    </div>
  )
}

const RecommendationItem = ({ song, index, onPlay }) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const translate = useTranslate()
  const [toggling, toggleLove] = useToggleLove('song', song)

  const handlePlay = useCallback(
    (e) => {
      e.stopPropagation()
      if (!song || !song.id) return
      onPlay(song)
    },
    [onPlay, song],
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
      <span className={`${classes.songIndex} ${classes.songIndexDefault}`}>
        {index + 1}
      </span>
      <img className={classes.coverArt} src={coverUrl} alt="" loading="lazy" />
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

const UnifiedPlayerPanel = () => {
  const dispatch = useDispatch()
  const classes = useStyles()
  const panelRef = useRef(null)

  const playerState = useSelector((state) => state.player)
  const recommendations = useSelector((state) => state.recommendations)
  const queue = useMemo(() => playerState?.queue || [], [playerState?.queue])
  const playIndex = playerState?.savedPlayIndex ?? -1
  const { songs, autoplay, loading, visible } = recommendations || {}
  const isProcessingRef = useRef(false)

  const queueSet = useMemo(() => {
    const set = new Set()
    queue.forEach((item) => {
      const id = item.trackId || (item.song && item.song.id) || item.id
      if (id) set.add(id)
    })
    return set
  }, [queue])

  const filteredRecommendations = useMemo(() => {
    if (!songs) return []
    return songs.filter((song) => !queueSet.has(song.id)).slice(0, 7)
  }, [songs, queueSet])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (panelRef.current && !panelRef.current.contains(event.target)) {
        const playerEl = document.querySelector(
          '.react-jinke-music-player-main',
        )
        if (playerEl && playerEl.contains(event.target)) return
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

  const handleAddAllRecommendations = useCallback(() => {
    if (filteredRecommendations.length === 0) return
    const data = {}
    const ids = []
    filteredRecommendations.forEach((s) => {
      if (!data[s.id]) {
        data[s.id] = s
        ids.push(s.id)
      }
    })
    if (ids.length > 0) dispatch(addTracks(data, ids))
  }, [dispatch, filteredRecommendations])

  const handleRefresh = useCallback(() => {
    dispatch(refreshRecommendations())
  }, [dispatch])

  const handleRecommendationPlay = useCallback(
    (song) => {
      if (isProcessingRef.current) return
      if (!song || !song.id) return
      isProcessingRef.current = true
      const data = { [song.id]: song }
      dispatch(playNow(data, [song.id]))
      dispatch(consumeRecommendation(song.id))
      setTimeout(() => {
        isProcessingRef.current = false
      }, 600)
    },
    [dispatch],
  )

  const currentItemId =
    playerState?.current?.uuid ||
    playerState?.current?.trackId ||
    (playerState?.current?.song && playerState?.current.song.id)

  if (!visible) return null

  return (
    <Fade in={visible} timeout={250}>
      <div className={classes.root} ref={panelRef}>
        <div className={classes.header}>
          <div className={classes.headerLeft}>
            <Typography className={classes.headerTitle}>Play Queue</Typography>
            <span className={classes.headerBadge}>{queue.length} songs</span>
          </div>
          <div>
            <IconButton
              size="small"
              className={classes.iconButton}
              onClick={handleClose}
            >
              <MdClose size={18} />
            </IconButton>
          </div>
        </div>

        <div className={classes.controlsRow}>
          <div
            className={classes.autoplayToggle}
            onClick={handleToggleAutoplay}
            role="switch"
            aria-checked={autoplay}
            tabIndex={0}
          >
            <span
              className={`${classes.autoplayLabel} ${autoplay ? classes.autoplayLabelOn : classes.autoplayLabelOff}`}
            >
              Autoplay
            </span>
            <div
              className={`${classes.autoplaySwitch} ${autoplay ? classes.autoplaySwitchOn : classes.autoplaySwitchOff}`}
            >
              <div
                className={`${classes.autoplayKnob} ${autoplay ? classes.autoplayKnobOn : classes.autoplayKnobOff}`}
              />
            </div>
          </div>
          {filteredRecommendations.length > 0 && (
            <div
              className={classes.addAllButton}
              onClick={handleAddAllRecommendations}
            >
              <MdQueue size={12} />
              Add All
            </div>
          )}
          <Tooltip title="Refresh recommendations" enterDelay={400}>
            <div className={classes.refreshButton} onClick={handleRefresh}>
              <MdRefresh
                size={14}
                className={loading ? classes.refreshSpin : ''}
              />
            </div>
          </Tooltip>
        </div>

        <div className={classes.scrollContainer}>
          {queue.length === 0 ? (
            <div className={classes.emptyState}>
              <MdQueue className={classes.emptyIcon} />
              <Typography className={classes.emptyText}>
                Queue is empty
              </Typography>
            </div>
          ) : (
            queue.map((item, idx) => {
              const song = item.song || item
              const itemId = item.uuid || item.trackId || song.id
              const isPlaying = itemId === currentItemId || idx === playIndex
              return (
                <QueueItem
                  key={item.uuid || itemId || idx}
                  item={item}
                  index={idx}
                  isPlaying={isPlaying}
                />
              )
            })
          )}

          {filteredRecommendations.length > 0 && (
            <>
              <div className={classes.divider} />
              <div className={classes.sectionLabel}>
                <MdMusicNote size={12} />
                Up Next — Autoplay
                <span
                  style={{ color: 'rgba(255,255,255,0.2)', fontWeight: 500 }}
                >
                  ({filteredRecommendations.length})
                </span>
              </div>
              {filteredRecommendations.map((song, idx) => (
                <RecommendationItem
                  key={song.id || idx}
                  song={song}
                  index={idx}
                  onPlay={handleRecommendationPlay}
                />
              ))}
            </>
          )}

          {loading && (
            <div className={classes.emptyState}>
              <MdMusicNote
                className={classes.emptyIcon}
                style={{ animation: 'spin 2s linear infinite' }}
              />
              <Typography className={classes.emptyText}>
                Finding similar songs...
              </Typography>
            </div>
          )}
        </div>
      </div>
    </Fade>
  )
}

export default UnifiedPlayerPanel
