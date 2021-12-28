import * as React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from "../packs/components/HomePage";

export default () => (
    <div>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />} />
            </Routes>
        </BrowserRouter>
    </div>
)

