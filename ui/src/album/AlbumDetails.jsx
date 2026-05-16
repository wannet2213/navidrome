import { useEffect, useState } from 'react'
import {
  Card,
  CardContent,
  CardMedia,
  Collapse,
  makeStyles,
  Typography,
  useMediaQuery,
  withWidth,
} from '@material-ui/core'
import {
  ArrayField,
  ChipField,
  Link,
  SingleFieldList,
  useRecordContext,
  useTranslate,
} from 'react-admin'
import Lightbox from 'react-image-lightbox'
import config from '../config'
import 'react-image-lightbox/style.css'
import subsonic from '../subsonic'
import {
  ArtistLinkField,
  CollapsibleComment,
  DurationField,
  formatRange,
  LoveButton,
  RatingField,
  SizeField,
  useAlbumsPerPage,
  useImageLoadingState,
} from '../common'
import { formatFullDate, intersperse } from '../utils'
import AlbumExternalLinks from './AlbumExternalLinks'
import { SafeHTML } from '../common/SafeHTML'

const useStyles = makeStyles(
  (theme) => ({
    root: {
      [theme.breakpoints.down('xs')]: {
        padding: '0.7em',
        minWidth: '20em',
      },
      [theme.breakpoints.up('sm')]: {
        padding: '1.5em',
        minWidth: '32em',
      },
      background:
        'linear-gradient(180deg, rgba(38, 38, 38, 0.5) 0%, transparent 100%)',
      borderRadius: 0,
      boxShadow: 'none',
    },
    cardContents: {
      display: 'flex',
    },
    details: {
      display: 'flex',
      flexDirection: 'column',
    },
    content: {
      flex: '2 0 auto',
    },
    coverParent: {
      [theme.breakpoints.down('xs')]: {
        height: '10em',
        width: '10em',
        minWidth: '10em',
      },
      [theme.breakpoints.up('sm')]: {
        height: '12em',
        width: '12em',
        minWidth: '12em',
      },
      [theme.breakpoints.up('lg')]: {
        height: '18em',
        width: '18em',
        minWidth: '18em',
      },
      backgroundColor: 'transparent',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    cover: {
      objectFit: 'cover',
      cursor: 'pointer',
      display: 'block',
      width: '100%',
      height: '100%',
      backgroundColor: 'transparent',
      borderRadius: 12,
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      '&:hover': {
        transform: 'scale(1.02)',
        boxShadow: '0 12px 40px rgba(0, 0, 0, 0.5)',
      },
    },
    coverLoading: {
      opacity: 0.5,
    },
    loveButton: {
      top: theme.spacing(-0.2),
      left: theme.spacing(0.5),
    },
    notes: {
      display: 'inline-block',
      marginTop: '1em',
      float: 'left',
      wordBreak: 'break-word',
      cursor: 'pointer',
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
      color: '#fc3c44',
      marginTop: 6,
    },
    recordMeta: {
      fontSize: '0.875rem',
      color: 'rgba(255, 255, 255, 0.45)',
      marginTop: 4,
    },
    genreList: {
      marginTop: theme.spacing(0.5),
    },
    externalLinks: {
      marginTop: theme.spacing(1.5),
    },
  }),
  {
    name: 'NDAlbumDetails',
  },
)

const useGetHandleGenreClick = (width) => {
  const [perPage] = useAlbumsPerPage(width)

  return (id) => {
    return `/album?filter={"genre_id":["${id}"]}&order=ASC&sort=name&perPage=${perPage}`
  }
}

const GenreChipField = withWidth()(({ width, ...rest }) => {
  const record = useRecordContext(rest)
  const genreLink = useGetHandleGenreClick(width)

  return (
    <Link to={genreLink(record.id)} onClick={(e) => e.stopPropagation()}>
      <ChipField
        source="name"
        // Workaround to force ChipField to be clickable
        onClick={() => {}}
      />
    </Link>
  )
})

const GenreList = () => {
  const classes = useStyles()
  return (
    <ArrayField className={classes.genreList} source={'genres'}>
      <SingleFieldList linkType={false}>
        <GenreChipField />
      </SingleFieldList>
    </ArrayField>
  )
}

export const Details = (props) => {
  const isXsmall = useMediaQuery((theme) => theme.breakpoints.down('xs'))
  const translate = useTranslate()
  const record = useRecordContext(props)

  // Create an array of detail elements
  let details = []
  const addDetail = (obj) => {
    const id = details.length
    details.push(<span key={`detail-${record.id}-${id}`}>{obj}</span>)
  }

  // Calculate date related fields
  const yearRange = formatRange(record, 'year')
  const date = record.date ? formatFullDate(record.date) : yearRange

  const originalDate = record.originalDate
    ? formatFullDate(record.originalDate)
    : formatRange(record, 'originalYear')
  const releaseDate = record?.releaseDate && formatFullDate(record.releaseDate)

  const dateToUse = originalDate || date
  const isOriginalDate = originalDate && dateToUse !== date
  const showDate = dateToUse && dateToUse !== releaseDate

  // Get label for the main date display
  const getDateLabel = () => {
    if (isXsmall) return '♫'
    if (isOriginalDate) return translate('resources.album.fields.originalDate')
    return null
  }

  // Get label for release date display
  const getReleaseDateLabel = () => {
    if (!isXsmall) return translate('resources.album.fields.releaseDate')
    if (showDate) return '○'
    return null
  }

  // Display dates with appropriate labels
  if (showDate) {
    addDetail(<>{[getDateLabel(), dateToUse].filter(Boolean).join('  ')}</>)
  }

  if (releaseDate) {
    addDetail(
      <>{[getReleaseDateLabel(), releaseDate].filter(Boolean).join('  ')}</>,
    )
  }
  addDetail(
    <>
      {record.songCount +
        ' ' +
        translate('resources.song.name', {
          smart_count: record.songCount,
        })}
    </>,
  )
  !isXsmall && addDetail(<DurationField source={'duration'} />)
  !isXsmall && addDetail(<SizeField source="size" />)

  // Return the details rendered with separators
  return <>{intersperse(details, ' · ')}</>
}

const AlbumDetails = (props) => {
  const record = useRecordContext(props)
  const isXsmall = useMediaQuery((theme) => theme.breakpoints.down('xs'))
  const isDesktop = useMediaQuery((theme) => theme.breakpoints.up('lg'))
  const classes = useStyles()
  const [expanded, setExpanded] = useState(false)
  const [albumInfo, setAlbumInfo] = useState()
  const {
    imageLoading,
    imageError,
    isLightboxOpen,
    handleImageLoad,
    handleImageError,
    handleOpenLightbox,
    handleCloseLightbox,
  } = useImageLoadingState(record.id)

  let notes = albumInfo?.notes || record.notes

  if (notes) {
    notes += '..'
  }

  useEffect(() => {
    subsonic
      .getAlbumInfo(record.id)
      .then((resp) => resp.json['subsonic-response'])
      .then((data) => {
        if (data.status === 'ok') {
          setAlbumInfo(data.albumInfo)
        }
      })
      .catch((e) => {
        // eslint-disable-next-line no-console
        console.error('error on album page', e)
      })
  }, [record])

  const imageUrl = subsonic.getCoverArtUrl(record, config.uiCoverArtSize)
  const fullImageUrl = subsonic.getCoverArtUrl(record)

  return (
    <Card className={classes.root}>
      <div className={classes.cardContents}>
        <div className={classes.coverParent}>
          <CardMedia
            key={record.id}
            component={'img'}
            src={imageUrl}
            width="400"
            height="400"
            className={`${classes.cover} ${imageLoading ? classes.coverLoading : ''}`}
            onClick={handleOpenLightbox}
            onLoad={handleImageLoad}
            onError={handleImageError}
            title={record.name}
            style={{
              cursor: imageError ? 'default' : 'pointer',
            }}
          />
        </div>
        <div className={classes.details}>
          <CardContent className={classes.content}>
            <Typography
              variant={isDesktop ? 'h5' : 'h6'}
              className={classes.recordName}
            >
              {record.name}
              <LoveButton
                className={classes.loveButton}
                record={record}
                resource={'album'}
                size={isDesktop ? 'default' : 'small'}
                aria-label="love"
                color="primary"
              />
            </Typography>
            <Typography component={'h6'} className={classes.recordArtist}>
              {record?.tags?.['albumversion']}
            </Typography>
            <Typography component={'h6'} className={classes.recordArtist}>
              <ArtistLinkField record={record} />
            </Typography>
            <Typography component={'div'} className={classes.recordMeta}>
              <Details />
            </Typography>
            {config.enableStarRating && (
              <div>
                <RatingField
                  record={record}
                  resource={'album'}
                  size={isDesktop ? 'medium' : 'small'}
                />
              </div>
            )}
            {isDesktop ? (
              <GenreList />
            ) : (
              <Typography component={'p'}>{record.genre}</Typography>
            )}
            {!isXsmall && (
              <Typography component={'div'} className={classes.recordMeta}>
                {config.enableExternalServices && (
                  <AlbumExternalLinks className={classes.externalLinks} />
                )}
              </Typography>
            )}
            {isDesktop && notes && (
              <Collapse
                collapsedHeight={'2.75em'}
                in={expanded}
                timeout={'auto'}
                className={classes.notes}
              >
                <Typography
                  variant={'body1'}
                  onClick={() => setExpanded(!expanded)}
                >
                  <span>
                    <SafeHTML>{notes}</SafeHTML>
                  </span>
                </Typography>
              </Collapse>
            )}
            {isDesktop && record['comment'] && (
              <CollapsibleComment record={record} />
            )}
          </CardContent>
        </div>
      </div>
      {!isDesktop && record['comment'] && (
        <CollapsibleComment record={record} />
      )}
      {!isDesktop && notes && (
        <div className={classes.notes}>
          <Collapse collapsedHeight={'1.5em'} in={expanded} timeout={'auto'}>
            <Typography
              variant={'body1'}
              onClick={() => setExpanded(!expanded)}
            >
              <span>
                <SafeHTML>{notes}</SafeHTML>
              </span>
            </Typography>
          </Collapse>
        </div>
      )}
      {isLightboxOpen && !imageError && (
        <Lightbox
          imagePadding={50}
          animationDuration={200}
          imageTitle={record.name}
          mainSrc={fullImageUrl}
          onCloseRequest={handleCloseLightbox}
        />
      )}
    </Card>
  )
}

export default AlbumDetails
