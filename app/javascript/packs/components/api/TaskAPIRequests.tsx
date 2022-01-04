import { Repeat } from "@material-ui/icons";
import EditableTask from "../data/EditableTask";
import Task from "../data/Task";
import { getCSRFToken } from "../util/csrfGenerator";



export type EditResponseForm = Task;

export function getTasksFromDB(): Promise<Task[]> {
    const url = '/api/tasks/index'
    return fetch(url)
        .then(checkResponse);
}

export async function createTaskInDB(task: Task): Promise<Response> {
    const url = '/api/tasks/create';
    const token = getCSRFToken();
    return fetch(url, {
        method: "POST",
        headers: {
            "X-CSRF-Token": token,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(task),
    }).then(checkResponse).then(response => {
        return response;

    });
}


export async function deleteTaskInDB(task: Task): Promise<Response> {
    const url = `/api/tasks/destroy/${task.id}`
    const token = getCSRFToken();
    return fetch(url, {
        method: "DELETE",
        headers: {
            "X-CSRF-Token": token,
            "Content-Type": "application/json"
        }
    }).then(checkResponse);

}




export async function editTaskInDB(editableTask: EditableTask): Promise<EditResponseForm> {
    const task = editableTask.build();
    const url = `/api/tasks/edit/${task.id}`;
    const token = getCSRFToken();
    return fetch(url, {
        method: 'POST',
        headers: {
            "X-CSRF-Token": token,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(task)
    }).then(checkResponse).then(response => {
        console.log(response);
        return response;
    });

}

function checkResponse(response: Response) {
    
    if (response.ok) {
        return response.json();
    }
    throw new Error("Network response was not ok");
}

