import {
    makeStyles,
    Paper,
    TableBody,
    TableContainer,
    TableHead,
    TableRow,
    TableCell,
    Table,
    Button,
    Chip,
    Typography,
} from '@material-ui/core';
import { green, red } from '@material-ui/core/colors';
import * as React from 'react';
import { deleteTag, editTag, getTags } from '../api/TagAPIRequests';
import Tag from '../data/Tag';
import DisplayTextField from '../forms/DisplayTextField';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    header: {
        '& .MuiTableCell-head': {
            color: theme.palette.common.white,
            backgroundColor: theme.palette.primary.main,
        },
        color: theme.palette.common.white,
        backgroundColor: theme.palette.primary.main,
    },
    delete: {
        color: red.A700,
    },
    edit: {
        color: green.A700,
    },
}));

type TagIndexProp = {
    onError: (msg: string) => void;
};

type TagItemProps = {
    tag: Tag;
    refresh: () => void;
    onError: (msg: string) => void;
};

/**
 * The tag index component, displays a list of the tags available in the application.
 * Allows deleting of tags.
 */
const TagIndex: React.FC<TagIndexProp> = (props: TagIndexProp) => {
    const [state, setState] = React.useState({ tags: [] });
    const classes = useStyles();
    React.useEffect(refresh, []);

    function refresh() {
        getTags()
            .then((response) => {
                setState({ ...state, tags: response });
            })
            .catch((error) => props.onError);
        return;
    }
    return (
        <TableContainer component={Paper} elevation={10}>
            <Table stickyHeader>
                <TableHead>
                    <TableRow className={classes.header}>
                        <TableCell width="20%" align="left">
                            Tag name
                        </TableCell>
                        {/* Fix issue of uncolored cells in header by adding empty cells*/}
                        <TableCell align="left" width="50%">
                            Tag description
                        </TableCell>
                        <TableCell align="right" />
                    </TableRow>
                </TableHead>
                <TableBody>
                    {state.tags.map((t) => (
                        <TagItem key={t.id} onError={props.onError} refresh={refresh} tag={t} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

const TagItem: React.FC<TagItemProps> = (props: TagItemProps) => {
    const classes = useStyles();
    const [displayTag, setDisplayTag] = React.useState(props.tag);
    const [isEdit, setIsEdit] = React.useState(false);

    function handleDelete() {
        // send api request
        deleteTag(props.tag)
            .then(props.refresh)
            .catch((error) => props.onError(error.message));
    }
    function handleEdit(event) {
        event.preventDefault();
        setIsEdit(!isEdit);
        // send api request
        editTag(displayTag)
            .then(props.refresh)
            .catch((error) => props.onError(error.message));
        // refresh

        props.refresh();
    }

    const tagname = <Chip label={displayTag.name} />;
    const tagDescription = <Typography>{displayTag.description}</Typography>;
    // perform edit on a seperate data structure,
    // and then update the form
    // have to switch the cells corresponding to the content
    // todo: add redirect for each tag to landing page
    const editButtonText = isEdit ? 'Save' : 'Edit';
    return (
        <TableRow>
            <TableCell align="left" width="20%">
                <form onSubmit={handleEdit}>
                    <DisplayTextField
                        value={displayTag.name}
                        onChange={(event) => setDisplayTag({ ...displayTag, name: event.target.value })}
                        required={true}
                        label="Tag Name"
                        isEdit={isEdit}
                        displayText={tagname}
                        autoFocus={true}
                    />
                </form>
            </TableCell>
            <TableCell align="left" width="50%">
                <form onSubmit={handleEdit}>
                    <DisplayTextField
                        value={displayTag.description}
                        onChange={(event) => setDisplayTag({ ...displayTag, description: event.target.value })}
                        required={false}
                        label="Tag Description"
                        isEdit={isEdit}
                        displayText={tagDescription}
                        fullWidth={true}
                        autoFocus={false}
                    />
                </form>
            </TableCell>
            <TableCell align="right">
                <Button className={classes.edit} onClick={handleEdit}>
                    {editButtonText}
                </Button>
                <Button className={classes.delete} onClick={handleDelete}>
                    Delete
                </Button>
            </TableCell>
        </TableRow>
    );
};

export default TagIndex;
