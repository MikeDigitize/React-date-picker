const NEWAVAILABLEDATESANDCHARGES = "NEWAVAILABLEDATESANDCHARGES";
const BASKETTOTALUPDATE = "BASKETTOTALUPDATE";
const ADDTOTOTAL = "ADDTOTOTAL";
const SUBTRACTFROMTOTAL = "SUBTRACTFROMTOTAL";
const NEWCHOSENTIMESLOTDATA= "NEWCHOSENTIMESLOTDATA";
const BASKETPRODUCTTOTAL = "BASKETPRODUCTTOTAL";

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

export function selectedTimeslotData(data) {
    return { state : data, type : NEWCHOSENTIMESLOTDATA };
}

export function basketProducts(data) {
    return { state : data, type : BASKETPRODUCTTOTAL };
}