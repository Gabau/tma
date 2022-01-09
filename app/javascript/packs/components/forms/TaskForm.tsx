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
    // the count of the tasks in the current form -- to assign for ids.
    // for the list to keep track of the keys
    count: number;
};

const TaskForm: React.FC<TaskFormProp> = (props: TaskFormProp) => {
    const [state, setState] = React.useState({ isOpen: false, task: { name: '', tags: [] }, tag_name: '', count: 0 });
    const close = () => setState({ task: { name: '', tags: [] }, isOpen: false, tag_name: '', count: state.count });
    const open = () => setState({ ...state, isOpen: true });

    function addTask(event) {
        event.preventDefault();
        if (props.taskConsumer != undefined) {
            props.taskConsumer(state.task);
        }
        close();
    }
    return (
        <div>
            <Button variant="outlined" color="primary" onClick={open}>
                Add Task
            </Button>

            <Dialog open={state.isOpen} onClose={close}>
                <DialogTitle>Add Tasks</DialogTitle>
                <DialogContent>
                    <form onSubmit={addTask}>
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
                            value={state.task.name}
                            onChange={(event) =>
                                setState({ ...state, task: { ...state.task, name: event.target.value } })
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
                            const newTag = { ...tag, id: state.count };
                            // count change
                            state.count += 1;
                            const newTags = state.task.tags.slice();
                            newTags.unshift(newTag);
                            setState({ ...state, task: { ...state.task, tags: newTags } });
                        }}
                    />
                    {/* Display for new tags */}
                    <TagList
                        tags={state.task.tags}
                        onDelete={(tag) => {
                            const newTags = state.task.tags.slice().filter((otherTag) => otherTag.name != tag.name);
                            setState({ ...state, task: { ...state.task, tags: newTags } });
                        }}
                    />
                    <DialogActions>
                        <Button variant="outlined" color="primary" onClick={addTask}>
                            Add task
                        </Button>
                    </DialogActions>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default TaskForm;
