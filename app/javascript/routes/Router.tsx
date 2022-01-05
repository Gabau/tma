import * as React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Tag from '../packs/components/data/Tag';
import TagForm from '../packs/components/forms/TagForm';
import HomePage from '../packs/components/HomePage';
import TagIndex from '../packs/components/pages/TagIndex';

type RouterProps = {
    onError: (msg: string) => void;
};

export default (props: RouterProps) => (
    <Routes>
        <Route path="/" element={<HomePage onError={props.onError} />} />
        <Route path="/tags" element={<TagIndex onError={props.onError} />} />
        <Route path="/test" element={<TagForm onSubmit={(tag: Tag) => {}} />} />
    </Routes>
);
