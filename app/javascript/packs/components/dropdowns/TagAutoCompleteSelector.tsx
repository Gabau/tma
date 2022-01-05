/**
 * Component representing a drop down menu to select a tag.
 *
 */

import { TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import * as React from 'react';
import Tag from '../data/Tag';

type TagAutoCompleteSelectorProps = {
    tags: Tag[];
    onChange: (msg: string) => void;
    value: string;
};

const TagAutoCompleteSelector: React.FC<TagAutoCompleteSelectorProps> = (props: TagAutoCompleteSelectorProps) => {
    return (
        <Autocomplete
            options={props.tags}
            getOptionLabel={(option) => option.name}
            inputValue={props.value}
            onInputChange={(event, newInputValue) => {
                props.onChange(newInputValue);
            }}
            renderInput={(params) => <TextField {...params} label="Combo box" variant="outlined" />}
        />
    );
};

export default TagAutoCompleteSelector;
