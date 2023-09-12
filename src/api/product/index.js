const URL = 'https://dummyjson.com'
export async function getProductsOneApi() {
    let response = await fetch(`${ URL }/products/1`, {
        method: 'GET'
    }) 
    return await response.json();
}
export async function getProductsAllApi() {
    let response = await fetch(`${ URL }/products`, {
        method: 'GET'
    }) 
    return await response.json();
}
