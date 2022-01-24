import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
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
    isOpen: boolean;
    onClose: (event: React.KeyboardEvent | React.MouseEvent) => void;
    onNavigate: () => void;
};

/**
 * Renders the side menu of the application.
 *
 */
export default function Menu(props: Prop) {
    const classes = useStyles();
    const navigate = useNavigate();
    const nav = (val: string) => {
        props.onNavigate();
        navigate(val);
    };
    return (
        <div>
            <Drawer anchor="left" open={props.isOpen} onClose={props.onClose}>
                <MenuList className={classes.list}>
                    <MenuItem onClick={() => nav('/')}>Home</MenuItem>
                    <MenuItem onClick={() => nav('/tags')}>Tags</MenuItem>
                </MenuList>
            </Drawer>
        </div>
    );
}
