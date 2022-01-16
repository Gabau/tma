import * as React from 'react';
import TaskList from './TaskList';

type Prop = {
    onError: (msg: string) => void;
};

function HomePage(props: Prop): JSX.Element {
    return <TaskList onError={props.onError}></TaskList>;
}

export default HomePage;
