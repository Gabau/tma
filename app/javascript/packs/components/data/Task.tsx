import Tag from "./Tag";

// represents a task
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
