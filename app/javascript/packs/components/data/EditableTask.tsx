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

/**
 * Represents an editable task.
 */
export default class EditableTask {
    private added_tags: Tag[];
    private deleted_tags: Tag[];
    private display_tags: Tag[];

    constructor(private task: Task) {
        this.added_tags = [];
        this.deleted_tags = [];
        this.display_tags = task.tags;
    }

    /**
     * Creates the information to be sent to edit a task.
     * @returns EDitableTaskAdaptedToDB to send to the backend containing information of
     *          the modifications to be made to the task.
     */
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

    /**
     * Add a tag to this editable task.
     * @param tag The tag to add.
     * @returns The EditableTask with the tag to add.
     */
    addTag(tag: Tag): EditableTask {
        if (this.deleted_tags.some((t) => t.name === tag.name)) {
            this.deleted_tags = this.deleted_tags.filter((t) => t.name !== tag.name);

            return;
        }
        if (this.task.tags.some((t) => t.name === tag.name)) {
            throw new Error('Tag to add is already stored');
        }
        this.added_tags.unshift(tag);
        this.display_tags.unshift(tag);
        return this;
    }

    /**
     * Removes a tag from this editable task.
     * @param tag The tag to remove.
     * @returns The EditableTask without the tag to remove.
     */
    deleteTag(tag: Tag): EditableTask {
        if (this.added_tags.some((t) => t.name === tag.name)) {
            this.added_tags = this.added_tags.filter((t) => t.name !== tag.name);

            return;
        }
        if (this.display_tags.filter((t) => t.name === tag.name).length === 0) {
            throw new Error('Tag to delete does not exist.');
        }
        this.display_tags = this.display_tags.filter((t) => t.name !== tag.name);
        this.deleted_tags.unshift(tag);
        return this;
    }

    /**
     * Changes the fields of the underlying task.
     * @param taskFields The fields of the task to modify.
     * @returns The EditableTask with the modified fields.
     */
    modifyFields(taskFields: TaskFields): EditableTask {
        this.task = { ...this.task, ...taskFields };
        return this;
    }

    /**
     * Reset this editableTask to use the input task as initial state,
     * and reset to initial state.
     * @param task The underlying task object.
     * @returns The resulting
     */
    reset(task: Task): EditableTask {
        this.task = task;
        this.display_tags = this.task.tags;
        this.deleted_tags = [];
        this.added_tags = [];
        return this;
    }

    /**
     * Get the tags that the resulting task has.
     */
    getTags(): Tag[] {
        return this.display_tags;
    }

    /**
     * Duplicates the editableTask, retaining all edited information.
     * @returns The duplicated object.
     */
    clone(): EditableTask {
        const result = new EditableTask(this.buildTask());
        result.added_tags = this.added_tags.slice();
        result.deleted_tags = this.deleted_tags.slice();
        return result;
    }
}
