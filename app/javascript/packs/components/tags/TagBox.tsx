import { Button, makeStyles } from "@material-ui/core";
import * as React from "react";
import Tag from "../data/Tag";
import Task from "../data/Task";
import TagChip from "./TagChip";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
}))

type TagBoxProps = {
    task: Task
}

function TagBox(props: TagBoxProps): React.ReactNode {
    const classes = useStyles();
    const [tags, setTags] = React.useState(props.task.tags);
    function deleteHandler(tag: Tag) {
        // quicker delete first
        setTags(tags.filter(otherTag => otherTag.id != tag.id));
        const url = '';
        // then perform the actual api call.
        fetch(url);
    }
    function addHandler() {
        const val = tags.slice();
        val.unshift({ name: 'Someone' });
        setTags(val);
    }
    return (
        <div className={classes.root}>
            <Button 
                size="small"
                onClick={addHandler}>Add tag</Button>
            {tags.map((tag: Tag) => <TagChip tag={tag} onDelete={deleteHandler} />)}
        </div>
    )
}

export default TagBox;



