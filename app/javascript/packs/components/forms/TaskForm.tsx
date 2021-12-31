import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@material-ui/core';
import * as React from 'react';
import Task from '../data/Task';

type TaskFormProp = {
    taskConsumer?: (task: Task) => void,
}

type TaskFormState = {
    isOpen: boolean;
    task: Task;
}


/**
 * Class representing the form to create a task.
 * 
 */
export default class TaskForm extends React.Component<TaskFormProp, TaskFormState>{

    constructor(props: TaskFormProp) {
        super(props);
        this.state = {
            isOpen: false,
            task: { name: "" },
        }
        this.close = this.close.bind(this);
        this.open = this.open.bind(this);
        this.addTask = this.addTask.bind(this);
    }


    close() {
        // To deal with activating the add task button on submission of the form.
        this.setState({ isOpen: false });  
    }

    open() {
        this.setState({ isOpen: true });
    }

    render() {
        return (
            <div>
                
                <Button variant="outlined" color="primary"  onClick={this.open}>
                    Add Task
                </Button>
                
                    <Dialog open={this.state.isOpen} onClose={this.close}>
                        <DialogTitle>Add Tasks</DialogTitle>
                        <DialogContent>
                        <form onSubmit={this.addTask.bind(this)}>
                                <DialogContentText>
                                    To add a task to the application, please enter the name of the task here, along with
                                    any additional information.
                                </DialogContentText>
                                <TextField
                                    required={true}
                                    autoFocus={true}
                                    margin="dense"
                                    id="name"
                                    label="Name"
                                    fullWidth
                                    value={this.state.task.name}
                                    onChange={(event) => this.setState({ task: { name: event.target.value } })}
                                />
                                <Button variant="outlined" color="primary" type="submit">
                                    Add task                            
                                </Button>
                            </form>
                        </DialogContent>
                    </Dialog>
                
            </div>
        )        
    }

    private addTask(event) {
        event.preventDefault();
        if (this.props.taskConsumer != undefined) {
            this.props.taskConsumer(this.state.task);
        }
        this.close();
        this.setState({ task: { name: "" } });
        
    }
}



