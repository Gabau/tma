import { Chip } from '@material-ui/core';
import * as React from 'react';
import Tag from '../data/Tag';

type TagChipProps = {
    tag: Tag;
    onDelete: (tag: Tag) => void;
};

const TagChip: React.FC<TagChipProps> = (props: TagChipProps) => {
    return <Chip size="small" label={props.tag.name} onDelete={(event) => props.onDelete(props.tag)} color="primary" />;
};

export default TagChip;
