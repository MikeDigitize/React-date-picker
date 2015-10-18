export function getData1() {
    return fetch('/data/picker-config1.json')
        .then(response => {
            return response.json()
        });
}

export function getData2() {
    return fetch('/data/picker-config2.json')
        .then(response => {
            return response.json()
        });
}