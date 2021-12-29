
import * as React from "react"
import { useState } from "react";
import Router from "../routes/Router"
import Menu from "./components/Menu";
import ErrorSnackBar from "./components/snackbars/ErrorSnackBar";
import TopBar from "./components/TopBar"

export default () => {
    const [menuIsOpen, setIsOpen] = useState(false);
    const [errorIsOpen, setErrorOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const toggle = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
        if (
            event.type === 'keydown' &&
            ((event as React.KeyboardEvent).key === 'Tab' ||
              (event as React.KeyboardEvent).key === 'Shift')
        ) {
            return;
        }
        setIsOpen(open);
    }

    function errorHandler(msg: string) {
        setErrorMessage(msg);
        setErrorOpen(true);
    }

    return (
        <div>
            <TopBar menuFunc={toggle(true)} />
            <Menu isOpen={menuIsOpen} onClose={toggle(false)} />
            <Router onError={(str) => errorHandler(str)} />
            <ErrorSnackBar isOpen={errorIsOpen} message={errorMessage} onClose={() => setErrorOpen(false)} />
        </div>
    )
}