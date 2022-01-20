import {
    Button,
    Card,
    CardActions,
    CardContent,
    createStyles,
    Link,
    makeStyles,
    Theme,
    Typography,
} from '@material-ui/core';
import { green, red } from '@material-ui/core/colors';
import * as React from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { editTaskInDB } from './api/TaskAPIRequests';
import EditableTask from './data/EditableTask';
import Tag from './data/Tag';
import Task, { clone } from './data/Task';
import DisplayTextField from './forms/DisplayTextField';
import TagForm from './forms/TagForm';
import TagList from './tags/TagList';

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

type TaskCardProps = {
    task: Task;
    onDelete: () => void;
    onError: (msg: string) => void;
};

/**
 * The task card used for the summarised information of a task.
 */
const TaskCard: React.FC<TaskCardProps> = (props: TaskCardProps) => {
    const classes = useStyle();
    const [isEdit, setIsEdit] = React.useState(false);
    const EditButtonText = () => (isEdit ? <>Save</> : <>Edit</>);
    // for display, will only be changed after edit.
    const [task, setTask] = React.useState(clone(props.task));
    // the task fields to operate on
    const [taskFields, setTaskFields] = React.useState({ ...task });
    const [editableTask, setEditableTask] = React.useState(new EditableTask(task));
    const [editableTags, setEditableTags] = React.useState(editableTask.getTags());
    const navigate = useNavigate();
    function deleteHandler(tag: Tag) {
        try {
            setEditableTask(editableTask.deleteTag(tag));
            setEditableTags(editableTask.getTags().slice());
        } catch (error) {
            props.onError(error.message);
        }
    }

    function addHandler(tag: Tag) {
        try {
            setEditableTask(editableTask.addTag(tag));
            setEditableTags(editableTask.getTags().slice());
        } catch (error) {
            props.onError(error.message);
        }
    }
    const editContent = (
        <CardContent>
            <form onSubmit={onEdit}>
                <DisplayTextField
                    required={true}
                    label="name"
                    onChange={(event) => setTaskFields({ ...taskFields, name: event.target.value })}
                    value={taskFields.name}
                    displayText={<Typography>{task.name}</Typography>}
                    isEdit={isEdit}
                    autoFocus={true}
                />
            </form>
            <CardTagList
                isEdit={isEdit}
                onAdd={addHandler}
                onDelete={deleteHandler}
                tags={task.tags}
                editableTags={editableTags}
            />
        </CardContent>
    );
    function onEdit(e) {
        e.preventDefault();
        // to Send the api request and refresh the card on error
        if (isEdit) {
            // when edit is done, send the api request
            // to update.
            // generate the edited card
            setEditableTask(editableTask.modifyFields(taskFields));
            editTaskInDB(editableTask)
                .catch((error) => props.onError(error.message))
                .then((response) => setTask({ ...task, ...response }))
                .then(() => setEditableTask(editableTask.reset(task)));
            // set delete to undefined, to remove button
        }

        // to allow the form submission to occur before switching out
        setTimeout(() => setIsEdit(!isEdit), 10);
    }
    return (
        <Card variant="outlined" className={classes.root}>
            {editContent}
            <CardActions>
                <Button className={classes.edit} size="small" onClick={onEdit}>
                    <EditButtonText />
                </Button>
                <Button className={classes.delete} size="small" onClick={props.onDelete}>
                    Delete
                </Button>
                <Button size="small">
                    <Link component={RouterLink} to={`/tasks/${task.id}`}>
                        More details
                    </Link>
                </Button>
            </CardActions>
        </Card>
    );
};

type CardTagListProps = {
    isEdit: boolean;
    onAdd: (tag: Tag) => void;
    onDelete: (tag: Tag) => void;
    tags: Tag[];
    editableTags: Tag[];
};

const CardTagList: React.FC<CardTagListProps> = (props: CardTagListProps) => {
    const [editableTags, setEditableTags] = React.useState(props.editableTags);
    React.useEffect(() => setEditableTags(props.editableTags), [props.editableTags]);
    if (!props.isEdit) {
        return <TagList tags={props.tags} />;
    }
    return (
        <div>
            <TagForm onSubmit={props.onAdd} />
            <TagList tags={editableTags} onDelete={props.onDelete} />
        </div>
    );
};

export default TaskCard;
