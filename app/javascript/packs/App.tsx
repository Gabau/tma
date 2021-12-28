
import * as React from "react"
import { useState } from "react";
import Router from "../routes/Router"
import Menu from "./components/Menu";
import TopBar from "./components/TopBar"

export default () => {
    const [menuIsOpen, setIsOpen] = useState(false);
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

    return (
        <div>
            <TopBar menuFunc={toggle(true)} />
            <Menu isOpen={menuIsOpen} onClose={toggle(false)} />
            <Router />
        </div>
    )
}