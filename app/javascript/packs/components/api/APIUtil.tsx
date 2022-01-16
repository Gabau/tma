export function checkResponse(response: Response) {
    
    if (response.ok) {
        return response.json();
    }
    throw new Error("Network response was not ok");
}