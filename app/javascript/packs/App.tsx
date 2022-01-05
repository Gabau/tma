
import { createTheme, rgbToHex, ThemeProvider } from "@material-ui/core";
import { grey, red } from "@material-ui/core/colors";
import * as React from "react"
import { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import Router from "../routes/Router"
import Menu from "./components/Menu";
import ErrorSnackBar from "./components/snackbars/ErrorSnackBar";
import TopBar from "./components/TopBar"

const theme = createTheme({
    palette: {
        primary: {
            main: grey[700],

        }
    }
})

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
        <ThemeProvider theme={theme}>
            <BrowserRouter>
                <TopBar menuFunc={toggle(true)} />
                <Menu onNavigate={() => setIsOpen(false)} isOpen={menuIsOpen} onClose={toggle(false)} />
                <Router onError={(str) => errorHandler(str)} />
                <ErrorSnackBar isOpen={errorIsOpen} message={errorMessage} onClose={() => setErrorOpen(false)} />
            </BrowserRouter>
        </ThemeProvider>
    )
}