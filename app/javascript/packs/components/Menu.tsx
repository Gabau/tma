import * as React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});

type Prop = {
    isOpen: boolean,
    onClose: (event: React.KeyboardEvent | React.MouseEvent) => void
};

export default function Menu(props: Prop) {
  const classes = useStyles();
  
  return (
      <div>
          <Drawer anchor="left" open={props.isOpen} onClose={props.onClose}>
              Something
          </Drawer>
      </div>
  )


}