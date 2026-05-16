import { useEffect, useMemo, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { playNow } from '../actions'

const AutoplayManager = () => {
  const dispatch = useDispatch()
  const playerState = useSelector((state) => state.player)
  const recommendations = useSelector((state) => state.recommendations)

  const prevCurrentUuidRef = useRef(null)
  const isPlayingAutoplayRef = useRef(false)

  const queue = useMemo(() => playerState.queue || [], [playerState.queue])
  const current = useMemo(
    () => playerState.current || {},
    [playerState.current],
  )
  const { songs, autoplay } = recommendations || {}

  useEffect(() => {
    const currentUuid = current.uuid || null
    const prevUuid = prevCurrentUuidRef.current
    prevCurrentUuidRef.current = currentUuid

    if (!prevUuid || currentUuid) return
    if (!autoplay) return
    if (isPlayingAutoplayRef.current) return

    if (!songs || songs.length === 0) return

    const queueIdSet = new Set()
    queue.forEach((item) => {
      const id = item.trackId || (item.song && item.song.id) || item.id
      if (id) queueIdSet.add(id)
    })

    const nextSong = songs.find((s) => !queueIdSet.has(s.id))
    if (!nextSong) return

    isPlayingAutoplayRef.current = true
    dispatch(playNow({ [nextSong.id]: nextSong }, [nextSong.id]))
    setTimeout(() => {
      isPlayingAutoplayRef.current = false
    }, 1500)
  }, [current, autoplay, songs, queue, dispatch])

  useEffect(() => {
    if (queue.length === 0) {
      prevCurrentUuidRef.current = null
      isPlayingAutoplayRef.current = false
    }
  }, [queue.length])

  return null
}

export default AutoplayManager
