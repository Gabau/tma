import { List, ListItem, Theme } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/styles';
import * as React from 'react';
import TaskForm from './forms/TaskForm';
import Task from './data/Task';
import { green, red } from '@material-ui/core/colors';
import TaskCard from './TaskCard';
import { createTaskInDB, deleteTaskInDB, getTasksFromDB } from './api/TaskAPIRequests';
import { useState } from 'react';

const useStyle = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        delete: {
            color: red.A700,
        },
        edit: {
            color: green.A700,
        },
    }),
);

type TaskProp = {
    onError: (msg: string) => void;
};

type TaskState = {
    tasks: Task[];
};

const defaultList: Task[] = [];

const TaskList: React.FC<TaskProp> = (props: TaskProp) => {
    const [state, setState] = useState({ tasks: [] });
    React.useEffect(() => refresh(), []);
    function refresh() {
        getTasksFromDB()
            .then((response) => setState({ tasks: response }))
            .catch((error) => props.onError(error.message));
    }

    function deleteHandler(task: Task) {
        return () => {
            // perform the delete via api
            deleteTaskInDB(task)
                .then((response) => refresh())
                .catch((error) => {
                    props.onError(error.message);
                    refresh();
                    // to refresh the list
                });
        };
    }

    function createHandler(task: Task) {
        // verify valid task
        const default_values = { description: '', tags: [] };
        const to_add = { ...default_values, ...task };
        if (!isValidTask(to_add)) {
            props.onError('Task not valid');
        }
        createTaskInDB(to_add)
            .then((response) => refresh())
            .catch((error) => props.onError(error.message));
        const temp = state.tasks.slice();
        temp.unshift(to_add);
        // setState({ tasks: temp, toRender: temp.map((val) => generateTaskCard(val)) });
        // to ensure that the database has been updated
    }
    function generateList(node: React.ReactNode): React.ReactNode {
        return <List>{node}</List>;
    }

    function generateTaskCard(task: Task): React.ReactNode {
        return (
            <ListItem key={task.id}>
                <TaskCard onError={props.onError} onDelete={deleteHandler(task)} task={task} />
            </ListItem>
        );
    }

    return (
        <React.Fragment>
            <TaskForm taskConsumer={createHandler}></TaskForm>
            {generateList(state.tasks.map(generateTaskCard))}
        </React.Fragment>
    );
};

function isValidTask(task: Task) {
    return task.name != '';
}

export default TaskList;
