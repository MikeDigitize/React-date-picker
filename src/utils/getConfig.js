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

export function getData3() {
    return fetch('/data/picker-config3.json')
        .then(response => {
            return response.json()
        });
}

export function getData4() {
    return fetch('/data/picker-config4.json')
        .then(response => {
            return response.json()
        });
}