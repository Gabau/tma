import { Button, Card, CardActions, CardContent, createStyles, makeStyles, TextField, Typography } from "@material-ui/core";
import { green, red } from "@material-ui/core/colors";
import * as React from "react";
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
    const [task, setTask] = React.useState(clone(props.task))
    const baseContent = (
        <CardContent>
            <Typography>{task.name}</Typography>
            <TagBox task={task}></TagBox>
        </CardContent>
    );
    const editContent = (
        <CardContent>
            <form onSubmit={onEdit}>
            <TextField label="name" onChange={(event) => setTask({ ...task, name: event.target.value })} value={task.name}></TextField>
            </form>
        </CardContent>
    )
    const content = isEdit ? editContent : baseContent;

    function onEdit() {
        // to Send the api request and refresh the card on error
        const url = `/api/tasks/edit/${task.id}`;
        const token = getCSRFToken();
        if (isEdit) {
            // when edit is done, send the api request
            // to update.
            
            fetch(url, {
                method: 'POST',
                headers: {
                    "X-CSRF-Token": token,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(task)
            }).then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error("Network response was not ok");
            }).catch(error => props.onError(error.message));
        }
        setIsEdit(!isEdit);
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
