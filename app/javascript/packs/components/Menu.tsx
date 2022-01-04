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
import { MenuItem, MenuList } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';

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
    onClose: (event: React.KeyboardEvent | React.MouseEvent) => void,
    onNavigate: () => void,
};

export default function Menu(props: Prop) {
    const classes = useStyles();
    const navigate = useNavigate();
    const nav = (val: string) => {
        props.onNavigate();
        navigate(val);
    } 
    return (
        <div>
            <Drawer anchor="left" open={props.isOpen} onClose={props.onClose}>
                <MenuList className={classes.list}>
                    <MenuItem onClick={() => nav('/')}>Home</MenuItem>
                    <MenuItem onClick={() => nav('/tags')}>Tags</MenuItem>
                </MenuList>
            </Drawer>
        </div>
    )


}