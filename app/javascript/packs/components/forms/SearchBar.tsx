// todo: A search component which can toggle by the required fields to search by
// For instance, have a drop down menu to select whether it is a query by tags,
// by name or by description --> and redirect to the queried site
// or maybe have an option for advanced search? Using parameters supplied by url

import { makeStyles, TextField, Theme, Typography } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import * as React from 'react';
import { useEffect } from 'react';
import { getTasksFromDB } from '../api/TaskAPIRequests';
import Task from '../data/Task';

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        flexGrow: 1,
        color: 'white',
    },
}));

type SearchBarProps = {};

const EMPTY_ARRAY: Task[] = [];

const SearchBar: React.FC<SearchBarProps> = (props: SearchBarProps) => {
    // todo: switch between data sets and onAction for changing search conditions.
    const classes = useStyles();
    const [tasks, setTasks] = React.useState(EMPTY_ARRAY);
    const refresh = () => {
        getTasksFromDB().then((response) => setTasks(response));
    };
    useEffect(refresh, []);
    return (
        <div className={classes.root}>
            <Autocomplete
                getOptionLabel={(option) => option.name}
                classes={{ inputRoot: classes.root }}
                options={tasks}
                renderInput={(params) => <TextField variant="outlined" label="Search" {...params} />}
            />
        </div>
    );
};

export default SearchBar;
