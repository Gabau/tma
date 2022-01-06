import { Chip } from '@material-ui/core';
import * as React from 'react';
import Tag from '../data/Tag';

type TagChipProps = {
    tag: Tag;
    onDelete?: (tag: Tag) => void;
};

export const TagChip: React.FC<TagChipProps> = (props: TagChipProps) => {
    let onDelete: (event: any) => void = undefined;
    if (props.onDelete) {
        onDelete = (event) => props.onDelete(props.tag);
    }
    return <Chip size="small" label={props.tag.name} onDelete={onDelete} color="primary" />;
};
