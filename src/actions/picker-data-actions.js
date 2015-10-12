const NEWAVAILABLEDATESANDCHARGES = "NEWAVAILABLEDATESANDCHARGES";
const BASKETTOTALUPDATE = "BASKETTOTALUPDATE";
const NEWCHARGESCONFIG = "NEWCHARGESCONFIG";

export function availableDates(data) {
    return { state : data, type: NEWAVAILABLEDATESANDCHARGES };
}

export function chargesConfig(data) {
    return { state : data, type: NEWCHARGESCONFIG };
}

export function basketTotal(data) {
    return { state : data, type: BASKETTOTALUPDATE };
}