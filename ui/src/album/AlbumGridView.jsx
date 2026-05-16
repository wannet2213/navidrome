import React from 'react'
import {
  GridList,
  GridListTile,
  Typography,
  GridListTileBar,
  useMediaQuery,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import withWidth from '@material-ui/core/withWidth'
import { Link } from 'react-router-dom'
import { linkToRecord, useListContext, Loading } from 'react-admin'
import { withContentRect } from 'react-measure'
import { useDrag } from 'react-dnd'
import subsonic from '../subsonic'
import {
  AlbumContextMenu,
  PlayButton,
  ArtistLinkField,
  OverflowTooltip,
  useImageUrl,
} from '../common'
import config from '../config'
import { DraggableTypes } from '../consts'
import clsx from 'clsx'
import { AlbumDatesField } from './AlbumDatesField.jsx'

const useStyles = makeStyles(
  (theme) => ({
    root: {
      margin: '20px',
      display: 'grid',
    },
    tileBar: {
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      opacity: 0,
      pointerEvents: 'none',
      textAlign: 'left',
      background:
        'linear-gradient(to top, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 60%,rgba(0,0,0,0) 100%)',
    },
    tileBarMobile: {
      textAlign: 'left',
      background:
        'linear-gradient(to top, rgba(0,0,0,0.6) 0%,rgba(0,0,0,0.2) 60%,rgba(0,0,0,0) 100%)',
    },
    albumArtistName: {
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      textAlign: 'left',
      fontSize: '0.875rem',
      fontWeight: 400,
    },
    albumName: {
      fontSize: '0.9375rem',
      fontWeight: 600,
      color: 'rgba(255, 255, 255, 0.9)',
      letterSpacing: '-0.01em',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
      marginTop: 8,
    },
    missingAlbum: {
      opacity: 0.3,
    },
    albumVersion: {
      fontSize: '0.8125rem',
      color: 'rgba(255, 255, 255, 0.45)',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
    },
    albumSubtitle: {
      fontSize: '0.8125rem',
      color: 'rgba(255, 255, 255, 0.45)',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
      marginTop: 2,
    },
    link: {
      position: 'relative',
      display: 'block',
      textDecoration: 'none',
      borderRadius: 12,
      overflow: 'hidden',
      transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      '&:hover': {
        transform: 'scale(1.03)',
      },
      '&:hover $tileBar, &:focus-within $tileBar': {
        opacity: 1,
        pointerEvents: 'auto',
      },
    },
    albumLink: {
      position: 'relative',
      display: 'block',
      textDecoration: 'none',
    },
    albumContainer: {
      transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    },
    albumPlayButton: { color: 'white' },
  }),
  { name: 'NDAlbumGridView' },
)

const useCoverStyles = makeStyles({
  coverContainer: {
    width: '100%',
    aspectRatio: '1',
    overflow: 'hidden',
    borderRadius: 12,
  },
  cover: {
    display: 'inline-block',
    width: '100%',
    objectFit: 'cover',
    height: (props) => props.height,
    transition: 'opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1), transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  },
  coverLoading: {
    opacity: 0,
  },
})

const getColsForWidth = (width) => {
  if (width === 'xs') return 2
  if (width === 'sm') return 3
  if (width === 'md') return 4
  if (width === 'lg') return 6
  return 9
}

const Cover = withContentRect('bounds')(({
  record,
  measureRef,
  contentRect,
}) => {
  // Force height to be the same as the width determined by the GridList
  // noinspection JSSuspiciousNameCombination
  const classes = useCoverStyles({ height: contentRect.bounds.width })
  const [, dragAlbumRef] = useDrag(
    () => ({
      type: DraggableTypes.ALBUM,
      item: { albumIds: [record.id] },
      options: { dropEffect: 'copy' },
    }),
    [record],
  )

  const url = subsonic.getCoverArtUrl(record, config.uiCoverArtSize, true)
  const { imgUrl, loading: imageLoading } = useImageUrl(url)

  return (
    <div ref={measureRef} className={classes.coverContainer}>
      <div ref={dragAlbumRef}>
        <img
          src={imgUrl || undefined}
          alt={record.name}
          className={`${classes.cover} ${imageLoading ? classes.coverLoading : ''}`}
        />
      </div>
    </div>
  )
})

const AlbumGridTile = ({ showArtist, record, basePath, ...props }) => {
  const classes = useStyles()
  const isDesktop = useMediaQuery((theme) => theme.breakpoints.up('md'), {
    noSsr: true,
  })
  if (!record) {
    return null
  }
  const computedClasses = clsx(
    classes.albumContainer,
    record.missing && classes.missingAlbum,
  )
  return (
    <div className={computedClasses}>
      <Link
        className={classes.link}
        to={linkToRecord(basePath, record.id, 'show')}
      >
        <Cover record={record} />
        <GridListTileBar
          className={isDesktop ? classes.tileBar : classes.tileBarMobile}
          subtitle={
            !record.missing && (
              <PlayButton
                className={classes.albumPlayButton}
                record={record}
                size="small"
              />
            )
          }
          actionIcon={<AlbumContextMenu record={record} color={'white'} />}
        />
      </Link>
      <Link
        className={classes.albumLink}
        to={linkToRecord(basePath, record.id, 'show')}
      >
        <span>
          <OverflowTooltip title={record.name}>
            <Typography className={classes.albumName}>{record.name}</Typography>
          </OverflowTooltip>
          {record.tags && record.tags['albumversion'] && (
            <Typography className={classes.albumVersion}>
              {record.tags['albumversion']}
            </Typography>
          )}
        </span>
      </Link>
      {showArtist ? (
        <ArtistLinkField record={record} className={classes.albumSubtitle} />
      ) : (
        <AlbumDatesField record={record} className={classes.albumSubtitle} />
      )}
    </div>
  )
}

const LoadedAlbumGrid = ({ ids, data, basePath, width }) => {
  const classes = useStyles()
  const { filterValues } = useListContext()
  const isArtistView = !!(filterValues && filterValues.artist_id)
  return (
    <div className={classes.root}>
      <GridList
        component={'div'}
        cellHeight={'auto'}
        cols={getColsForWidth(width)}
        spacing={20}
      >
        {ids.map((id) => (
          <GridListTile className={classes.gridListTile} key={id}>
            <AlbumGridTile
              record={data[id]}
              basePath={basePath}
              showArtist={!isArtistView}
            />
          </GridListTile>
        ))}
      </GridList>
    </div>
  )
}

const AlbumGridView = ({ albumListType, loaded, loading, ...props }) => {
  const hide =
    (loading && albumListType === 'random') || !props.data || !props.ids
  return hide ? <Loading /> : <LoadedAlbumGrid {...props} />
}

const AlbumGridViewWithWidth = withWidth()(AlbumGridView)

export default AlbumGridViewWithWidth
