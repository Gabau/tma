// a form for selecting tags for a task
// or creating one immediately

import { TextField, Typography } from '@material-ui/core';
import * as React from 'react';
import { getTags } from '../api/TagAPIRequests';
import Tag from '../data/Tag';
import TagAutoCompleteSelector from '../dropdowns/TagAutoCompleteSelector';

type TagFormProps = {
    onSubmit: (tag: Tag) => void;
};

/**
 * A react function compoenent representing a form for creating tags.
 *
 * @param props The parameters of the tag form.
 *              Requires what to do when the form is submitted.
 *              Provides a tag on submission.
 * @returns The React component of the form.
 */
const TagForm: React.FC<TagFormProps> = (props: TagFormProps) => {
    // The tag that is created by the form
    const [tag, setTag] = React.useState({
        name: '',
    });
    const [tags, setTags] = React.useState([]);
    React.useEffect(() => {
        getTags().then((response) => setTags(response));
    }, []);
    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                if (tag.name === '') {
                    return;
                }
                props.onSubmit(tag);
                setTag({ name: '' });
            }}
        >
            <Typography>Key in the tag name to select the tag</Typography>
            <TagAutoCompleteSelector onChange={(msg) => setTag({ name: msg })} value={tag.name} tags={tags} />
        </form>
    );
};

export default TagForm;
