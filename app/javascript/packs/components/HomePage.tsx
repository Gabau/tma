import * as React from 'react';
import TaskList from './TaskList';

type Prop = {
    onError: (msg: string) => void;
}


function HomePage(props: Prop): JSX.Element {
    return (
        <React.Fragment>
            <TaskList onError={props.onError} ></TaskList>
        </React.Fragment>
    );
}

export default HomePage;


