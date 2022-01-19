import { AppBar, createStyles, IconButton, makeStyles, Theme, Toolbar, Typography } from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import * as React from 'react';
import MenuIcon from '@material-ui/icons/Menu';
import SearchBar from './forms/SearchBar';

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
            color: red.A100,
        },
    }),
);

type Prop = {
    menuFunc: (event: React.KeyboardEvent | React.MouseEvent) => void;
    onError: (msg: string) => void;
};

export default function TopBar(props: Prop) {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <AppBar position="fixed">
                <Toolbar>
                    <IconButton
                        onClick={props.menuFunc}
                        edge="start"
                        className={classes.menuButton}
                        color="inherit"
                        aria-label="menu"
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        Task Management Application
                    </Typography>
                    {/* <Breadcrumbs maxItems={2} aria-label="breadcrumb" className={classes.breadcrumbs}>
                        <Link component={RouterLink} to="/">
                            Home
                        </Link>
                    </Breadcrumbs> */}
                    <SearchBar onError={props.onError} />
                </Toolbar>
            </AppBar>
            {/* Copy of above to allow the bottom content to render after */}
            <Toolbar>
                <IconButton
                    onClick={props.menuFunc}
                    edge="start"
                    className={classes.menuButton}
                    color="inherit"
                    aria-label="menu"
                >
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" className={classes.title}>
                    {/* Removed p and g as letters may stickout */}
                    Task Manaoement Aoolication
                </Typography>
                <SearchBar onError={props.onError} />
            </Toolbar>
        </div>
    );
}
