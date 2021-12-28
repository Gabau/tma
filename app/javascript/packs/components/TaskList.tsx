import { Button, Card, CardActions, CardContent, List, ListItem, Theme, Typography } from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/styles";
import * as React from "react";
import { classicNameResolver } from "typescript";


const useStyle = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },

    }),
);


// represents a task
type Task = {
    name: string;
    tags?: string[];
}

type TaskProp = {

}

type TaskState = {
    tasks: Task[];
    toRender: React.ReactNode;
}

type TaskCardProps = {
    task: Task;
    onDelete: () => void;
}


const TaskCard: React.FC<TaskCardProps> = (props: TaskCardProps) => {
    const classes = useStyle();
    return (
        <Card variant="outlined" className={ classes.root }>
            <CardContent>
                <Typography>{props.task.name}</Typography>
            </CardContent>
            <CardActions>
                <Button size="small" onClick={props.onDelete}>Delete</Button>
            </CardActions>
        </Card>
    )
}

const defaultList: Task[] = [
    { name: "Someone", tags: [] },
    { name: "No one", tags: [] },
    { name: "Some kind of task" },
    { name: "Not really a task" },
    { name: "Maybe a task" },
];

class TaskList extends React.Component<TaskProp, TaskState> {
    constructor(props: TaskProp) {
        super(props);
        this.state = {
            tasks: defaultList,
            toRender: defaultList.map((val) => this.generateTaskCard(val)),
        };
    }

    render() {
        return (
            <List>
                {this.state.toRender}
            </List>
        )
    }

    generateTaskCard(task: Task): React.ReactNode {
        return (
            <ListItem>
                 <TaskCard onDelete={this.deleteHandler(task).bind(this)} task={task} />
            </ListItem>
        )
    }

    deleteHandler(task: Task) {
        return () => {
            const filtered = this.state.tasks.filter((t) => t.name != task.name);
            this.setState({
                tasks: filtered,
                toRender: filtered.map((val) => this.generateTaskCard(val)),
            })
        }
    }

}



export default TaskList;
