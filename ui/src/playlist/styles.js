import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme) => ({
  container: {
    [theme.breakpoints.down('xs')]: {
      padding: '0.7em',
      minWidth: '24em',
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
  albumCover: {
    display: 'inline-block',
    [theme.breakpoints.down('xs')]: {
      height: '10em',
      width: '10em',
    },
    [theme.breakpoints.up('sm')]: {
      height: '12em',
      width: '12em',
    },
    [theme.breakpoints.up('lg')]: {
      height: '18em',
      width: '18em',
    },
  },
  albumDetails: {
    display: 'inline-block',
    verticalAlign: 'top',
    [theme.breakpoints.down('xs')]: {
      width: '14em',
    },
    [theme.breakpoints.up('sm')]: {
      width: '26em',
    },
    [theme.breakpoints.up('lg')]: {
      width: '38em',
    },
  },
  albumTitle: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    fontWeight: 700,
    letterSpacing: '-0.03em',
    color: 'rgba(255, 255, 255, 0.95)',
  },
}))
