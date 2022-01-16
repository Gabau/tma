import Tag from "../data/Tag";
import { getCSRFToken } from "../util/csrfGenerator";
import { checkResponse } from "./APIUtil"


export async function getTags(): Promise<Tag[]> {
    const url = 'api/tag/index';
    return fetch(url).then(checkResponse);
}



export async function deleteTag(tag: Tag): Promise<Response> {
    const url = `api/tag/destroy/${tag.id}`;
    const token = getCSRFToken();
    return fetch(url, {
        method: "DELETE",
        headers: {
            "X-CSRF-Token": token,
            "Content-Type": "application/json",
        },
    }).then(checkResponse);
}

export async function editTag(tag: Tag) {
    const url = `api/tag/edit/${tag.id}`
    const token = getCSRFToken();
    return fetch(url, {
        method: "POST",
        headers: {
            "X-CSRF-Token": token,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(tag),
    }).then(checkResponse);
}