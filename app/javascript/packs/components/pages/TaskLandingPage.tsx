// represents an individual page to display additional information about a task

import { Box, Button, Card, CardContent, Tab, Tabs, TextareaAutosize, TextField, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import * as React from 'react';
import ReactMarkdown from 'react-markdown';
import { useLocation, useNavigate, useParams } from 'react-router';
import { NumberLiteralType } from 'typescript';
import { getTasksFromDB } from '../api/TaskAPIRequests';
import EditableTask from '../data/EditableTask';
import Task, { EMPTY_TASK } from '../data/Task';
import TagList from '../tags/TagList';

const useStyle = makeStyles(() => ({
    editDescription: {
        maxRows: 100,
        minRows: 100,
    },
}));

type TaskLandingPageProps = {};

type EditDescriptionCardProps = {
    task: Task;
};

type TabPanelProps = {
    index: number;
    value: number;
    children?: React.ReactNode;
};

const TaskLandingPage: React.FC<TaskLandingPageProps> = (props: TaskLandingPageProps) => {
    const classes = useStyle();
    const [isEdit, setIsEdit] = React.useState(false);
    const [value, setTabValue] = React.useState(0);
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

    function editHandler() {
        setIsEdit(!isEdit);
    }

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setTabValue(newValue);
    };

    return (
        <div>
            <Typography>
                <h1>Task Name: {task.name}</h1>
            </Typography>
            {/* <Typography>
                <pre style={{ fontFamily: 'inherit' }}>{task.description ? task.description : ''}</pre>
            </Typography> */}

            <TagList tags={task.tags} />
            <br />
            <Button onClick={editHandler}>Edit</Button>
            <br />
            <EditDescriptionCard task={task} />
        </div>
    );
};

export default TaskLandingPage;

const TabPanel: React.FC<TabPanelProps> = (props: TabPanelProps) => {
    return (
        <div>
            {props.value === props.index && (
                <Box>
                    <Typography>{props.children}</Typography>
                </Box>
            )}
        </div>
    );
};

// todo: Render two different kinds of component
// When edit is pressed, render the edit card box with the render in preview.
// Before edit is pressed, just render the entire thing as a markdown in a card. --> Entire thing will
// be encapsulated in a card.

const EditDescriptionCard: React.FC<EditDescriptionCardProps> = (props: EditDescriptionCardProps) => {
    const classes = useStyle();
    const [value, setValue] = React.useState(0);
    const [editableTask, setEditableTask] = React.useState(new EditableTask(props.task));
    // React.useEffect(() => {
    //     setEditableTask(new EditableTask(props.task));
    // }, [props.task]);

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Card>
            <CardContent>
                <Tabs value={value} onChange={handleChange}>
                    <Tab label="Edit" />
                    <Tab label="Description Preview" />
                </Tabs>
                <TabPanel index={0} value={value}>
                    <TextField
                        className={classes.editDescription}
                        maxRows={10}
                        minRows={10}
                        multiline
                        fullWidth
                        value={editableTask.build().description}
                        onChange={(event) =>
                            setEditableTask(editableTask.modifyFields({ description: event.target.value }).clone())
                        }
                    />
                </TabPanel>
                <TabPanel index={1} value={value}>
                    <ReactMarkdown children={editableTask.build().description} />
                </TabPanel>
            </CardContent>
        </Card>
    );
};
