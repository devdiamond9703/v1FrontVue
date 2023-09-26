let URL = 'http://127.0.0.1:8000/api';
export async function checkUser(data) {
    let response = await fetch(`${ URL }/login`, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    return await response.json();
}