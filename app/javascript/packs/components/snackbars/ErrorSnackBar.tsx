// for rendering the error snackbar

import * as React from "react";
import { Snackbar } from "@material-ui/core";

type ErrorProps = {
    message: string;
    isOpen: boolean;
    onClose: () => void;
}


export default function ErrorSnackBar(props: ErrorProps) {
    
    return <Snackbar open={props.isOpen} message={props.message} autoHideDuration={5000} onClose={props.onClose} />
}


