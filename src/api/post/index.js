const URL = 'https://dummyjson.com'
export async function getOnePost() {
    let response = await fetch(`${ URL }/posts/1`, {
        method: 'GET'
    }) 
    return await response.json();
}
export async function getAllPost() {
    let response = await fetch(`${ URL }/posts`, {
        method: 'GET'
    }) 
    return await response.json();
}

export async function getCostume() {
     
    return await getAllPost();
}