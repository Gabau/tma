import { useState } from "react";

export default function useTitle(val: string, isSet: boolean): string {
    const [title, setTitle] = useState('Task');
    
    if (!isSet) {
        return title;
    }
    setTitle(val);
    return title;
}



