import { Button, Card, CardActions, CardContent, List, ListItem, Theme, Typography } from "@material-ui/core";
import { FilterTiltShiftTwoTone } from "@material-ui/icons";
import { createStyles, makeStyles } from "@material-ui/styles";
import * as React from "react";
import { classicNameResolver } from "typescript";
import TaskForm from "./forms/TaskForm";
import Task from "./data/Task";
import { red } from "@material-ui/core/colors";

const useStyle = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        delete: {
            color: red.A700,
        },

    }),
);




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
                <Button className={classes.delete} size="small" onClick={props.onDelete}>Delete</Button>
            </CardActions>
        </Card>
    )
}

const defaultList: Task[] = [];

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
                <TaskForm taskConsumer={this.createHandler.bind(this)}></TaskForm>
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
        const token = document.querySelector('meta[name="csrf-token"]').content;
        const body: Task = {
            name: task.name
        }
        // verify valid task
        if (!isValidTask(body)) {
            this.props.onError('Task not valid');
        }

        fetch(url, {
            method: "POST",
            headers: {
                "X-CSRF-Token": token,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body),
        }).catch(error => this.props.onError(error.message));
        const temp = this.state.tasks.slice();
        temp.unshift(body);
        this.setState({tasks: temp, toRender: temp.map(val => this.generateTaskCard(val))});
        // to ensure that the database has been updated
        setTimeout(() => this.getTasks(), 300);
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

function isValidTask(task: Task) {
    return task.name != "";
}

export default TaskList;
