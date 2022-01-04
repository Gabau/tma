import { AppBar, Breadcrumbs, Button, createStyles, IconButton, makeStyles, Theme, Toolbar, Typography, Link } from '@material-ui/core'
import { Link as RouterLink } from 'react-router-dom'
import MenuIcon from '@material-ui/icons/Menu';
import * as React from 'react'
import useTitle from './hooks/TitleHook';
import { isWhiteSpaceLike } from 'typescript';
import { red } from '@material-ui/core/colors';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        title: {
            flexGrow: 1,
        },
        breadcrumbs: {
            flexGrow: 1,
        },
        links: {
            color: red,
        },
    }),
);

type Prop = {
  menuFunc: (event: React.KeyboardEvent | React.MouseEvent) => void;
}


export default function TopBar(props: Prop) {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <AppBar position="fixed">
                <Toolbar>
                    <IconButton onClick={props.menuFunc} edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        Task Management Application
                    </Typography>
                    <Breadcrumbs maxItems={2} aria-label="breadcrumb" className={classes.breadcrumbs}>
                        <Link component={RouterLink} to='/'>Home</Link>
                    </Breadcrumbs>
                </Toolbar>
            </AppBar>
            <Toolbar />
        </div>
    );

}



