export function getProducts() {
    return fetch('/data/available-dates.json')
        .then(response => {
            return response.json()
        })
}