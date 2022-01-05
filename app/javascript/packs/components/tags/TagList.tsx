import { makeStyles } from '@material-ui/core';
import { TagFacesSharp } from '@material-ui/icons';
import * as React from 'react';
import Tag from '../data/Tag';
import TagChip from './TagChip';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
}));

type TagListProps = {
    tags: Tag[];
    onDelete: (tag: Tag) => void;
};

const TagList: React.FC<TagListProps> = (props: TagListProps) => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            {props.tags.map((tag: Tag) => (
                <div key={tag.id}>
                    <TagChip tag={tag} onDelete={props.onDelete} />
                </div>
            ))}
        </div>
    );
};

export default TagList;
