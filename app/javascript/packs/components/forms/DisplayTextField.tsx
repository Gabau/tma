import { TextField } from '@material-ui/core';
import * as React from 'react';

type DisplayTextFieldProps = {
    required: boolean;
    onChange: (event) => void;
    value: string;
    isEdit: boolean;
    displayText: JSX.Element;
    label: string;
    autoFocus: boolean;
    fullWidth?: boolean;
};

/**
 * A text field react component which can be switched with a
 * different component to display through the use of the displayText
 * prop.
 * @param props DisplayTextFieldProps which contain the above fields.
 */
const DisplayTextField: React.FC<DisplayTextFieldProps> = (props: DisplayTextFieldProps) => {
    const fullWidth = props.fullWidth === undefined ? false : props.fullWidth;
    const [result, setResult] = React.useState();
    const editText = (
        <TextField
            fullWidth={fullWidth}
            autoFocus={props.autoFocus}
            label={props.label}
            required={props.required}
            onChange={props.onChange}
            value={props.value}
        />
    );
    const displayText = props.displayText;
    if (props.isEdit) {
        return editText;
    }
    return displayText;
};

export default DisplayTextField;
