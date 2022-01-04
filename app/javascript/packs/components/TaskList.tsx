import { Button, Card, CardActions, CardContent, Hidden, List, ListItem, TextField, Theme, Typography } from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/styles";
import * as React from "react";
import TaskForm from "./forms/TaskForm";
import Task from "./data/Task";
import { green, red } from "@material-ui/core/colors";
import TaskCard from "./TaskCard";
import { createTaskInDB, deleteTaskInDB, getTasksFromDB } from "./api/TaskAPIRequests";

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




type TaskProp = {
    onError: (msg: string) => void;
}

type TaskState = {
    tasks: Task[];
    toRender: React.ReactNode;
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
                {this.generateList(this.state.toRender)}
            </React.Fragment>
        )
    }

    generateTaskCard(task: Task): React.ReactNode {
        return (
            <ListItem key={task.id}>
                 <TaskCard onError={this.props.onError} onDelete={this.deleteHandler(task).bind(this)} task={task} />
            </ListItem>
        )
    }

    generateList(node: React.ReactNode): React.ReactNode {
        return (
            <List>{node}</List>)
    }

    deleteHandler(task: Task) {
        return () => {
            // render the delete
            const filtered = this.state.tasks.filter((t) => t.id != task.id);
            this.setState({
                tasks: filtered,
                toRender: filtered.map((val) => this.generateTaskCard(val)),
            })
            // perform the delete via api
            deleteTaskInDB(task)
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
        // verify valid task
        const default_values = { description: "", tags: [] };
        const to_add = { ...task, ...default_values };
        if (!isValidTask(to_add)) {
            this.props.onError('Task not valid');
        }
        createTaskInDB(to_add).catch(error => this.props.onError(error.message));
        const temp = this.state.tasks.slice();
        temp.unshift(to_add);
        this.setState({tasks: temp, toRender: temp.map(val => this.generateTaskCard(val))});
        // to ensure that the database has been updated
        setTimeout(() => this.getTasks(), 300);
    }

    

    getTasks() {
        const url = '/api/tasks/index'
        getTasksFromDB()
            .then(response => this.setState({ tasks: response, toRender: response.map(val => this.generateTaskCard(val)) }))
            .catch(error => this.props.onError(error.message));
    }

}

function isValidTask(task: Task) {
    return task.name != "";
}

export default TaskList;
