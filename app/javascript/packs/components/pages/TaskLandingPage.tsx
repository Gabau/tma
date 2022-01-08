// represents an individual page to display additional information about a task

import { Typography } from '@material-ui/core';
import * as React from 'react';
import { useParams } from 'react-router';
import { getTasksFromDB } from '../api/TaskAPIRequests';
import { EMPTY_TASK } from '../data/Task';
import TagList from '../tags/TagList';

const TaskLandingPage: React.FC = () => {
    const id = parseInt(useParams().id);

    const [task, setTask] = React.useState(EMPTY_TASK);
    React.useEffect(() => {
        getTasksFromDB().then((response) => setTask(response.find((t) => t.id === id)));
    }, []);

    return (
        <div>
            <Typography>{task.name}</Typography>
            <Typography>{task.description === undefined ? '' : task.description}</Typography>
            <TagList tags={task.tags} />
        </div>
    );
};

export default TaskLandingPage;
