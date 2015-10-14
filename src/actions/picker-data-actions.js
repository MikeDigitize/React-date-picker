const NEWAVAILABLEDATESANDCHARGES = "NEWAVAILABLEDATESANDCHARGES";
const BASKETTOTALUPDATE = "BASKETTOTALUPDATE";
const NEWCHARGESCONFIG = "NEWCHARGESCONFIG";
const NEWDAYSCONFIG = "NEWDAYSCONFIG";
const TOTALWEEKSUPDATE = "TOTALWEEKSUPDATE";
const TABLEDISPLAYINDEX = "TABLEDISPLAYINDEX";
const NEWDAYSANDCHARGESCONFIG = "NEWDAYSANDCHARGESCONFIG";
const NEWDATERANGES = "NEWDATERANGES";

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

export function updateTableIndex(data) {
    return { state : data, type: TABLEDISPLAYINDEX };
}

export function daysAndChargesConfig(data) {
    return { state : data, type : NEWDAYSANDCHARGESCONFIG }
}

export function dateRanges(data) {
    return { state : data, type : NEWDATERANGES }
}