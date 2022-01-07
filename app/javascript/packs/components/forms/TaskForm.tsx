import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField,
} from '@material-ui/core';
import { ThreeSixty } from '@material-ui/icons';
import * as React from 'react';
import Tag from '../data/Tag';
import Task from '../data/Task';
import TagList from '../tags/TagList';
import TagForm from './TagForm';

type TaskFormProp = {
    taskConsumer?: (task: Task) => void;
};

type TaskFormState = {
    isOpen: boolean;
    task: Task;
    tag_name: string;
};

/**
 * Class representing the form to create a task.
 *
 */
export default class TaskForm extends React.Component<TaskFormProp, TaskFormState> {
    constructor(props: TaskFormProp) {
        super(props);
        this.state = {
            isOpen: false,
            task: { name: '', tags: [] },
            tag_name: '',
        };
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
                <Button variant="outlined" color="primary" onClick={this.open}>
                    Add Task
                </Button>

                <Dialog open={this.state.isOpen} onClose={this.close}>
                    <DialogTitle>Add Tasks</DialogTitle>
                    <DialogContent>
                        <form onSubmit={this.addTask.bind(this)}>
                            <DialogContentText>
                                To add a task to the application, please enter the name of the task here, along with any
                                additional information.
                            </DialogContentText>
                            <TextField
                                required={true}
                                autoFocus={true}
                                margin="dense"
                                id="name"
                                label="Name"
                                fullWidth
                                value={this.state.task.name}
                                onChange={(event) =>
                                    this.setState({ task: { ...this.state.task, name: event.target.value } })
                                }
                            />
                            <br />
                        </form>
                        <TagForm
                            onSubmit={(tag) => {
                                if (tag.name.trim() === '') {
                                    // handle empty input
                                    return;
                                }
                                const newTags = this.state.task.tags.slice();
                                newTags.unshift(tag);
                                this.setState({ task: { ...this.state.task, tags: newTags } });
                            }}
                        />
                        {/* Display for new tags */}
                        <TagList
                            tags={this.state.task.tags}
                            onDelete={(tag) => {
                                const newTags = this.state.task.tags
                                    .slice()
                                    .filter((otherTag) => otherTag.name != tag.name);
                                this.setState({ task: { ...this.state.task, tags: newTags } });
                            }}
                        />
                        <DialogActions>
                            <Button variant="outlined" color="primary" onClick={this.addTask.bind(this)}>
                                Add task
                            </Button>
                        </DialogActions>
                    </DialogContent>
                </Dialog>
            </div>
        );
    }

    private addTask(event) {
        event.preventDefault();
        if (this.props.taskConsumer != undefined) {
            this.props.taskConsumer(this.state.task);
        }
        this.close();
        this.setState({ task: { name: '', tags: [] } });
    }
}
