import { Button, Card, CardActions, CardContent, createStyles, makeStyles, TextField, Typography } from "@material-ui/core";
import { green, red } from "@material-ui/core/colors";
import * as React from "react";
import { editTaskInDB } from "./api/TaskAPIRequests";
import EditableTask from "./data/EditableTask";
import Task, { clone } from "./data/Task";
import TagBox from "./tags/TagBox";
import { getCSRFToken } from "./util/csrfGenerator";

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
}


const TaskCard: React.FC<TaskCardProps> = (props: TaskCardProps) => {
    const classes = useStyle();
    const [isEdit, setIsEdit] = React.useState(false);
    const EditButtonText = () => isEdit ? <>Save</> : <>Edit</>;
    // for display, will only be changed after edit.
    const [task, setTask] = React.useState(clone(props.task));
    // the task fields to operate on
    const [taskFields, setTaskFields]  = React.useState({ ...task });
    const [editableTask, setEditableTask] = React.useState(new EditableTask(task));
    
    const baseContent = (
        <CardContent>
            <Typography>{task.name}</Typography>
            <TagBox onError={props.onError} editableTask={editableTask} task={task}></TagBox>
        </CardContent>
    );
    const editContent = (
        <CardContent>
            <form onSubmit={onEdit}>
                <TextField required={true} label="name" onChange={(event) => setTaskFields({ ...taskFields, name: event.target.value })} value={taskFields.name}></TextField>
            </form>
        </CardContent>
    )
    const content = isEdit ? editContent : baseContent;

    function onEdit(e) {
        e.preventDefault();
        // to Send the api request and refresh the card on error
        if (isEdit) {
            // when edit is done, send the api request
            // to update.
            // generate the edited card
            setEditableTask(editableTask.modifyFields(taskFields));
            editTaskInDB(editableTask).catch(error => props.onError(error.message));
            setTask(editableTask.buildTask());
        }
        // to allow the form submission to occur before switching out
        setTimeout(() => setIsEdit(!isEdit), 10);
    }
    return (
        <Card variant="outlined" className={ classes.root }>
            { content }
            <CardActions>
                <Button className={classes.edit} size="small" onClick={onEdit}><EditButtonText /></Button>
                <Button className={classes.delete} size="small" onClick={props.onDelete}>Delete</Button>
            </CardActions>
        </Card>
    )
}

export default TaskCard;
