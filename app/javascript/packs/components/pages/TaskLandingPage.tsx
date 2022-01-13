// represents an individual page to display additional information about a task

import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    PropTypes,
    Tab,
    Tabs,
    TextareaAutosize,
    TextField,
    Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import * as React from 'react';
import ReactMarkdown from 'react-markdown';
import { useLocation, useNavigate, useParams } from 'react-router';
import { NumberLiteralType } from 'typescript';
import { editTaskInDB, getTasksFromDB } from '../api/TaskAPIRequests';
import EditableTask from '../data/EditableTask';
import Task, { EMPTY_TASK } from '../data/Task';
import TagList from '../tags/TagList';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { materialLight } from 'react-syntax-highlighter/dist/esm/styles/prism';

const useStyle = makeStyles(() => ({
    editDescription: {
        maxRows: 100,
        minRows: 100,
    },
}));

type TaskLandingPageProps = {};

type EditDescriptionCardProps = {
    task: Task;
    activate: boolean;
    onCancel: () => void;
    onSave?: () => void;
};

type TabPanelProps = {
    index: number;
    value: number;
    children?: React.ReactNode;
};

type MarkdownBlockProps = {
    children: string;
};

const TaskLandingPage: React.FC<TaskLandingPageProps> = (props: TaskLandingPageProps) => {
    const classes = useStyle();
    const [isEdit, setIsEdit] = React.useState(false);
    const [value, setTabValue] = React.useState(0);
    let params = useParams();
    let id = parseInt(params.id);
    let navigate = useNavigate();
    const [task, setTask] = React.useState(EMPTY_TASK);

    const refresh = () => {
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
    };
    React.useEffect(refresh, [params]);

    // handle the case where the task is undefined.

    function editHandler() {
        setIsEdit(!isEdit);
    }

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setTabValue(newValue);
    };

    return (
        <div>
            <Typography variant="h2">Task Name: {task.name}</Typography>
            {/* <Typography>
                <pre style={{ fontFamily: 'inherit' }}>{task.description ? task.description : ''}</pre>
            </Typography> */}

            <TagList tags={task.tags} />
            <br />
            <Button onClick={editHandler}>Edit Description</Button>
            <br />
            <EditDescriptionCard onCancel={() => setIsEdit(false)} onSave={refresh} activate={isEdit} task={task} />
        </div>
    );
};

export default TaskLandingPage;

const TabPanel: React.FC<TabPanelProps> = (props: TabPanelProps) => {
    return <div>{props.value === props.index && <Box>{props.children}</Box>}</div>;
};

const MarkdownBlock = (props: MarkdownBlockProps) => {
    return (
        <ReactMarkdown
            components={{
                code({ node, inline, className, children, ...props }) {
                    const match = /language-(\w+)/.exec(className || '');
                    return !inline && match ? (
                        <SyntaxHighlighter
                            children={String(children).replace(/\n$/, '')}
                            language={match[1]}
                            PreTag="div"
                            style={materialLight}
                            {...props}
                        />
                    ) : (
                        <code className={className} {...props}>
                            {children}
                        </code>
                    );
                },
            }}
        >
            {props.children}
        </ReactMarkdown>
    );
};

// todo: Render two different kinds of component
// When edit is pressed, render the edit card box with the render in preview.
// Before edit is pressed, just render the entire thing as a markdown in a card. --> Entire thing will
// be encapsulated in a card.

const EditDescriptionCard: React.FC<EditDescriptionCardProps> = (props: EditDescriptionCardProps) => {
    if (!props.activate) {
        return <MarkdownBlock>{props.task.description}</MarkdownBlock>;
    }
    const fieldRef = React.useRef();
    const classes = useStyle();
    const [value, setValue] = React.useState(0);
    const [editableTask, setEditableTask] = React.useState(new EditableTask(props.task));
    // React.useEffect(() => {
    //     setEditableTask(new EditableTask(props.task));
    // }, [props.task]);

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    };
    const handleSave = () => {
        editTaskInDB(editableTask).then(() => {
            props.onSave ? props.onSave() : undefined;
        });

        props.onCancel();
    };
    const handleCancel = () => {
        props.onCancel();
    };
    const handleKeyPress = (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === 'Tab') {
            event.preventDefault();
            if (!fieldRef) {
                return;
            }
            let value = editableTask.build().description;
            const selectionStart = fieldRef.current!.selectionStart;
            const selectionEnd = fieldRef.current!.selectionEnd;
            const front = value.substring(0, selectionStart);
            const end = value.substring(selectionEnd, value.length);
            fieldRef.current!.value = front + '    ' + end;
            fieldRef.current!.selectionStart = front.length + 4;
            fieldRef.current!.selectionEnd = front.length + 4;
        }
    };

    return (
        <Card
            onKeyDown={(event) => {
                if (event.key === 'Tab') event.preventDefault();
            }}
        >
            <CardContent>
                <Tabs value={value} onChange={handleChange}>
                    <Tab label="Edit" />
                    <Tab label="Description Preview" />
                </Tabs>
                <TabPanel index={0} value={value}>
                    <TextField
                        inputRef={fieldRef}
                        className={classes.editDescription}
                        maxRows={10}
                        minRows={10}
                        multiline
                        fullWidth
                        value={editableTask.build().description}
                        onChange={(event) =>
                            setEditableTask(editableTask.modifyFields({ description: event.target.value }).clone())
                        }
                        onKeyDown={handleKeyPress}
                    />
                </TabPanel>
                <TabPanel index={1} value={value}>
                    <MarkdownBlock>{editableTask.build().description}</MarkdownBlock>
                </TabPanel>
            </CardContent>
            <CardActions>
                <Button onClick={handleSave}>Save</Button>
                <Button onClick={handleCancel}>Cancel</Button>
            </CardActions>
        </Card>
    );
};
