// represents an individual page to display additional information about a task

import { Button, TextareaAutosize, Typography } from '@material-ui/core';
import * as React from 'react';
import { useLocation, useNavigate, useParams } from 'react-router';
import { getTasksFromDB } from '../api/TaskAPIRequests';
import { EMPTY_TASK } from '../data/Task';
import TagList from '../tags/TagList';

type TaskLandingPageProps = {};

const TaskLandingPage: React.FC<TaskLandingPageProps> = (props: TaskLandingPageProps) => {
    let params = useParams();
    let id = parseInt(params.id);
    let navigate = useNavigate();
    const [task, setTask] = React.useState(EMPTY_TASK);
    React.useEffect(() => {
        // this took forever to figure out
        id = parseInt(params.id);
        getTasksFromDB().then((response) => {
            const task = response.find((t) => t.id === id);
            if (!task) {
                // handle the case where the task is not correct
                // probably have to have a seperate landing page down the road.
                navigate('/');
            }
            setTask(task);
            // handle the case where the task does not exist
        });
    }, [params]);

    // handle the case where the task is undefined.

    return (
        <div>
            <Typography>{task.name}</Typography>
            <Typography>
                <pre style={{ fontFamily: 'inherit' }}>{task.description ? task.description : ''}</pre>
            </Typography>

            <TagList tags={task.tags} />
            <br />
            <Button>Edit</Button>
        </div>
    );
};

export default TaskLandingPage;
