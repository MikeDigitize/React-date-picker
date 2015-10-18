const NEWAVAILABLEDATESANDCHARGES = "NEWAVAILABLEDATESANDCHARGES";
const BASKETTOTALUPDATE = "BASKETTOTALUPDATE";

export function availableDates(data) {
    return { state : data, type: NEWAVAILABLEDATESANDCHARGES };
}

export function basketTotal(data) {
    return { state : data, type: BASKETTOTALUPDATE };
}