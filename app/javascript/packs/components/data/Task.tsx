import Tag from "./Tag";

// represents a task
// todo: Remove tags from task? Does not seem to be appropriate as it does not follow the modelling in the backend.
// ALternatively, can change the backend to return a json with the tags instead
type Task = {
    name: string;
    description?: string;
    tags?: Tag[];
    id?: number;
}

export default Task;

export function clone(task: Task): Task {
    return {
        name: task.name,
        description: task.description,
        tags: task.tags,
        id: task.id,
    }
}