import { makeStyles } from '@material-ui/core';
import * as React from 'react';
import Tag from '../data/Tag';
import { TagChip } from './TagChip';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
}));

type TagListProps = {
    tags: Tag[];
    onDelete?: (tag: Tag) => void;
};

const TagList: React.FC<TagListProps> = (props: TagListProps) => {
    const classes = useStyles();
    let mapFunction = (tag: Tag) => (
        <div key={tag.id}>
            <TagChip tag={tag} onDelete={props.onDelete} />
        </div>
    );
    return <div className={classes.root}>{props.tags.map(mapFunction)}</div>;
};

export default TagList;
