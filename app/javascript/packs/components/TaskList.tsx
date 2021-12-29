import { Button, Card, CardActions, CardContent, List, ListItem, Theme, Typography } from "@material-ui/core";
import { FilterTiltShiftTwoTone } from "@material-ui/icons";
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
    description?: string;
    tags?: string[];
    id?: number;
}

type TaskProp = {
    onError: (msg: string) => void;
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
        this.getTasks();
    }

    render() {
        return (
            <React.Fragment>
                <List>
                    {this.state.toRender}
                </List>
            </React.Fragment>
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
            const url = `/api/tasks/destroy/${task.id}`
        const token = document.querySelector('meta[name="csrf-token"]').content;
            const filtered = this.state.tasks.filter((t) => t.id != task.id);
            this.setState({
                tasks: filtered,
                toRender: filtered.map((val) => this.generateTaskCard(val)),
            })
            // perform the delete via api
            fetch(url, {
                method: "DELETE",
                headers: {
                    "X-CSRF-Token": token,
                    "Content-Type": "application/json"
                }
            })
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error("Network response was not ok");
            })
            .catch(error => {
                this.props.onError(error.message);
                this.getTasks();  // to refresh the list
            });
        }
    }

    createHandler(task: Task) {
        const url = '/api/tasks/create'
        const token = document.querySelector('meta[name="csrf-token"]').textContent;
        fetch(url, {
            method: "POST",
            headers: {
                "X-CSRF-Token": token,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(task),
        }).catch(error => console.log(error.message));
        this.getTasks();
    } 


    getTasks() {
        const url = '/api/tasks/index'
        const response =  fetch(url)
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error("Network response not okay");
            }).then(response => this.setState({ tasks: response, toRender: response.map(val => this.generateTaskCard(val)) }))
            .catch(error => this.props.onError(error.message));
    }

}


export default TaskList;
