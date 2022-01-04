import Tag from "./Tag";
import Task from "./Task";

// The parameters to put into the database
type EditableTaskAdaptedToDB = {
    name: string,
    description?: string,
    id?: number,
    added_tags: Tag[],
    deleted_tags: Tag[],
}

// ultility type for modifying tasks via editable task
type TaskFields = {
    name?: string;
    description?: string;
    tags?: Tag[];
    id?: number;
}


export default class EditableTask {
    private added_tags: Tag[];
    private deleted_tags: Tag[];

    constructor(private task: Task) {
        this.added_tags = [];
        this.deleted_tags = [];
    }


    build(): EditableTaskAdaptedToDB {
        return {
            ...this.task,
            added_tags: this.added_tags,
            deleted_tags: this.deleted_tags,
        };
    }

    buildTask(): Task {
        return {
            ...this.task,
        }
    }

    addTag(tag: Tag): EditableTask {
        this.added_tags.unshift(tag);
        return this;
    }

    deleteTag(tag: Tag): EditableTask {
        //check if the tag exists
        if (this.task.tags.filter(t => t.name === tag.name).length === 0) {
            throw new Error("Tag to delete does not exist.");
        }
        this.deleted_tags.unshift(tag);
        return this;
    }

    modifyFields(taskFields: TaskFields): EditableTask {
        this.task = { ...this.task, ...taskFields };
        return this;
    }

    reset(task: Task): void {
        this.task = task;
        this.deleted_tags = [];
        this.added_tags = [];
    }
}



