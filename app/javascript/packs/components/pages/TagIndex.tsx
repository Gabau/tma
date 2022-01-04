import * as React from 'react';
import Tag from '../data/Tag';
import useTitle from '../hooks/TitleHook';

type TagIndexProp = {

}

type TagIndexState = {
    tags: Tag[];
}

class TagIndex extends React.Component<TagIndexProp, TagIndexState> {

    constructor(props: TagIndexProp) {
        super(props);

    }

    render() {
        return (
            <div>
                
            </div>
            
        )
    }

}

export default TagIndex;



