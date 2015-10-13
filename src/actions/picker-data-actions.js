const NEWAVAILABLEDATESANDCHARGES = "NEWAVAILABLEDATESANDCHARGES";
const BASKETTOTALUPDATE = "BASKETTOTALUPDATE";
const NEWCHARGESCONFIG = "NEWCHARGESCONFIG";
const NEWDAYSCONFIG = "NEWDAYSCONFIG";
const TOTALWEEKSUPDATE = "TOTALWEEKSUPDATE";

export function availableDates(data) {
    return { state : data, type: NEWAVAILABLEDATESANDCHARGES };
}

export function chargesConfig(data) {
    return { state : data, type: NEWCHARGESCONFIG };
}

export function basketTotal(data) {
    return { state : data, type: BASKETTOTALUPDATE };
}

export function daysConfig(data) {
    return { state : data, type: NEWDAYSCONFIG };
}

export function totalWeeks(data) {
    return { state : data, type: TOTALWEEKSUPDATE };
}