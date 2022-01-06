import Tag from './Tag';
import Task from './Task';

// The parameters to put into the database
type EditableTaskAdaptedToDB = {
    name: string;
    description?: string;
    id?: number;
    added_tags: Tag[];
    deleted_tags: Tag[];
};

// ultility type for modifying tasks via editable task
type TaskFields = {
    name?: string;
    description?: string;
    tags?: Tag[];
    id?: number;
};

export default class EditableTask {
    private added_tags: Tag[];
    private deleted_tags: Tag[];
    private display_tags: Tag[];

    constructor(private task: Task) {
        this.added_tags = [];
        this.deleted_tags = [];
        this.display_tags = task.tags;
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
        };
    }

    addTag(tag: Tag): EditableTask {
        // deal with case that this tag is in deleted tags
        if (this.deleted_tags.some((t) => t.name === tag.name)) {
            this.deleted_tags = this.deleted_tags.filter((t) => t.name !== tag.name);
            // deal with the display_tags

            return;
        }
        if (this.task.tags.some((t) => t.name === tag.name)) {
            throw new Error('Tag to add is already stored');
        }
        this.added_tags.unshift(tag);
        this.display_tags.unshift(tag);
        return this;
    }

    deleteTag(tag: Tag): EditableTask {
        // deal with the case where the tag has been added recently
        if (this.added_tags.some((t) => t.name === tag.name)) {
            this.added_tags = this.added_tags.filter((t) => t.name !== tag.name);

            return;
        }
        //check if the tag exists
        if (this.display_tags.filter((t) => t.name === tag.name).length === 0) {
            throw new Error('Tag to delete does not exist.');
        }
        this.display_tags = this.display_tags.filter((t) => t.name !== tag.name);
        this.deleted_tags.unshift(tag);
        return this;
    }

    modifyFields(taskFields: TaskFields): EditableTask {
        this.task = { ...this.task, ...taskFields };
        return this;
    }

    reset(task: Task): EditableTask {
        this.task = task;
        this.display_tags = this.task.tags;
        this.deleted_tags = [];
        this.added_tags = [];
        return this;
    }

    getTags(): Tag[] {
        return this.display_tags;
    }
}
