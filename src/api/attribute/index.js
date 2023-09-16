let URL = 'http://127.0.0.1:8000/api'
export async function getAttributeAllApi() {
    let response = await fetch(`${ URL }/attributes`, {
        method: 'GET'
    })
    return await response.json();
}

export async function saveAttributeApi(data) {
    let response = await fetch(`${ URL }/attributes`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    return await response.json();
}

export async function getValuesByAttrApi(id) {
    let response = await fetch(`${ URL }/attributes/value/${id}`, {
        method: 'GET'
    });
    return await response.json();
}

export async function saveAttrValueApi(data) {
    let response = await fetch(`${ URL }/attributes/value`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    return await response.json();
}

