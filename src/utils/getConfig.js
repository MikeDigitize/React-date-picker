export function getProducts() {
    return fetch('/data/picker-config1.json')
        .then(response => {
            return response.json()
        })
}