import * as React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from "../packs/components/HomePage";

type RouterProps = {
    onError: (msg: string) => void;
}

export default (props: RouterProps) => (
    <div>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage onError={props.onError}/>} />
            </Routes>
        </BrowserRouter>
    </div>
)

