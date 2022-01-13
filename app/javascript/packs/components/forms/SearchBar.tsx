// todo: A search component which can toggle by the required fields to search by
// For instance, have a drop down menu to select whether it is a query by tags,
// by name or by description --> and redirect to the queried site
// or maybe have an option for advanced search? Using parameters supplied by url

import { makeStyles, TextField, Theme, Typography } from '@material-ui/core';
import { ArrowDropDown, FilterRounded } from '@material-ui/icons';
import { Autocomplete, createFilterOptions } from '@material-ui/lab';
import * as React from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getTasksFromDB } from '../api/TaskAPIRequests';
import Task, { EMPTY_TASK } from '../data/Task';

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        flexGrow: 1,
        color: 'white',
    },
    inputRoot: {
        flexGrow: 1,
        color: 'white',
        '& .MuiOutlinedInput-notchedOutline': {
            borderColor: 'white',
            color: 'white',
        },
        '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: 'grey',
        },
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: 'grey',
        },
    },
    clearIndicator: {
        color: 'white',
    },
}));

const useDropDownStyles = makeStyles(() => ({
    dropDownArrow: {
        color: 'white',
    },
}));

type SearchBarProps = {
    onError: (msg: string) => void;
};

const EMPTY_ARRAY: Task[] = [];

const SearchBar: React.FC<SearchBarProps> = (props: SearchBarProps) => {
    // todo: switch between data sets and onAction for changing search conditions and change colors

    const classes = useStyles();
    const dropDownClasses = useDropDownStyles();
    const [tasks, setTasks] = React.useState(EMPTY_ARRAY);
    const [value, setValue] = React.useState('');
    const [task, setTask] = React.useState(null);
    // search has to deal with two cases
    // query a single task
    // query all tasks that contain a particular sequence

    const navigate = useNavigate();
    const navigateToTask = (task: Task) => {
        navigate(`/tasks/${task.id}`);
    };

    const refresh = () => {
        getTasksFromDB().then((response) => setTasks(response));
    };
    useEffect(refresh, []);
    const submitHandler = (event: React.FormEvent) => {
        // Can only be done when the compoenents reload when params change
        // event.preventDefault();

        // search by name
        // specific search only
        if (value === '') {
            return;
        }
        if (!tasks.find((t) => t.name !== value)) {
            return;
        }
        const task = tasks.find((t) => t.name === value);
        if (task) {
            navigateToTask(task);
            setValue('');
        } else {
            event.preventDefault();
            props.onError('Error, task not found');
        }
    };
    return (
        <div className={classes.root}>
            <form onSubmit={submitHandler}>
                <Autocomplete
                    onClick={refresh}
                    popupIcon={<ArrowDropDown className={dropDownClasses.dropDownArrow} />}
                    getOptionLabel={(option) => option.name}
                    classes={classes}
                    options={tasks}
                    inputValue={value}
                    value={task}
                    onInputChange={(event, newValue) => {
                        setValue(newValue);
                    }}
                    onChange={(event, newValue: Task | null) => {
                        if (newValue) {
                            navigateToTask(newValue as Task);
                            setValue('');
                            // ensures that
                            setTask(null);
                        }
                    }}
                    autoComplete
                    includeInputInList
                    getOptionSelected={(option, value) => option.id === value.id}
                    renderInput={(params) => (
                        <TextField
                            variant="outlined"
                            label="Search"
                            {...params}
                            required
                            onFocus={refresh}
                            InputLabelProps={{ className: classes.inputRoot }}
                        />
                    )}
                />
            </form>
        </div>
    );
};

export default SearchBar;
