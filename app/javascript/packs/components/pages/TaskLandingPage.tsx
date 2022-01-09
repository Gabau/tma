// represents an individual page to display additional information about a task

import { Typography } from '@material-ui/core';
import * as React from 'react';
import { useLocation, useParams } from 'react-router';
import { getTasksFromDB } from '../api/TaskAPIRequests';
import { EMPTY_TASK } from '../data/Task';
import TagList from '../tags/TagList';

type TaskLandingPageProps = {};

const TaskLandingPage: React.FC<TaskLandingPageProps> = (props: TaskLandingPageProps) => {
    let params = useParams();
    let id = parseInt(params.id);
    const [task, setTask] = React.useState(EMPTY_TASK);
    React.useEffect(() => {
        // this took forever to figure out
        id = parseInt(params.id);
        getTasksFromDB().then((response) => setTask(response.find((t) => t.id === id)));
    }, [params]);

    return (
        <div>
            <Typography>{task.name}</Typography>
            <Typography>{task.description === undefined ? '' : task.description}</Typography>
            <TagList tags={task.tags} />
        </div>
    );
};

export default TaskLandingPage;
