export function objectToArray(obj) {
    return Object.keys(obj).map(key => {
        let o = {};
        o[key] = obj[key];
        return o;
    });
}