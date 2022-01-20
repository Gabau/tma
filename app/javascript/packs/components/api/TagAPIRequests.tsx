import Tag from '../data/Tag';
import { getCSRFToken } from '../util/csrfGenerator';
import { checkResponse } from './APIUtil';

/**
 * Obtains the tags from backend.
 * @returns The promise with the tags retreived from the backend.
 */
export async function getTags(): Promise<Tag[]> {
    const url = 'api/tag/index';
    return fetch(url).then(checkResponse);
}

/**
 * Removes a tag from backend.
 * @param tag THe tag to remove.
 * @returns A promise with the json response from backend.
 */
export async function deleteTag(tag: Tag): Promise<Response> {
    const url = `api/tag/destroy/${tag.id}`;
    const token = getCSRFToken();
    return fetch(url, {
        method: 'DELETE',
        headers: {
            'X-CSRF-Token': token,
            'Content-Type': 'application/json',
        },
    }).then(checkResponse);
}

/**
 * Modifies a tag in backend to have the same fields as the input tag.
 * @param tag The fields to duplicate, tag.id is the id of the tag to modify.
 * @returns The response.
 */
export async function editTag(tag: Tag) {
    const url = `api/tag/edit/${tag.id}`;
    const token = getCSRFToken();
    return fetch(url, {
        method: 'POST',
        headers: {
            'X-CSRF-Token': token,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(tag),
    }).then(checkResponse);
}
