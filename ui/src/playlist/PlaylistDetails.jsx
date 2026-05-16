import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  useMediaQuery,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { useTranslate } from 'react-admin'
import Lightbox from 'react-image-lightbox'
import 'react-image-lightbox/style.css'
import {
  CollapsibleComment,
  DurationField,
  ImageUploadOverlay,
  SizeField,
  isWritable,
  OverflowTooltip,
  useImageLoadingState,
} from '../common'
import config from '../config'
import subsonic from '../subsonic'

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
      background: 'linear-gradient(180deg, rgba(38, 38, 38, 0.5) 0%, transparent 100%)',
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
      position: 'relative',
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
    title: {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      wordBreak: 'break-word',
      fontSize: '2.25rem',
      fontWeight: 700,
      letterSpacing: '-0.03em',
      color: 'rgba(255, 255, 255, 0.95)',
      lineHeight: 1.1,
    },
    stats: {
      marginTop: '0.75em',
      marginBottom: '0.5em',
      fontSize: '0.875rem',
      color: 'rgba(255, 255, 255, 0.45)',
    },
  }),
  {
    name: 'NDPlaylistDetails',
  },
)

const PlaylistDetails = (props) => {
  const { record = {} } = props
  const translate = useTranslate()
  const classes = useStyles()
  const isDesktop = useMediaQuery((theme) => theme.breakpoints.up('lg'))
  const {
    imageLoading,
    imageError,
    isLightboxOpen,
    handleImageLoad,
    handleImageError,
    handleOpenLightbox,
    handleCloseLightbox,
  } = useImageLoadingState(record.id)

  const imageUrl = subsonic.getCoverArtUrl(record, config.uiCoverArtSize, true)
  const fullImageUrl = subsonic.getCoverArtUrl(record)

  return (
    <Card className={classes.root}>
      <div className={classes.cardContents}>
        <div className={classes.coverParent}>
          <CardMedia
            key={record.id} // Force re-render when playlist changes
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
          {isWritable(record.ownerId) && (
            <ImageUploadOverlay
              entityType="playlist"
              entityId={record.id}
              hasUploadedImage={!!record.uploadedImage}
            />
          )}
        </div>
        <div className={classes.details}>
          <CardContent className={classes.content}>
            <OverflowTooltip title={record.name || ''}>
              <Typography
                variant={isDesktop ? 'h5' : 'h6'}
                className={classes.title}
              >
                {record.name || translate('ra.page.loading')}
              </Typography>
            </OverflowTooltip>
            <Typography component="p" className={classes.stats}>
              {record.songCount ? (
                <span>
                  {record.songCount}{' '}
                  {translate('resources.song.name', {
                    smart_count: record.songCount,
                  })}
                  {' · '}
                  <DurationField record={record} source={'duration'} />
                  {' · '}
                  <SizeField record={record} source={'size'} />
                </span>
              ) : (
                <span>&nbsp;</span>
              )}
            </Typography>
            <CollapsibleComment record={record} />
          </CardContent>
        </div>
      </div>
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

export default PlaylistDetails
