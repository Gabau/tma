import { Button, makeStyles } from "@material-ui/core";
import * as React from "react";
import { EditResponseForm, editTaskInDB } from "../api/TaskAPIRequests";
import EditableTask from "../data/EditableTask";
import Tag from "../data/Tag";
import Task from "../data/Task";
import TagChip from "./TagChip";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    dropdown: {
        position: 'absolute',
    },
}))

type TagBoxProps = {
    task: Task,
    editableTask: EditableTask,
    onError: (msg: string) => void,
}

const TagBox: React.FC<TagBoxProps> = (props: TagBoxProps) => {
    const classes = useStyles();
    const [tags, setTags] = React.useState(props.task.tags);
    function deleteHandler(tag: Tag) {
        
        // quicker delete first
        setTags(tags.filter(otherTag => otherTag.id != tag.id));
        const url = '';
        // then perform the actual api call.
        try {
            props.editableTask.deleteTag(tag);
        } catch(error) {
            props.onError(error.message);
        }
        editTaskInDB(props.editableTask)
            .then(responseHandler)
            .catch(error => props.onError(error.message)); // perform an update of tag ids
    
    }
    function addHandler() {
        // perform update
        props.editableTask.addTag({ name: 'Someone' });
        editTaskInDB(props.editableTask).then(responseHandler).catch(error => props.onError(error.message));
        
        
    }

    function responseHandler(response: EditResponseForm) {
        setTags(response.tags);
        props.editableTask.reset(response);
    }

    return (
        <div className={classes.root}>
            <Button
                onClick={addHandler}>Add tag</Button>
            {tags.map((tag: Tag) => 
                <div key={tag.id}>
                    <TagChip tag={tag} onDelete={deleteHandler} />
                </div>)}
        </div>
    )
}

export default TagBox;



