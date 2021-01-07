import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import ChatLogItem from "./ChatLogItem";

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
}));

export default function ChatLog({chats}) {
  const classes = useStyles();
  return (
    <List className={classes.root}>
      {
        chats.map(chat => {
          return <ChatLogItem user={chat.user} message={chat.message} time={chat.time}/>
        })
      }
    </List>
  );
}
