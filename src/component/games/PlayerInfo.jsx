import React from 'react';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import Avatar from "@material-ui/core/Avatar";
import {NavLink} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: 151,
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  playIcon: {
    height: 38,
    width: 38,
  },
  large: {
    width: theme.spacing(10),
    height: theme.spacing(10),
    margin: theme.spacing(2)
  },

}));

export default function PlayerInfo({id, name, email, rating}) {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <Card className={classes.root}>
      <Avatar alt={name} src={"https://i.pravatar.cc/150"} className={classes.large}/>
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography component="h5" variant="h5">
            <NavLink to={`/user/${id}`}>{name}</NavLink>
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            {email}
          </Typography>
          <Typography variant="h6" color="textSecondary">
            Rating: {rating}
          </Typography>
        </CardContent>
      </div>
    </Card>
  );
}
