const NEWAVAILABLEDATESANDCHARGES = "NEWAVAILABLEDATESANDCHARGES";
const BASKETTOTALUPDATE = "BASKETTOTALUPDATE";
const ADDTOTOTAL = "ADDTOTOTAL";
const SUBTRACTFROMTOTAL = "SUBTRACTFROMTOTAL";

export function availableDates(data) {
    return { state : data, type: NEWAVAILABLEDATESANDCHARGES };
}

export function basketTotal(data, action) {
    return { state : data, type: action || BASKETTOTALUPDATE };
}

export function addToBasketTotal(data) {
    return { state : data, type: ADDTOTOTAL };
}

export function subtractFromBasketTotal(data) {
    return { state : data, type: SUBTRACTFROMTOTAL };
}