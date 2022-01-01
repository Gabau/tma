// represents a task
type Task = {
    name: string;
    description?: string;
    tags?: string[];
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