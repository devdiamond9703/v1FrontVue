let URL = 'http://127.0.0.1:8000/api';
export async function getCategoryAllApi() {
    let response = await fetch(`${ URL }/categories`, {
        method: "GET"
    })
    return await response.json();
}

export async function saveCategoryApi(data) {
    let response = await fetch(`${ URL }/categories`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    return await response.json();
}

export async function getAttrByCategoryApi(id) {
    let response = await fetch(`${ URL }/categories/attr/${id}`, {
        method: "GET"
    })
    return await response.json()
}

export async function saveCategryAttributeApi(data) {
    let response = await fetch(`${ URL }/categories/attr`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    return await response.json();
}