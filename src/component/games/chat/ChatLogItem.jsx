import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import NavLink from "react-router-dom/NavLink";

const useStyles = makeStyles((theme) => ({
  inline: {
    display: 'inline',
  },
}));

export default function ChatLogItem({user, message, time}) {
  const classes = useStyles();

  return (
    <ListItem alignItems="flex-start">
      <ListItemText
        primary={
          <NavLink to={`/user/${user._id}`}>{user.username}</NavLink>
        }
        secondary={
          <React.Fragment>
            <Typography
              component="span"
              variant="body2"
              className={classes.inline}
              color="textPrimary"
            >
              {time}
            </Typography>
            {`" - ${message}"`}
          </React.Fragment>
        }
      />
    </ListItem>
  );
}
